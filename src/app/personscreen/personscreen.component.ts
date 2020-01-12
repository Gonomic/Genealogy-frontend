import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
import {FamilytreeMember} from '../familytreemember';
import { PlainPersonListMember } from '../Plainpersonlistmember';


@Component({
  selector: 'app-person-screen',
  templateUrl: './personscreen.component.html',
  styleUrls: ['./personscreen.component.css']
})
export class PersonScreenComponent implements OnInit {

  private persons: Person[];
  private familytree: FamilytreeMember[];
  private plainpersonlist: PlainPersonListMember[];
  private PerzonId1: number;
  private PerzonId2: number;
  private namesToLookFor: string;
  private indexOfPerson = 0;

  constructor(
    private dataSprocsService: DataSprocsService
  ) {}

  ngOnInit() {
  }

  private getFather(PersonIdFromScreen): void {
    console.log('getFamily aangeklikt met Person= ' + PersonIdFromScreen);
    this.dataSprocsService.getFather(PersonIdFromScreen).
      subscribe(persons => {
        this.persons = persons;
        console.log(JSON.stringify(this.persons));
      });
  }

  private getFamilyTree(PersonIdFromScreen): void {
    console.log('getFamilyTree aangeklikt met Person= ' + PersonIdFromScreen);
    this.dataSprocsService.getFamilyTree(PersonIdFromScreen).
      subscribe(familytree => {
        this.familytree = familytree;
        console.log(JSON.stringify(this.familytree));
      });
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