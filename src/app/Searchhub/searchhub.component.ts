import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public plainpersonlist: object = {};
  person: number;
  theMessageObject: object;
  incomingMessage: Subscription;
  searchForm = new FormGroup({
    nameToLookForFromScreen: new FormControl('')
  });



  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
    ) {
      this.searchForm.get('nameToLookForFromScreen').valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged())
          .subscribe(value => {
            console.log(value);
            this.getPlainListOfPersons(value);
        });

        this.incomingMessage = this.messageService
        .getMessage()
        .subscribe(message => {
          if (message.action === 'refreshPersonList') {
            console.log('In searchhub component. Message= ' + JSON.stringify(message));
            this.getPlainListOfPersons(this.searchForm.get('nameToLookForFromScreen').value);
          }
        });

  }


  ngOnInit() {}


  sendMessage(PersonIdIn: number, BirthDateIn: Date): void {
    this.theMessageObject = { 'action': 'getExistingPerson', 'name': null, 'Id': PersonIdIn, 'Birth': BirthDateIn };
    this.messageService.sendMessage(this.theMessageObject);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  private AddPerson() {
    this.theMessageObject = { 'action': 'addNewPerson', 'name': this.searchForm.get('nameToLookForFromScreen').value, 'Id': null };
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
