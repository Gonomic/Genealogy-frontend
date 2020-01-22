import { Component, OnInit, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
// Kan weg? import { PlainPersonListMember } from '../Plainpersonlistmember';
// Kan weg? import { Subject, Observable, Subscription, of } from 'rxjs';
import { MessageService } from '../eventhub.service';

@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
})

export class SearchHubComponent implements OnInit {
  private plainpersonlist: object;
  private namesToLookForFromScreen: string;
  person: number;
  theMessageObject: object;

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {}


  ngOnInit() {}

  sendMessage(PersonIdIn): void {
    this.theMessageObject = { 'action': 'getExistingPerson', 'name': null, 'Id': PersonIdIn };
    this.messageService.sendMessage(this.theMessageObject);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  // private ChoosePersonDetails(PersonIDFromScreen): void {
  //   this.messageService.sendMessage({ 'action': 'getExistingPerson', 'name': null, 'Id': PersonIDFromScreen });
  // }

  private AddPerson(PersonNameIn) {
    this.theMessageObject = { 'action': 'addNewPerson', 'name': PersonNameIn, 'Id': null }
    this.messageService.sendMessage(this.theMessageObject);
  }


  private getPlainListOfPersons(namesToLookForFromScreen: string): void {
    if (!(namesToLookForFromScreen.length === 0 || !namesToLookForFromScreen.trim())) {
      this.dataSprocsService.getPlainListOfPersons(namesToLookForFromScreen).
        subscribe(plainListofPersons => {
          this.plainpersonlist = plainListofPersons;
        });
    }
  }
}