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
  // private selectedMother = '' ;
  // private selectedFather = '' ;
  // private selectedPartner = '';
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
    PersonGivenName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
    PersonFamilyName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
    PersonDateOfBirth: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
    PersonPlaceOfBirth: new FormControl(null),
    PersonDateOfDeath: new FormControl(null),
    PersonPlaceOfDeath: new FormControl(null),
    PersonIsMale: new FormControl(null, { validators: Validators.required, updateOn: 'blur'} ),
    MotherID: new FormControl(null),
    MotherName: new FormControl(null),
    FatherID: new FormControl(null),
    FatherName: new FormControl(null),
    PartnerID: new FormControl(null),
    PartnerName: new FormControl(null),
    Timestamp: new FormControl(null),
    // FatherAndMotherArePartners: new FormControl(true),
    selectedMother: new FormControl(null, { updateOn: 'blur'}),
    selectedFather: new FormControl(null, { updateOn: 'blur'}),
    selectedPartner: new FormControl(null, { updateOn: 'blur'})
  });


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
      console.log('!!=-> Value changes of selectedMother, value= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedMother').pristine) {
        console.log('In selectedMother changed, selectedMother NOT pristine, so actions taken!');
        if (this.personForm.get('selectedMother').value != null) {
          this.personForm.patchValue({
            MotherID: value.PersonID,
            MotherName: value.PossibleMother,
            selectedMother: null
          });
        }
      } else {
        console.log('In selectedMother changed, selectedMother pristine, so NO actions taken!');
      }
    }
  );

  this.personForm.get('selectedFather').valueChanges.subscribe(
    value => {
      console.log('!!=-> Value changes of selectedFather, value= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedFather').pristine) {
        console.log('In selectedFather changed, selectedFather NOT pristine, so actions taken!');
        if (this.personForm.get('selectedFather').value != null) {
          this.personForm.patchValue({
            FatherID: value.PersonID,
            FatherName: value.PossibleFather,
            selectedFather: null
          });
        }
      } else {
        console.log('In selectedFather changed, selectedFather pristine, so NO actions taken!');
      }
    }
  );

  this.personForm.get('selectedPartner').valueChanges.subscribe(
    value => {
      console.log('Value changes of selectedPartner, value= ' + JSON.stringify(value));
      if (! this.personForm.get('selectedPartner').pristine) {
        console.log('In selectedPartner, selectedPartner NOT pristine, so actions taken!');
        if (this.personForm.get('selectedPartner').value != null) {
          this.personForm.patchValue({
            PartnerID: value.PersonID,
            PartnerName: value.PossiblePartner,
            selectedPartner: null
          });
        }
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
        if  (this.personForm.get('PersonID').value === null) {
          console.log('PersonID===null, so new record, so actions taken based on birthdatedate, date= ' + DateIn);
          this.getPossibleFathersBasedOnDate(DateIn);
          this.getPossibleMothersBasedOnDate(DateIn);
          this.getPossiblePartnersBasedOnDate(DateIn);
        } else {
          console.log('PersonID <> null, so existing record, so actions taken based on PersonID, id= ' + this.personForm.get('PersonID').value);
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
  //   this.personForm.patchValue({
  //     MotherID: eventObject.value.motherId,
  //     MotherName: eventObject.value.motherName,
  //     selectedMother: 0
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
      PersonID: null,
      PersonGivenName: null,
      PersonFamilyName: PersonNameIn,
      PersonDateOfBirth: null,
      PersonPlaceOfBirth: null,
      PersonDateOfDeath: null,
      PersonPlaceOfDeath: null,
      PersonIsMale: null,
      MotherID: null,
      MotherName: null,
      FatherID: null,
      FatherName: null,
      PartnerID: null,
      PartnerName: null,
      Timestamp: null,
      // FatherAndMotherArePartners: person.data.FatherAndMotherArePartners
      selectedMother: null,
      selectedFather: null,
      selectedPartner: null
    });
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
        this.personForm.reset({
          PersonID: person.data.PersonID,
          PersonGivenName: person.data.PersonGivvenName,
          PersonFamilyName: person.data.PersonFamilyName,
          PersonDateOfBirth: person.data.PersonDateOfBirth,
          PersonPlaceOfBirth: person.data.PersonPlaceOfBirth,
          PersonDateOfDeath: person.data.PersonDateOfDeath,
          PersonPlaceOfDeath: person.data.PersonPlaceOfDeath,
          PersonIsMale: person.data.PersonIsMale,
          MotherID: person.data.MotherID || null,
          MotherName: person.data.MotherName || null,
          FatherID: person.data.FatherID || null,
          FatherName: person.data.FatherName || null,
          PartnerID: person.data.PartnerID || null,
          PartnerName: person.data.PartnerName || null,
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
          console.log('=> this.PossibleMotherList.data= ' + JSON.stringify(PossibleMothersList.data));
          if (PossibleMothersList === undefined) {
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
          console.log('=> this.PossibleFatherList.data= ' + JSON.stringify(PossibleFathersList.data));
          if (PossibleFathersList === undefined) {
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
        console.log('=> this.PossiblePartnerList.data= ' + JSON.stringify(PossibePartnersList.data));
        if (PossibePartnersList === undefined) {
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
          if (PossibleMothersList === undefined) {
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
        if (PossibleFathersList === undefined) {
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
        if (PossibePartnersList === undefined) {
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