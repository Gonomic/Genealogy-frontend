import { Component, OnInit, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { MessageService } from '../eventhub.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
})

export class SearchHubComponent implements OnInit {
  private plainpersonlist: object = {};
  public nameToLookForFromScreen: string;
  person: number;
  theMessageObject: object;
  nameToLookForFromScreenUpdate = new Subject<string>();

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {
      this.nameToLookForFromScreenUpdate.pipe(
        debounceTime(500),
        distinctUntilChanged())
        .subscribe(value => {
          console.log(value);
          this.getPlainListOfPersons(value);
        });
  }


  ngOnInit() {}

  sendMessage(PersonIdIn): void {
    this.theMessageObject = { 'action': 'getExistingPerson', 'name': null, 'Id': PersonIdIn };
    this.messageService.sendMessage(this.theMessageObject);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  private AddPerson(PersonNameIn) {
    this.theMessageObject = { 'action': 'addNewPerson', 'name': PersonNameIn, 'Id': null }
    this.messageService.sendMessage(this.theMessageObject);
  }


  private getPlainListOfPersons(nameIn: string): void {
    if (nameIn.length === 0 || !nameIn.trim()) {
        this.plainpersonlist = {};
    } else {
        this.dataSprocsService.getPlainListOfPersons(nameIn)
          .subscribe(plainListofPersons => {
              if (plainListofPersons) {
                this.plainpersonlist = plainListofPersons;
              } else {
                this.plainpersonlist = {};
              }
            });
    }
  }
}