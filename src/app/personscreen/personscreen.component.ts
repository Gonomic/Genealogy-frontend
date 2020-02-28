import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataSprocsService } from '../datasprocs.service';
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
  private IntermPers: any;
  private namesToLookFor: string;
  private indexOfPerson: number;
  private possibleFathersList = {};
  private possibleMothersList = {};
  private possiblePartnersList = {};
  personForm: FormGroup;
  message: any;
  incomingMessage: Subscription;
  motherChanged: Subscription;


  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private saveDialog: MatDialog,
    private deleteDialog: MatDialog
  ) {
      this.incomingMessage = this.messageService
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
    selectedMother: new FormControl(null, { updateOn: 'blur'}),
    selectedFather: new FormControl(null, { updateOn: 'blur'}),
    selectedPartner: new FormControl(null, { updateOn: 'blur'})
  });

  this.personForm.get('selectedMother').valueChanges.subscribe(
    value => {
      if (! this.personForm.get('selectedMother').pristine) {
        if (this.personForm.get('selectedMother').value != null) {
          this.personForm.patchValue({
            MotherID: value.PersonID,
            MotherName: value.PossibleMother,
            selectedMother: null
          });
        }
      }
    }
  );

  this.personForm.get('selectedFather').valueChanges.subscribe(
    value => {
      if (! this.personForm.get('selectedFather').pristine) {
        if (this.personForm.get('selectedFather').value != null) {
          this.personForm.patchValue({
            FatherID: value.PersonID,
            FatherName: value.PossibleFather,
            selectedFather: null
          });
        }
      }
    }
  );

  this.personForm.get('selectedPartner').valueChanges.subscribe(
    value => {
      if (! this.personForm.get('selectedPartner').pristine) {
        if (this.personForm.get('selectedPartner').value != null) {
          this.personForm.patchValue({
            PartnerID: value.PersonID,
            PartnerName: value.PossiblePartner,
            selectedPartner: null
          });
        }
      }
    }
  );

  this.personForm.get('PersonDateOfBirth').valueChanges.subscribe(
    DateIn => {
    if (! this.personForm.get('PersonDateOfBirth').pristine) {
        if  (this.personForm.get('PersonID').value === null) {
          this.getPossibleFathersBasedOnDate(DateIn);
          this.getPossibleMothersBasedOnDate(DateIn);
          this.getPossiblePartnersBasedOnDate(DateIn);
        } else {
          this.getPossibleFathers(this.personForm.get('PersonID').value);
          this.getPossibleMothers(this.personForm.get('PersonID').value);
          this.getPossiblePartners(this.personForm.get('PersonID').value);
        }
      }
    }
  );

}

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
          selectedMother: null,
          selectedFather: null,
          selectedPartner: null
        });
      }
    );
  }

  private openSavePersonDialog(): void {
    const dialogSavePersonConfig = new MatDialogConfig();
    dialogSavePersonConfig.disableClose = true;
    dialogSavePersonConfig.autoFocus = true;
    dialogSavePersonConfig.data = { PersonName: this.personForm.get('PersonGivenName').value  +  ' ' + this.personForm.get('PersonFamilyName').value };
    const dialogRef1 = this.saveDialog.open(SavePersonDialogComponent, dialogSavePersonConfig);
    dialogRef1.afterClosed().subscribe(
      data => console.log('Dialog ouput SaveDialogWindow: ', data)
    );
  }

  private openDeletePersonDialog(): void {
    const dialogDeletePersonConfig = new MatDialogConfig();
    dialogDeletePersonConfig.disableClose = true;
    dialogDeletePersonConfig.autoFocus = true;
    dialogDeletePersonConfig.data = { PersonName: this.personForm.get('PersonGivenName').value + ' ' + this.personForm.get('PersonFamilyName').value };
    const dialogRef2 = this.deleteDialog.open(DeletePersonDialogComponent, dialogDeletePersonConfig);
    dialogRef2.afterClosed().subscribe(
      data => console.log('Dialog output DeleteDialogWindow= ', data)
    );
  }


  private getPossibleMothers(PersonId): void {
    this.dataSprocsService.getPossibleMothersList(PersonId).
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

  private getPossibleFathers(PersonId: number): void {
    this.dataSprocsService.getPossibleFathersList(PersonId).
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

  private getPossiblePartners(PersonId: number): void {
  this.dataSprocsService.GetPossiblePartnersList(PersonId).
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