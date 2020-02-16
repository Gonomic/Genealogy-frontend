import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';


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
  message: any;
  subscription: Subscription;

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
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
    
    console.log('Add or change mother to: ' + eventObject.value);
  }

  private onPossibleFatherAdditionOrChange(eventObject): void {
    console.log('Add or change father to: ' + eventObject.value);
  }

  private onPossiblePartnerAdditionOrChange(eventObject): void {
    console.log('Add or change partner to: ' + eventObject.value);
  }
    
  private resetPersonRecord(PersonNameIn: string): void {
    this.person.PersonId = 0;
    this.person.PersonGivvenName = '';
    this.person.PersonFamilyName = PersonNameIn;
    this.person.PersonDateOfBirth = null;
    this.person.PersonPlaceOfBirth = '';
    this.person.PersonDateOfDeath = null;
    this.person.PersonPlaceOfDeath = '';
    this.person.PersonIsMale = true;
    this.person.MotherID = 0;
    this.person.MotherName = '';
    this.person.FatherID = 0;
    this.person.FatherName = '';
    this.person.PartnerID = 0;
    this.person.PartnerName = '';
    this.person.Timestamp = null;
    this.person.FatherAndMotherArePartners = false;
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
      }
    );
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
}