import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { PlainPersonListMember } from '../Plainpersonlistmember';


@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
})
export class SearchHubComponent implements OnInit {

  // private plainpersonlist: PlainPersonListMember[];
  private plainpersonlist: object;
  private namesToLookForFromScreen: string;

  constructor(
    private dataSprocsService: DataSprocsService
  ) {}

  ngOnInit() {
  }

private GetPersonDetails(PersonIDFromScreen): void {
  console.log('PersonIDFromScreen= ' + PersonIDFromScreen);
}

  private getPlainListOfPersons(namesToLookForFromScreen): void {
    console.log('getPlainListOfPersons aangeklikt. namesToLookFor= ' + namesToLookForFromScreen);
    this.dataSprocsService.getPlainListOfPersons(namesToLookForFromScreen).
      subscribe(plainListofPersons => {
        this.plainpersonlist = plainListofPersons;
        console.log(JSON.stringify(this.plainpersonlist.data));
      });
  }
}