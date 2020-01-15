import { Component, OnInit, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { PlainPersonListMember } from '../Plainpersonlistmember';
import { Subject } from 'rxjs/Subject';
import { EventBridgeService } from '../eventbridge.service';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css'],
  providers: [EventBridgeService]
})
export class SearchHubComponent implements OnInit {
  @Output() onChoosePersonDetails = new EventEmitter();
  private plainpersonlist: object;
  private namesToLookForFromScreen: string;
  private onPersonChosenEndSource = new Subject();
  public onPersonChosenEnd$ = this.onPersonChosenEndSource.asObservable();

  constructor(
    private dataSprocsService: DataSprocsService,
    public eventB: EventBridgeService
  ) {}

  ngOnInit() {
  }

private ChoosePersonDetails(PersonIDFromScreen): void {
  this.eventB.SendTheMessage(PersonIDFromScreen);
  console.log('Message emitted from ChoosePersonDetails with onPersonChosenEndSource, PersonIDFromScreen= ' + PersonIDFromScreen);
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