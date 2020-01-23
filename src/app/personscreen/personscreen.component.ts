import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
// import {FamilytreeMember} from '../familytreemember';
// import { PlainPersonListMember } from '../Plainpersonlistmember';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';



@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
  // providers: [MessageService, DataSprocsService]

})

export class PersonScreenComponent implements OnDestroy {
  private persons: Person[];
  private person: Person;
  private IntermPers: any;
  // private familytree: FamilytreeMember[];
  // private plainpersonlist: PlainPersonListMember[];
  private namesToLookFor: string;
  private indexOfPerson: number;
  message: any;
  subscription: Subscription;

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {
      // this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
      this.subscription = this.messageService
        .getMessage()
        .subscribe(message => {
          console.log('In PersonScreenComponent. Message= ' + JSON.stringify(message));
          if (message.action === 'addNewPerson') {
            this.ResetPersonRecord(message.name);
          } else {

            this.getPersonDetails(message.Id);
          }
        });
    }


  private ResetPersonRecord(PersonNameIn: string) {
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



  // private getPerson(PersonIdIn): void {
  //   this.indexOfPerson = PersonIdIn;
  //   // this.person = PersonIdIn;
  //   console.log('Persoon gekozen in SearchHub, via Observable / Observer doorgekomen in PersoonScreenComponent. Person= ' + PersonIdIn);
  // }

  private getPersonDetails(PersonId): void {
    console.log('getPersonDetails gestart vanuit event met Person= ' + JSON.stringify(PersonId));
    this.dataSprocsService.getPersonDetails(PersonId)
    .subscribe(person => {
      this.IntermPers = person;
      this.person = this.IntermPers.data;
    });
  }


}