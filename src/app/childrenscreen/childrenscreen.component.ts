import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Child } from '../child';
import { AddChildToParent } from '../AddChildToParent';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';


@Component({
  selector: 'app-children-screen',
  templateUrl: './childrenscreen.component.html',
  styleUrls: ['./childrenscreen.component.css'],
})

export class ChildrenScreenComponent implements OnDestroy {
  private children: object = {};
  private possibleChildrenList = {};
  private child: Child = new Child;
  private addChildToParrent: AddChildToParent;
  private PersonIdInPersonScreen: number;

  message: any;
  subscription: Subscription;

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService
  ) {
      this.subscription = this.messageService
        .getMessage()
        .subscribe(message => {
          if (message.action === 'addNewPerson') {
            this.resetChildList();
            this.resetpossibleChildrenList();
          } else {
            this.PersonIdInPersonScreen = message.Id;
            this.getChildList(message.Id);
            this.getPossibleChildrenList(message.Id);
          }
        });
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private onPossibleChildAddition(eventObject): void {
    this.addChildToParrent = new AddChildToParent(this.PersonIdInPersonScreen, 1, eventObject.value);
    console.log('Add child: ' + eventObject.value + ' to person: ' + this.PersonIdInPersonScreen);
    this.dataSprocsService.AddChildToParent(this.addChildToParrent);
    this.getChildList(this.PersonIdInPersonScreen);
    this.getPossibleChildrenList(this.PersonIdInPersonScreen);
  }

  private resetpossibleChildrenList(): void {
    this.possibleChildrenList = [];
  }

  private resetChildList(): void {
    this.children = [];
  }

  private getPossibleChildrenList(ParentId: number): void {
    this.dataSprocsService.getPossibleChildrenList(ParentId)
    .subscribe(possiblechildrenlist => {
      if (possiblechildrenlist == null){
        this.possibleChildrenList = [];
      } else {
      this.possibleChildrenList = possiblechildrenlist;
      }
    });
  }

  private getChildList(ParentId: number): void {
    this.dataSprocsService.getChildList(ParentId)
    .subscribe(children => {
      if (children == null) {
        this.children = [];
      } else {
      this.children = children;
      }
    });
  }

}