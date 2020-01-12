import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { PlainPersonListMember } from '../Plainpersonlistmember';


@Component({
  selector: 'app-search-hub',
  templateUrl: './searchhub.component.html',
  styleUrls: ['./searchhub.component.css']
})
export class SearchHubComponent implements OnInit {

  private plainpersonlist: PlainPersonListMember[];
  private namesToLookFor: string;

  constructor(
    private dataSprocsService: DataSprocsService
  ) {}

  ngOnInit() {
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