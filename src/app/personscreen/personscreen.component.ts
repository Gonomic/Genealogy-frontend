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
  private possibleFatherList = {};
  private possibleMotherList = {};
  private possiblePartnerList = {};
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
            this.getPersonDetails(message.Id, message.Birth);
          }
        });
    }

  private DateChanged(DateIn){
    console.log('Date changed, date now: ' + DateIn);
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
    this.possibleFatherList = {};
  }

  private resetPossibeMotherList(): void {
    this.possibleMotherList = {};
  }

  private resetPossiblePartnerList(): void {
    this.possiblePartnerList = {};
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private getPersonDetails(PersonId: number, BirthDate: Date): void {
    this.dataSprocsService.getPersonDetails(PersonId).
    subscribe (
      (person) => {
        this.IntermPers = person;
        this.person = this.IntermPers.data;
        this.dataSprocsService.getPossibleMotherList(PersonId, BirthDate).
        subscribe (
          (PossibeMotherList) => {
            this.possibleMotherList = this.possibleMotherList;
            this.dataSprocsService.getPossibleFatherList(PersonId, BirthDate).
            subscribe (
              (PossibleFatherList) => {
                this.possibleFatherList = PossibleFatherList;
                this.dataSprocsService.GetPossiblePartnerList(PersonId, BirthDate).
                subscribe (
                  (PossibePartnerList) => {
                    this.possiblePartnerList = PossibePartnerList;
                  }
                );
              }
            );
          }
        );
      }
    );
  }



  // private getPersonDetails(PersonId: number, BirthDate: Date): void {
  //   this.dataSprocsService.getPersonDetails(PersonId)
  //   .subscribe(person => {
  //     this.IntermPers = person;
  //     this.person = this.IntermPers.data;
  //   });
  // }

  // this.dataSprocsService.AddChildToParent(this.addChildToParrent).
  // subscribe (
  //   (data0) => {
  //     this.dataSprocsService.getChildList(this.PersonIdInPersonScreen).
  //     subscribe (
  //       (children) => {
  //         this.children = children;
  //         this.dataSprocsService.getPossibleChildrenList(this.PersonIdInPersonScreen).
  //         subscribe(
  //           (possiblechildrenlist) => {
  //             this.possibleChildrenList = possiblechildrenlist;
  //           }
  //         );
  //       }
  //     );
  //   }
  // );
}