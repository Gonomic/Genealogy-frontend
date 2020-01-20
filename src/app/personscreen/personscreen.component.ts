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
      this.subscription = this.messageService.getMessage().subscribe(message => { this.getPersonDetails(message); });
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
    this.dataSprocsService.getPersonDetails(PersonId).
      subscribe(person => {
        this.person = person;
        console.log(JSON.stringify(this.person));
      });
  }


}