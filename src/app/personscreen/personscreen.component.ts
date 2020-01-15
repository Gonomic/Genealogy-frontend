import { Component, OnInit, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
import {FamilytreeMember} from '../familytreemember';
import { PlainPersonListMember } from '../Plainpersonlistmember';
import { Subscription } from 'rxjs/Subscription';
import { EventBridgeService } from '../eventbridge.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css'],
  providers: [EventBridgeService]

})
export class PersonScreenComponent implements OnInit {
  @Output() onComplete = new EventEmitter<void>();
  private persons: Person[];
  private familytree: FamilytreeMember[];
  private plainpersonlist: PlainPersonListMember[];
  private namesToLookFor: string;
  private indexOfPerson = 0;
  private EventBridgeRef: Subscription = null;

  constructor(
    private dataSprocsService: DataSprocsService,
    public eventbridgeservice: EventBridgeService
  ) {}

  ngOnInit() {
    this.EventBridgeRef = this.eventbridgeservice.onPersonChosenEnd$.subscribe(() => {
      this.onComplete.emit();
    });
  }

  private getFather(PersonIdFromScreen): void {
    console.log('getFamily aangeklikt met Person= ' + PersonIdFromScreen);
    this.dataSprocsService.getFather(PersonIdFromScreen).
      subscribe(persons => {
        this.persons = persons;
        console.log(JSON.stringify(this.persons));
      });
  }


}