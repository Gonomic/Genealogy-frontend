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
          } else {

            this.getPersonDetails(message.Id);
          }
        });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private getPersonDetails(PersonId: number): void {
    this.dataSprocsService.getPersonDetails(PersonId)
    .subscribe(person => {
      this.IntermPers = person;
      this.person = this.IntermPers.data;
    });
  }
}