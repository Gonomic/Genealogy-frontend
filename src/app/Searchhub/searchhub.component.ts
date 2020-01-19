import { Component, OnInit, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { PlainPersonListMember } from '../Plainpersonlistmember';
// import { Subject } from 'rxjs/Subject';
import { MessageService } from '../eventhub.service';


@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
  // providers: [MessageService]
})

export class SearchHubComponent implements OnInit {
  private plainpersonlist: object;
  private namesToLookForFromScreen: string;
  person: number;
  // private onPersonChosenEndSource = new Subject();
  // public onPersonChosenEnd$ = this.onPersonChosenEndSource.asObservable();

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {}


  // ngOnInit() {}

  sendMessage(PersonIn): void {
    console.log('SearchHubComponent / sendMessage, PersonIn= ' + PersonIn);
    this.messageService.sendMessage('Test message from SearchHub Component: ' + PersonIn);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  private ChoosePersonDetails(PersonIDFromScreen): void {
    this.messageService.sendMessage(PersonIDFromScreen);
    console.log('In SearchHub. Message emitted from SearchHub to eventHubService, PersonIDFromScreen= ' + PersonIDFromScreen);
  }

  private getPlainListOfPersons(namesToLookForFromScreen): void {
    console.log('getPlainListOfPersons aangeklikt. namesToLookFor= ' + namesToLookForFromScreen);
    this.dataSprocsService.getPlainListOfPersons(namesToLookForFromScreen).
      subscribe(plainListofPersons => {
        this.plainpersonlist = plainListofPersons;
        console.log(JSON.stringify(this.plainpersonlist));
      });
  }
} 