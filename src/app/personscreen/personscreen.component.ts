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
            console.log('In Personscreencomponent, branche= addNewPerson');
            console.log('In PersonScreenComponent, person= ' + JSON.stringify(this.person));
            this.ResetPersonRecord(message.name);
            console.log('In PersonScreenComponent, person= ' + JSON.stringify(this.person));
          } else {
            console.log('In PersonScreenComponent, branche= else');
            this.getPersonDetails(message.Id);
          }
        });
    }


  ResetPersonRecord(PersonNameIn: string) {
    this.person.PersonId = null;
    this.person.PersonGivvenName = null;
    this.person.PersonFamilyName = PersonNameIn;
    this.person.PersonDateOfBirth = null;
    this.person.PersonPlaceOfBirth = null;
    this.person.PersonDateOfDeath = null;
    this.person.PersonPlaceOfDeath = null;
    this.person.PersonIsMale = null;
    this.person.MotherID = null;
    this.person.MotherName = null;
    this.person.FatherID = null;
    this.person.FatherName = null;
    this.person.PartnerID = null;
    this.person.PartnerName = null;
    this.person.Timestamp = null;
    this.person.FatherAndMotherArePartners = null;
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