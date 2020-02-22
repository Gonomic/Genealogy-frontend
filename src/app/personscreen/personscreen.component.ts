import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { SavePersonDialogComponent } from '../Dialogs/SavePerson/savePersonDialog.component';
import { DeletePersonDialogComponent } from '../Dialogs/DeletePerson/deletePersonDialog.component';

@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
})

export class PersonScreenComponent implements OnDestroy {
  private persons: Person[];
  private person: Person = new Person;
  private IntermPers: any;
  private namesToLookFor: string;
  private indexOfPerson: number;
  private possibleFathersList = {};
  private possibleMothersList = {};
  private possiblePartnersList = {};
  private selectedMother = '' ;
  private selectedFather = '' ;
  private selectedPartner = '';
  personForm = new FormGroup({
    PersonId: new FormControl(0),
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
    FatherAndMotherArePartners: new FormControl(true),
  });
    message: any;
    subscription: Subscription;


  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private saveDialog: MatDialog,
    private deleteDialog: MatDialog
  ) {
      this.subscription = this.messageService
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

  private DateChanged(DateIn: Date){
    this.getPossibleFathersBasedOnDate(DateIn);
    this.getPossibleMothersBasedOnDate(DateIn);
    this.getPossiblePartnersBasedOnDate(DateIn);
    console.log('Date changed, date now: ' + DateIn + '. Requested new listss of possible fathers, mothers and partners.');


  }

  private onPossibleMotherAdditionOrChange(eventObject): void {
    this.person.MotherID = eventObject.value.MotherId;
    this.person.MotherName = eventObject.value.motherName;
    this.selectedMother = undefined;
  }

  private onPossibleFatherAdditionOrChange(eventObject): void {
    this.person.FatherID = eventObject.value.FatherId;
    this.person.FatherName = eventObject.value.fatherName;
    this.selectedFather = undefined;
  }

  private onPossiblePartnerAdditionOrChange(eventObject): void {
    this.person.PartnerID = eventObject.value.PartnerId;
    this.person.PartnerName = eventObject.value.partnerName;
    this.selectedPartner = undefined;
  }

  private resetPersonRecord(PersonNameIn: string): void {
    // this.person.PersonId = 0;
    this.personForm.reset();
    // this.PersonId.reset();
    // this.PersonGivvenName.reset();
    this.personForm.setValue({PersonFamilyName: PersonNameIn});
    // this.PersonDateOfBirth.reset();
    // this.PersonPlaceOfBirth.reset();
    // this.PersonDateOfDeath.reset();
    // this.PersonPlaceOfDeath.reset();
    // this.PersonIsMale.reset();
    // this.MotherID.reset();
    // this.MotherName.reset();
    // this.FatherID.reset();
    // this.FatherName.reset();
    // this.PartnerID.reset();
    // this.PartnerName.reset();
    // this.Timestamp.reset();
    // this.FatherAndMotherArePartners.reset();
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
    this.subscription.unsubscribe();
  }


  private getPersonDetails(PersonId: number): void {
    this.dataSprocsService.getPersonDetails(PersonId).
    subscribe (
      (person) => {
        
        this.IntermPers = person;
        this.person = this.IntermPers.data;
        this.person.PersonId = person.PersonId;
        this.person.PersonGivvenName = person.PersonGivvenName;
        this.person.PersonFamilyName = person.PersonFamilyName;
        // this.PersonDateOfBirth.reset();
        // this.PersonPlaceOfBirth.reset();
        // this.PersonDateOfDeath.reset();
        // this.PersonPlaceOfDeath.reset();
        // this.PersonIsMale.reset();
        // this.MotherID.reset();
        // this.MotherName.reset();
        // this.FatherID.reset();
        // this.FatherName.reset();
        // this.PartnerID.reset();
        // this.PartnerName.reset();
        // this.Timestamp.reset();
        // this.FatherAndMotherArePartners.reset();
      }
    );
  }

  private openSavePersonDialog(): void {
    console.log('In openSavePersonDialog');
    const dialogSavePersonConfig = new MatDialogConfig();
    dialogSavePersonConfig.disableClose = true;
    dialogSavePersonConfig.autoFocus = true;
    dialogSavePersonConfig.data = {
      PersonName: this.person.PersonGivvenName + ' ' + this.person.PersonFamilyName
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
      PersonName: this.person.PersonGivvenName + ' ' + this.person.PersonFamilyName
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

  private getPossibleFathers(PersonId): void {
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

    private getPossiblePartners(PersonId): void {
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

      private getPossiblePartnersBasedOnDate(DateIn): void {
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
        console.log('Waarde van onSubmit= ' + this.personForm.value);
      }
}