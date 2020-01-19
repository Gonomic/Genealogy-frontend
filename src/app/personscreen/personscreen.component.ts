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
  // private familytree: FamilytreeMember[];
  // private plainpersonlist: PlainPersonListMember[];
  private namesToLookFor: string;
  private indexOfPerson: number;
  message: any;
  subscription: Subscription;

  constructor(
    // private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {
      this.message = 'Test';
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  // private getPerson(PersonIdIn): void {
  //   this.indexOfPerson = PersonIdIn;
  //   // this.person = PersonIdIn;
  //   console.log('Persoon gekozen in SearchHub, via Observable / Observer doorgekomen in PersoonScreenComponent. Person= ' + PersonIdIn);
  // }

  // private getFather(PersonIdFromScreen): void {
  //   console.log('getFamily aangeklikt met Person= ' + PersonIdFromScreen);
  //   this.dataSprocsService.getFather(PersonIdFromScreen).
  //     subscribe(persons => {
  //       this.persons = persons;
  //       console.log(JSON.stringify(this.persons));
  //     });
  // }


}