import { Component, OnInit } from '@angular/core';
import 'snapsvg-cjs';
import { TemplateBindingParseResult } from '@angular/compiler';
import { DataSprocsService } from '../datasprocs.service';
import { Person } from '../person';
import {FamilytreeMember} from '../familytreemember';
import { PlainPersonListMember } from '../Plainpersonlistmember';


declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-relation-screen',
  templateUrl: './relationscreen.component.html',
  styleUrls: ['./relationscreen.component.css']
})


export class RelationScreenComponent implements OnInit {
//   private persons: Person[];
//   private familytree: FamilytreeMember[];
//   private plainpersonlist: PlainPersonListMember[];
//   private PerzonId1: number;
//   private PerzonId2: number;
//   private namesToLookFor: string;
  private s: object;
//   private StartposX = 0;
//   private StartPosY = 0;
//   private endPosX = 0;
//   private endPosY = 0;
//   private indexOfPerson = 0;
//   private tmpLineIn = null;
//   private tmpLineOut = null;

//   private widthBox = 30;
//   private heightBox = 30;

//   private defaultGapX = 50;
//   private defaultGapY = 50;

//   private perzonId: number;

//   constructor(
//     private dataSprocsService: DataSprocsService
//   ) {}

  ngOnInit() {
    this.s = Snap('#MySvgID');
  }

//   private dragStart(x, y, e) {
//     this.attr('fill', 'red');
//     this.indexOfPerson = this.GetArrayIndexOfPerson(parseInt(this.attr('gynID')));
//     console.log('In dragstart. IndexOfPerson= ' + indexOfPerson + '. Length of fa array= ' + this.fa.length);
//     if (this.indexOfPerson > 0) {
//       console.log('Setting tmpLineIn');
//       this.tmpLineIn = this.s.select('#' + (this.fa[indexOfPerson].ConnectingLineInId));
//       console.log('tmpLineIn= ' + JSON.stringify(tmpLineIn));
//     }
//     if (this.indexOfPerson < this.fa.length) {
//       console.log('Setting tmpLineOut');
//       this.tmpLineOut = this.s.select('#' + (this.fa[indexOfPerson].ConnectingLineOutId));
//       console.log('tmpLineOut= ' + JSON.stringify(this.tmpLineOut));
//     }
//     console.log('');
//   }

//   private dragMove(dx, dy, x, y, e) {
//     this.indexOfPerson = GetArrayIndexOfPerson(parseInt(this.attr('gynID')));
//     console.log('In dragMove. IndexOfPerson= ' + this.indexOfPerson + '. Length of fa array= ' + this.fa.length);
//     this.fa[this.indexOfPerson].dx = dx;
//     this.fa[indexOfPerson].dy = dy;
//     this.transform('translate(' + dx + ',' + dy + ')');
//     if (this.indexOfPerson > 0) {
//       console.log('Setting attributes of tmpLineIn');
//       this.tmpLineIn.attr({  x2: (this.fa[indexOfPerson].ConnectingLineInX + dx),   y2: (this.fa[indexOfPerson].ConnectingLineInY + dy)});
//       console.log('Attributes of tmpLineIn= ' + JSON.stringify(this.tmpLineIn));
//     }
//     if (this.indexOfPerson < (this.fa.length - 1)) {
//       console.log('Setting attributes of tmpLineOut');
//       this.tmpLineOut.attr({  x1: (this.fa[this.indexOfPerson].ConnectingLineOutX + dx),   y1: (this.fa[indexOfPerson].ConnectingLineOutY + dy)});
//       console.log('Attributes of tmpLineOut= ' + JSON.stringify(tmpLineOut));
//     }
//     console.log('');
//   }

//   private dragEnd(e) {
//     this.indexOfPerson = GetArrayIndexOfPerson(parseInt(this.attr('gynID')));
//     this.transform('');
//     this.fa[this.indexOfPerson].dx += this.fa[this.indexOfPerson].posXinitial;
//     this.fa[this.indexOfPerson].dy += this.fa[this.indexOfPerson].posYinitial;
//     this.fa[this.indexOfPerson].posXinitial = this.fa[this.indexOfPerson].dx;
//     this.fa[this.indexOfPerson].posYinitial = this.fa[this.indexOfPerson].dy;
//     this.attr({'x': this.fa[this.indexOfPerson].dx,
//                'y': this.fa[this.indexOfPerson].dy,
//                'fill': 'black'});
//     this.fa[this.indexOfPerson].dx = 0;
//     this.fa[this.indexOfPerson].dy = 0;
//     if (this.indexOfPerson > 0) {
//       this.fa[this.indexOfPerson].ConnectingLineInX = this.tmpLineIn.attr('x2');
//       this.fa[this.indexOfPerson].ConnectingLineInY = this.tmpLineIn.attr('y2');
//     }
//     if (this.indexOfPerson < (this.fa.length - 1)) {
//       this.fa[this.indexOfPerson].ConnectingLineOutX = this.tmpLineOut.attr('x1');
//       this.fa[this.indexOfPerson].ConnectingLineOutY = this.tmpLineOut.attr('y1');
//     }
//   }

// private GetArrayIndexOfPerson(PersonIn) {
//   for (let i = 0; i < this.fa.length; i++ ) {
//     if (this.fa[i].Person === PersonIn) {
//       return i;
//     }
//   }
// }
}
