import { Component, OnInit, OnDestroy, Output, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataSprocsService } from '../datasprocs.service';
import { StateManagementService } from '../statemanagement.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { SavePersonDialogComponent } from '../dialogs/saveperson/savepersondialog.component';
import { DeletePersonDialogComponent } from '../dialogs/deleteperson/deletepersondialog.component';
import { JsonPipe, DatePipe } from '@angular/common';
import { MatSortHeader } from '@angular/material';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
})

export class PersonScreenComponent implements OnDestroy, OnInit {
  @ViewChild('Mother', {read: ElementRef, static: false}) private Mother: ElementRef;
  @ViewChild('Father', {read: ElementRef, static: false}) private Father: ElementRef;
  @ViewChild('Partner', {read: ElementRef, static: false}) private Partner: ElementRef;
  @ViewChild('Overlijden', {read: ElementRef, static: true}) private Overlijden: ElementRef;

  private destroyed$ = new Subject();

  private plainpersonlist: {};
  private namesToLookFor: string;
  private indexOfPerson: number;
  private possibleFathersList = {};
  private possibleMothersList = {};
  private possiblePartnersList = {};
  private formContainsValue = false;
  private formCanBeSubmitted = false;
  private personForm: FormGroup;
  private message: any;
  private incomingMessage: Subscription;
  private motherChanged: Subscription;
  private theMessageObject: object;

  constructor(
    private dataSprocsService: DataSprocsService,
    private stateManagementService: StateManagementService,
    private router: Router,
    private messageService: MessageService,
    private saveDialog: MatDialog,
    private deleteDialog: MatDialog,
    private datepipe: DatePipe,
  ) {
      this.personForm = new FormGroup({
        PersonID: new FormControl(null),
        PersonGivvenName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
        PersonFamilyName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
        PersonDateOfBirth: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
        PersonDateOfBirthStatus: new FormControl(null, { validators: [Validators.required, Validators.min(1), Validators.max(3)], updateOn: 'blur'} ),
        PersonPlaceOfBirth: new FormControl(null),
        PersonDateOfDeath: new FormControl(null),
        PersonDateOfDeathStatus: new FormControl(null, {validators: [Validators.min(1), Validators.max(3)] } ),
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

      this.incomingMessage = this.messageService
        .getMessage()
        .subscribe(message => {
          if (message.action === 'addNewPerson') {
            this.resetPersonRecord(message.name);
            this.resetPossibeFatherList();
            this.resetPossibeMotherList();
            this.resetPossiblePartnerList();
          } else if (message.action === 'getExistingPerson') {
            this.getPersonDetails(message.Id);
            this.getPossibleFathers(message.Id);
            this.getPossibleMothers(message.Id);
            this.getPossiblePartners(message.Id);
          }
        });

      this.router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          if ( event.url.slice(1, 7) !== 'person') {
            this.stateManagementService.SetStatusBeforeLeavingPersonScreen(
              this.personForm,
              this.plainpersonlist,
              this.namesToLookFor,
              this.indexOfPerson,
              this.possibleFathersList,
              this.possibleMothersList,
              this.possiblePartnersList,
              this.formContainsValue,
              this.formCanBeSubmitted,
              'edditing'
            );
          }
          this.stateManagementService.setStateIsInitial = false;
        }
      });
    }


  ngOnDestroy(): void {
    this.incomingMessage.unsubscribe();
    // throw new Error('ngOnDestroy() Method in PersonScreenComponent only partially implemented.');
  }

  ngOnInit() {
    if (! this.stateManagementService.stateIsInitial) {
      this.personForm = this.stateManagementService.personFormGroup;
      this.plainpersonlist = this.stateManagementService.plainPersonlist;
      this.namesToLookFor = this.stateManagementService.namesToLookFor;
      this.indexOfPerson = this.stateManagementService.indexOfPerson;
      this.possibleFathersList = this.stateManagementService.possibleFathersList;
      this.possibleMothersList = this.stateManagementService.possibleMothersList;
      this.possiblePartnersList = this.stateManagementService.possiblePartnersList;
      this.formContainsValue = this.stateManagementService.formContainsValue;
      this.formCanBeSubmitted = this.stateManagementService.formCanbeSubmitted;
    }

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
  // console.log('sendMessage, message send= ' + JSON.stringify(this.theMessageObject));
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
      PersonDateOfBirthStatus: null,
      PersonPlaceOfBirth: null,
      PersonDateOfDeath: null,
      PersonDateOfDeathStatus: null,
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

  private getPersonDetails(PersonIdIn: number): void {
    this.dataSprocsService.getPersonDetails(PersonIdIn).
    subscribe (
      (person) => {
        this.personForm.reset({
          PersonID: person.data.PersonID,
          PersonGivvenName: person.data.PersonGivvenName,
          PersonFamilyName: person.data.PersonFamilyName,
          PersonDateOfBirth: person.data.PersonDateOfBirth,
          PersonDateOfBirthStatus: person.data.PersonDateOfBirthStatus,
          PersonPlaceOfBirth: person.data.PersonPlaceOfBirth,
          PersonDateOfDeath: person.data.PersonDateOfDeath,
          PersonDateOfDeathStatus: person.data.PersonDateOfDeathStatus,
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
          if (this.personForm.get('PersonID').value === null || this.personForm.get('PersonID').value === 0 ) {
            this.dataSprocsService.AddPerson(this.personForm.value).subscribe(
              PostResult => {
                this.personForm.reset({
                  PersonID: PostResult.data[0].PersonID,
                  PersonGivvenName: PostResult.data[0].PersonGivvenName,
                  PersonFamilyName: PostResult.data[0].PersonFamilyName,
                  PersonDateOfBirth: PostResult.data[0].PersonDateOfBirth,
                  PersonDateOfBirthStatus: PostResult.data[0].PersonDateOfBirthStatus,
                  PersonPlaceOfBirth: PostResult.data[0].PersonPlaceOfBirth,
                  PersonDateOfDeath: PostResult.data[0].PersonDateOfDeath,
                  PersonDateOfDeathStatus: PostResult.data[0].PersonDateOfDeathStatus,
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
            this.dataSprocsService.ChangePerson(this.personForm.value).subscribe(
              PostResult => {
                this.personForm.reset({
                  PersonID: PostResult.data[0].PersonID,
                  PersonGivvenName: PostResult.data[0].PersonGivvenName,
                  PersonFamilyName: PostResult.data[0].PersonFamilyName,
                  PersonDateOfBirth: PostResult.data[0].PersonDateOfBirth,
                  PersonDateOfBirthStatus: PostResult.data[0].PersonDateOfBirthStatus,
                  PersonPlaceOfBirth: PostResult.data[0].PersonPlaceOfBirth,
                  PersonDateOfDeath: PostResult.data[0].PersonDateOfDeath,
                  PersonDateOfDeathStatus: PostResult.data[0].PersonDateOfDeathStatus,
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
                // this.sendMessage(); Remark: no need to refresh the list, person already existed. Risk: when Familyname changes person will remain viewable in list!
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
        if (DialogResult === 'Delete') {
          if (this.personForm.get('PersonID').value === null || this.personForm.get('PersonID').value === 0 ) {
            this.resetPersonRecord('');
          } else {
            this.dataSprocsService.deletePerson(this.personForm.get('PersonID').value,
                                                this.personForm.get('MotherID').value,
                                                this.personForm.get('FatherID').value,
                                                this.personForm.get('PartnerID').value,
                                                this.personForm.get('Timestamp').value).subscribe(
              DeleteResult => {
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
  }

  RelativesFieldsOnFocus(FieldNameIn: string) {
    if (FieldNameIn === 'FatherField') {
      this.Overlijden.nativeElement.focus();
      this.Overlijden.nativeElement.click();
      // this.Father.nativeElement.focus();
    } else if (FieldNameIn === 'MotherField') {
      this.Mother.nativeElement.focus();
    } else if (FieldNameIn === 'PartnerField') {
      this.Partner.nativeElement.focus();
    }
  }

  ReceivedFocus(ControlIn: string) {
    // console.log('Received focus, control= ' + ControlIn);
  }

  get PersonGivvenName() {return this.personForm.get('PersonGivvenName'); }

  get PersonFamilyName() {return this.personForm.get('PersonFamilyName'); }

  get PersonDateOfBirth() { return this.personForm.get('PersonDateOfBirth'); }

  get PersonPlaceOfBirth() { return this.personForm.get('PersonPlaceOfBirth'); }

  get PersonDateOfDeath() { return this.personForm.get('PersonDateOfDeath'); }

  get PersonID() { return this.personForm.get('PersonID'); }

  get PersonIsMale() { return this.personForm.get('PersonIsMale'); }

}
