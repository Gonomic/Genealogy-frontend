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

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {}


  ngOnInit() {}

  sendMessage(PersonIn): void {
    this.messageService.sendMessage(PersonIn);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  private ChoosePersonDetails(PersonIDFromScreen): void {
    this.messageService.sendMessage(PersonIDFromScreen);
  }

  private getPlainListOfPersons(namesToLookForFromScreen): void {
    this.dataSprocsService.getPlainListOfPersons(namesToLookForFromScreen).
      subscribe(plainListofPersons => {
        this.plainpersonlist = plainListofPersons;
      });
  }
} 