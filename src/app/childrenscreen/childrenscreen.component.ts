import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { Child } from '../child';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';


@Component({
  selector: 'app-children-screen',
  templateUrl: './childrenscreen.component.html',
  styleUrls: ['./childrenscreen.component.css'],
})

export class ChildrenScreenComponent implements OnDestroy {
  private children: object = {};
  // private children: Child[];
  private child: Child = new Child;
  // private IntermPers: any;
  // private namesToLookFor: string;
  // private indexOfPerson: number;
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
          } else {

            this.getChildList(message.Id);
          }
        });
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private resetChildList(): void {
    this.children = [];
  }

  private getChildList(ParentId: number): void {
    this.dataSprocsService.getChildList(ParentId)
    .subscribe(children => {
      this.children = children;
    });
  }

}