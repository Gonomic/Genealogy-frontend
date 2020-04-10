import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataSprocsService } from '../datasprocs.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { SavePersonDialogComponent } from '../dialogs/saveperson/savepersondialog.component';
import { DeletePersonDialogComponent } from '../dialogs/deleteperson/deletepersondialog.component';
import { JsonPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
})

export class PersonScreenComponent implements OnDestroy, OnInit {
  private plainpersonlist: {};
  private IntermPers: any;
  private namesToLookFor: string;
  private indexOfPerson: number;
  private possibleFathersList = {};
  private possibleMothersList = {};
  private possiblePartnersList = {};
  private formContainsValue = false;
  private formCanBeSubmitted = false;
  personForm: FormGroup;
  message: any;
  incomingMessage: Subscription;
  motherChanged: Subscription;
  theMessageObject: object;

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private saveDialog: MatDialog,
    private deleteDialog: MatDialog,
    private datepipe: DatePipe
  ) {
      this.incomingMessage = this.messageService
        .getMessage()
        .subscribe(message => {
          console.log('PersonForm incoming message= ' + JSON.stringify(message));
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
    PersonID: new FormControl(null),
    PersonGivvenName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
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
    // this.personForm.patchValue({
    //   PersonDateOfBirth: formatDate(DateIn, 'yyyyMMdd')
    //     });
    if (! this.personForm.get('PersonDateOfBirth').pristine) {
        if  (this.personForm.get('PersonID').value === null || this.personForm.get('PersonID').value === 0 ) {
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

  this.personForm.get('MotherName').valueChanges.subscribe(
    ValueIn => {
      if (! this.personForm.get('MotherName').pristine) {
        if (ValueIn === '') {
          this.personForm.patchValue({
            MotherName: null,
            MotherID: null
          });
        }
      }
    }
  );

  this.personForm.get('FatherName').valueChanges.subscribe(
    ValueIn => {
      if (! this.personForm.get('FatherName').pristine) {
        if (ValueIn === '') {
          this.personForm.patchValue({
            FatherName: null,
            FatherID: null
          });
        }
      }
    }
  );

  this.personForm.get('PartnerName').valueChanges.subscribe(
      ValueIn => {
     if (! this.personForm.get('PartnerName').pristine) {
        if (ValueIn === '') {
          this.personForm.patchValue({
            PartnerName: null,
            PartnerID: null
          });
        }
      }
    }
  );


}

sendMessage(): void {
  this.theMessageObject = { 'action': 'refreshPersonList'};
  console.log('sendMessage, message send= ' + JSON.stringify(this.theMessageObject));
  this.messageService.sendMessage(this.theMessageObject);
}

clearMessage(): void {
  this.messageService.clearMessage();
}

  private resetPersonRecord(PersonNameIn: string): void {
    this.personForm.reset({
      PersonID: null,
      PersonGivvenName: null,
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
          PersonGivvenName: person.data.PersonGivvenName,
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
    dialogSavePersonConfig.data = { PersonName: this.personForm.get('PersonGivvenName').value  +  ' ' + this.personForm.get('PersonFamilyName').value };
    const dialogRef1 = this.saveDialog.open(SavePersonDialogComponent, dialogSavePersonConfig);
    dialogRef1.afterClosed().subscribe(
      DialogResult => {
        if (DialogResult === 'Save') {
          console.log('personForm.value=' + JSON.stringify(this.personForm.value));
          if (this.personForm.get('PersonID').value === null || this.personForm.get('PersonID').value === 0 ) {
            console.log('In PersonID = null or 0');
            this.dataSprocsService.AddPerson(this.personForm.value).subscribe(
              PostResult => {
                this.personForm.reset({
                  PersonID: PostResult.data[0].PersonID,
                  PersonGivvenName: PostResult.data[0].PersonGivvenName,
                  PersonFamilyName: PostResult.data[0].PersonFamilyName,
                  PersonDateOfBirth: PostResult.data[0].PersonDateOfBirth,
                  PersonPlaceOfBirth: PostResult.data[0].PersonPlaceOfBirth,
                  PersonDateOfDeath: PostResult.data[0].PersonDateOfDeath,
                  PersonPlaceOfDeath: PostResult.data[0].PersonPlaceOfDeath,
                  PersonIsMale: PostResult.data[0].PersonIsMale,
                  MotherID: PostResult.data[0].MotherID || '',
                  MotherName: PostResult.data[0].MotherName || '',
                  FatherID: PostResult.data[0].FatherID || '',
                  FatherName: PostResult.data[0].FatherName || '',
                  PartnerID: PostResult.data[0].PartnerID || '',
                  PartnerName: PostResult.data[0].PartnerName || '',
                  Timestamp: PostResult.data[0].Timestamp,
                  selectedMother: null,
                  selectedFather: null,
                  selectedPartner: null
                });
                this.getPossibleFathers(this.personForm.get('PersonID').value);
                this.getPossibleMothers(this.personForm.get('PersonID').value);
                this.getPossiblePartners(this.personForm.get('PersonID').value);
                this.sendMessage();
              });
          } else {
            console.log('In PersonID <> null or 0');
            this.dataSprocsService.ChangePerson(this.personForm.value).subscribe(
              PostResult => {
                this.personForm.reset({
                  PersonID: PostResult.data[0].PersonID,
                  PersonGivvenName: PostResult.data[0].PersonGivvenName,
                  PersonFamilyName: PostResult.data[0].PersonFamilyName,
                  PersonDateOfBirth: PostResult.data[0].PersonDateOfBirth,
                  PersonPlaceOfBirth: PostResult.data[0].PersonPlaceOfBirth,
                  PersonDateOfDeath: PostResult.data[0].PersonDateOfDeath,
                  PersonPlaceOfDeath: PostResult.data[0].PersonPlaceOfDeath,
                  PersonIsMale: PostResult.data[0].PersonIsMale,
                  MotherID: PostResult.data[0].MotherID || '',
                  MotherName: PostResult.data[0].MotherName || '',
                  FatherID: PostResult.data[0].FatherID || '',
                  FatherName: PostResult.data[0].FatherName || '',
                  PartnerID: PostResult.data[0].PartnerID || '',
                  PartnerName: PostResult.data[0].PartnerName || '',
                  Timestamp: PostResult.data[0].Timestamp,
                  selectedMother: null,
                  selectedFather: null,
                  selectedPartner: null
                });
                this.getPossibleFathers(this.personForm.get('PersonID').value);
                this.getPossibleMothers(this.personForm.get('PersonID').value);
                this.getPossiblePartners(this.personForm.get('PersonID').value);
                this.sendMessage();
              }
            );
          }
        }
      }
    );
  }

  private allValuesAreNull(): boolean {
    this.formContainsValue = false;
    Object.keys(this.personForm.controls).forEach(key => {
      if (this.personForm.controls[key].value != null) {
        this.formContainsValue = true;
        return this.formContainsValue;
      }
    });
    return this.formContainsValue;
  }

  private formIsSubmitable(): boolean {
    this.formCanBeSubmitted = false;
    if (this.PersonFamilyName.value != null && this.PersonFamilyName.value !== '' &&
        this.PersonGivvenName.value != null && this.PersonGivvenName.value !== '' &&
        this.PersonDateOfBirth.value != null && this.PersonDateOfBirth.value !== '' &&
        this.PersonPlaceOfBirth.value != null && this.PersonPlaceOfBirth.value !== '' &&
        this.PersonIsMale.value != null &&
        this.personForm.dirty) {
      this.formCanBeSubmitted = true;
    } else {
      this.formCanBeSubmitted = false;
    }
    return this.formCanBeSubmitted;
  }

  private openDeletePersonDialog(): void {
    const dialogDeletePersonConfig = new MatDialogConfig();
    dialogDeletePersonConfig.disableClose = true;
    dialogDeletePersonConfig.autoFocus = true;
    dialogDeletePersonConfig.data = { PersonName: this.personForm.get('PersonGivvenName').value  +  ' ' + this.personForm.get('PersonFamilyName').value };
    const dialogRef2 = this.deleteDialog.open(DeletePersonDialogComponent, dialogDeletePersonConfig);
    dialogRef2.afterClosed().subscribe(
      DialogResult => {
        console.log('DialogResult= ' + DialogResult);
        if (DialogResult === 'Delete') {
          console.log('Just after delete dialog, personForm.value= ' + JSON.stringify(this.personForm.value));
          if (this.personForm.get('PersonID').value === null || this.personForm.get('PersonID').value === 0 ) {
            console.log('Just after delete dialog, PersonID = null or 0 (dus alleen scherm leeg maken');
            this.resetPersonRecord('');
          } else {
            console.log('Just after delete dialog, PersonID <> null or 0 (dus naar centrale database');
            this.dataSprocsService.deletePerson(this.personForm.get('PersonID').value,
                                                this.personForm.get('MotherID').value,
                                                this.personForm.get('FatherID').value,
                                                this.personForm.get('PartnerID').value,
                                                this.personForm.get('Timestamp').value).subscribe(
              DeleteResult => {
                console.log('DeleteResult= ' + JSON.stringify(DeleteResult));
                this.resetPersonRecord('');
                this.sendMessage();
              });
            }
          }
        }
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
    this.personForm.patchValue({
      PersonDateOfBirth: this.datepipe.transform( this.PersonDateOfBirth.value, 'yyyy-MM-dd'),
      PersonDateOfDeath: this.datepipe.transform( this.PersonDateOfDeath.value, 'yyyy-MM-dd')
    });
    console.log('Waarde van onSubmit= ' + JSON.stringify(this.personForm.value));
  }

  get PersonGivvenName() {return this.personForm.get('PersonGivvenName'); }

  get PersonFamilyName() {return this.personForm.get('PersonFamilyName'); }

  get PersonDateOfBirth() { return this.personForm.get('PersonDateOfBirth'); }

  get PersonPlaceOfBirth() { return this.personForm.get('PersonPlaceOfBirth'); }

  get PersonDateOfDeath() { return this.personForm.get('PersonDateOfDeath'); }

  get PersonID() { return this.personForm.get('PersonID'); }

  get PersonIsMale() { return this.personForm.get('PersonIsMale'); }

}
