import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataSprocsService } from '../datasprocs.service';
// import { Person } from '../person';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { SavePersonDialogComponent } from '../Dialogs/SavePerson/savePersonDialog.component';
import { DeletePersonDialogComponent } from '../Dialogs/DeletePerson/deletePersonDialog.component';

@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
})

export class PersonScreenComponent implements OnDestroy, OnInit {
  // private persons: Person[];
  // private person: Person = new Person;
  private IntermPers: any;
  private namesToLookFor: string;
  private indexOfPerson: number;
  private possibleFathersList = {};
  private possibleMothersList = {};
  private possiblePartnersList = {};
  private selectedMother = '' ;
  private selectedFather = '' ;
  private selectedPartner = '';
  personForm: FormGroup;
  message: any;
  incomingMessage: Subscription;
  // subscription: Subscription;
  motherChanged: Subscription;


  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private saveDialog: MatDialog,
    private deleteDialog: MatDialog
  ) {
      this.incomingMessage = this.messageService
    // this.subscription = this.messageService
        .getMessage()
        .subscribe(message => {
          if (message.action === 'addNewPerson') {
            this.resetPersonRecord(message.name);
            this.resetPossibeFatherList();
            this.resetPossibeMotherList();
            this.resetPossiblePartnerList();
          } else {
            this.getPersonDetails(message.Id);
            this.getPossibleFathers(message.Id);
            this.getPossibleMothers(message.Id);
            this.getPossiblePartners(message.Id);
          }
        });
    }

ngOnInit() {
  this.personForm = new FormGroup({
    PersonID: new FormControl(0),
    PersonGivenName: new FormControl('', Validators.required),
    PersonFamilyName: new FormControl('', Validators.required),
    PersonDateOfBirth: new FormControl(new Date('0000-00-00'), Validators.required),
    PersonPlaceOfBirth: new FormControl(''),
    PersonDateOfDeath: new FormControl(new Date('0000-00-00')),
    PersonPlaceOfDeath: new FormControl(''),
    PersonIsMale: new FormControl(true),
    MotherID: new FormControl(0),
    MotherName: new FormControl(''),
    FatherID: new FormControl(0),
    FatherName: new FormControl(''),
    PartnerID: new FormControl(0),
    PartnerName: new FormControl(''),
    Timestamp: new FormControl(null),
    // FatherAndMotherArePartners: new FormControl(true),
    selectedMother: new FormControl(0),
    selectedFather: new FormControl(0),
    selectedPartner: new FormControl(0)
  },
    { updateOn: 'blur'}
  );


  // this.motherChanged = this.personForm.get('selectedMother').valueChanges.subscribe(
  //   value => {
  //     console.log('Value=' + value);
  //     this.personForm.setValue({
  //       MotherID: value.MotherId,
  //       MotherName: value.MotherName
  //     });
  //   }
  // );

  this.personForm.get('selectedMother').valueChanges.subscribe(
    value => {
      console.log('Value changes of selectedMother, PersonID= ' + this.personForm.get('PersonID').value + ', selectedMother= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedMother').pristine) {
        console.log('In selectedMother changed, selectedMother NOT pristine, so actions taken!');
        this.personForm.setValue({
          MotherID: value.MotherId,
          MotherName: value.MotherName
        });
      } else {
        console.log('In selectedMother changed, selectedMother pristine, so NO actions taken!');
      }
    }
  );

  this.personForm.get('selectedFather').valueChanges.subscribe(
    value => {
      console.log('Value changes of selectedFather, PersonID= ' + this.personForm.get('PersonID').value + ', selectedFather= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedFather').pristine) {
        console.log('In selectedFather changed, selectedFather NOT pristine, so actions taken!');
        this.personForm.setValue({
          FatherID: value.FatherId,
          FatherName: value.FatherName
        });
      } else {
        console.log('In selectedFather changed, selectedFather pristine, so NO actions taken!');
      }
    }
  );

  this.personForm.get('selectedPartner').valueChanges.subscribe(
    value => {
      console.log('Value changes of selectedPartner, PersonID= ' + this.personForm.get('PersonID').value + ', selectedPartner= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedPartner').pristine) {
        console.log('In selectedPartner, selectedPartner NOT pristine, so actions taken!');
        this.personForm.setValue({
          PartnerID: value.PartnerId,
          PartnerName: value.PartnerName
        });
      } else {
        console.log('In selectedPartner changed, selectedPartner pristine, so NO actions taken!');
      }
    }
  );

  this.personForm.get('PersonDateOfBirth').valueChanges.subscribe(
    DateIn => {
    console.log('Value changes of PersonDateOfBirth, PersonID= ' + this.personForm.get('PersonID').value + 'DateIn= ' + DateIn );
    if (! this.personForm.get('PersonDateOfBirth').pristine) {
      console.log('In PersonDateOfBirth changed, PersonDateOfBirth NOT pristine, so actions taken!');
        if  (this.personForm.get('PersonID').value === 0) {
          console.log('PersonID===0, so new record, so actions taken based on birthdatedate, date= ' + DateIn);
          this.getPossibleFathersBasedOnDate(DateIn);
          this.getPossibleMothersBasedOnDate(DateIn);
          this.getPossiblePartnersBasedOnDate(DateIn);
        } else {
          console.log('PersonID <> 0, so existing record, so actions taken based on PersonID, id= ' + this.personForm.get('PersonID').value);
          this.getPossibleFathers(this.personForm.get('PersonID').value);
          this.getPossibleMothers(this.personForm.get('PersonID').value);
          this.getPossiblePartners(this.personForm.get('PersonID').value);
        }
      } else {
        console.log('In PersonDateOfBirth changed, PersonDateOfBirth pristine, so NO actions taken!');
      }
    }
  );

}

  // private DateChanged(DateIn: Date) {
  //   this.getPossibleFathersBasedOnDate(DateIn);
  //   this.getPossibleMothersBasedOnDate(DateIn);
  //   this.getPossiblePartnersBasedOnDate(DateIn);
  //   console.log('Date changed, date now: ' + DateIn + '. Requested new listss of possible fathers, mothers and partners.');
  // }

  // private onPossibleMotherAdditionOrChange(eventObject): void {
  //   this.personForm.setValue({
  //     MotherID: eventObject.value.MotherId,
  //     MotherName: eventObject.value.motherName,
  //     selectedMother: undefined
  //   });
  // }

  // private onPossibleFatherAdditionOrChange(eventObject): void {
  //   this.personForm.setValue({
  //     FatherID: eventObject.value.FatherId,
  //     FatherName: eventObject.value.fatherName,
  //     selectedFather: undefined
  //   });
  // }

  // private onPossiblePartnerAdditionOrChange(eventObject): void {
  //   this.personForm.setValue ({
  //     PartnerID: eventObject.value.PartnerId,
  //     PartnerName: eventObject.value.partnerName,
  //     selectedPartner: undefined
  //   });
  // }

  private resetPersonRecord(PersonNameIn: string): void {
    this.personForm.reset({
      PersonID: 0,
      PersonGivenName: '',
      PersonFamilyName: PersonNameIn,
      PersonDateOfBirth: new Date('1/1/2000'),
      PersonPlaceOfBirth: '',
      PersonDateOfDeath: new Date('1/1/2000'),
      PersonPlaceOfDeath: '',
      PersonIsMale: false,
      MotherID: 0,
      MotherName: '',
      FatherID: 0,
      FatherName: '',
      PartnerID: 0,
      PartnerName: '',
      Timestamp: null,
      // FatherAndMotherArePartners: person.data.FatherAndMotherArePartners
      selectedMother: 0,
      selectedFather: 0,
      selectedPartner: 0
    });
    // this.personForm.reset();
    // this.personForm.setValue({
    //   PersonID: 0,
    //   PersonGivenName: '',
    //   PersonFamilyName: PersonNameIn,
    //   PersonDateOfBirth: new Date('0000-00-00')
    // });
  }

  private resetPossibeFatherList(): void {
    this.possibleFathersList = {};
  }

  private resetPossibeMotherList(): void {
    this.possibleMothersList = {};
  }

  private resetPossiblePartnerList(): void {
    this.possiblePartnersList = {};
  }

  ngOnDestroy() {
    this.incomingMessage.unsubscribe();
  }

  private getPersonDetails(PersonIdIn: number): void {
    this.dataSprocsService.getPersonDetails(PersonIdIn).
    subscribe (
      (person) => {
        this.personForm.setValue({
          PersonID: person.data.PersonID,
          PersonGivenName: person.data.PersonGivvenName,
          PersonFamilyName: person.data.PersonFamilyName,
          PersonDateOfBirth: person.data.PersonDateOfBirth,
          PersonPlaceOfBirth: person.data.PersonPlaceOfBirth,
          PersonDateOfDeath: person.data.PersonDateOfDeath,
          PersonPlaceOfDeath: person.data.PersonPlaceOfDeath,
          PersonIsMale: person.data.PersonIsMale,
          MotherID: person.data.MotherID || 0,
          MotherName: person.data.MotherName || '',
          FatherID: person.data.PartnerID || 0,
          FatherName: person.data.PartnerName || '',
          PartnerID: person.data.PartnerID || 0,
          PartnerName: person.data.PartnerName || '',
          Timestamp: person.data.Timestamp,
          // FatherAndMotherArePartners: person.data.FatherAndMotherArePartners
          selectedMother: null,
          selectedFather: null,
          selectedPartner: null
        });
      }
    );
  }

  private openSavePersonDialog(): void {
    console.log('In openSavePersonDialog');
    const dialogSavePersonConfig = new MatDialogConfig();
    dialogSavePersonConfig.disableClose = true;
    dialogSavePersonConfig.autoFocus = true;
    dialogSavePersonConfig.data = {
      PersonName: this.personForm.get('PersonGivenName').value  +  this.personForm.get('PersonFamilyName').value
    }
    this.saveDialog.open(SavePersonDialogComponent, dialogSavePersonConfig);
    const dialogRef = this.saveDialog.open(SavePersonDialogComponent, dialogSavePersonConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog ouput: ', data)
    );
  }

  private openDeletePersonDialog(): void {
    const dialogDeletePersonConfig = new MatDialogConfig();
    dialogDeletePersonConfig.disableClose = true;
    dialogDeletePersonConfig.autoFocus = true;
    dialogDeletePersonConfig.data = {
      PersonName: this.personForm.get('PersonGivenName').value + this.personForm.get('PersonFamilyName').value
    }
    this.deleteDialog.open(DeletePersonDialogComponent, dialogDeletePersonConfig);

  }


  private getPossibleMothers(PersonId): void {
    this.dataSprocsService.getPossibleMothersList(PersonId).
      subscribe (
        (PossibleMothersList) => {
          if (PossibleMothersList == null) {
            this.possibleMothersList = [];
        } else {
          this.possibleMothersList = PossibleMothersList;
        }
      }
    );
  }

  private getPossibleFathers(PersonId: number): void {
    this.dataSprocsService.getPossibleFathersList(PersonId).
      subscribe (
        (PossibleFathersList) => {
          if (PossibleFathersList == null) {
            this.possibleFathersList = [];
          } else {
            this.possibleFathersList = PossibleFathersList;
          }
        }
      );
  }

  private getPossiblePartners(PersonId: number): void {
  this.dataSprocsService.GetPossiblePartnersList(PersonId).
    subscribe (
      (PossibePartnersList) => {
        if (PossibePartnersList == null) {
          this.possiblePartnersList = [];
        } else {
          this.possiblePartnersList = PossibePartnersList;
        }
      }
    );
  }


  private getPossibleMothersBasedOnDate(DateIn: Date): void {
    this.dataSprocsService.getPossibleMothersListBasedOnDate(DateIn).
      subscribe (
        (PossibleMothersList) => {
          if (PossibleMothersList == null) {
            this.possibleMothersList = [];
          } else {
            this.possibleMothersList = PossibleMothersList;
          }
        }
      );
    }

  private getPossibleFathersBasedOnDate(DateIn: Date): void {
  this.dataSprocsService.getPossibleFathersListBasedOnDate(DateIn).
    subscribe (
      (PossibleFathersList) => {
        if (PossibleFathersList == null) {
          this.possibleFathersList = [];
        } else {
          this.possibleFathersList = PossibleFathersList;
        }
      }
    );
  }

  private getPossiblePartnersBasedOnDate(DateIn: Date): void {
  this.dataSprocsService.GetPossiblePartnersListBasedOnDate(DateIn).
    subscribe (
      (PossibePartnersList) => {
        if (PossibePartnersList == null) {
          this.possiblePartnersList = [];
        } else {
          this.possiblePartnersList = PossibePartnersList;
        }
      }
    );
  }

  private onSubmit() {
    // TODO: Gebriuk EventEmitter with form value to save data to backend (?)
    console.log('Waarde van onSubmit= ' + JSON.stringify(this.personForm.value));
  }
}