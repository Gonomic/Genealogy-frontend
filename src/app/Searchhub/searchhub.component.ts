import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataSprocsService } from '../datasprocs.service';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { MessageService } from '../eventhub.service';
import { StateServiceSerchHubScreen } from '../statemanagement.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router, NavigationStart, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
})

export class SearchHubComponent implements OnInit {
  public plainpersonlist: object = {};
  private person: number;
  private theMessageObject: object;
  private incomingMessage: Subscription;
  private searchForm: FormGroup;

private destroyed = new Subject();


  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private stateServiceSerchHubScreen: StateServiceSerchHubScreen,
    private router: Router,

    ) {

      this.searchForm = new FormGroup({
        nameToLookForFromScreen: new FormControl('')
      });

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

        this.router.events
        .subscribe((event: RouterEvent) => {
          if (event instanceof NavigationStart) {
            if ( event.url.slice(1, 7) !== 'person') {
              this.stateServiceSerchHubScreen.SetStatusBeforeLeavingSearchHubScreen(
                this.searchForm,
                this.plainpersonlist,
                'edditing'
              );
            }
            this.stateServiceSerchHubScreen.setStateIsInitial = false;
          }
        });

  }


  ngOnInit() {
    if (! this.stateServiceSerchHubScreen.stateIsInitial) {
      this.searchForm = this.stateServiceSerchHubScreen.searchFormGroup;
      this.plainpersonlist = this.stateServiceSerchHubScreen.plainPersonList;
    }

  }


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
