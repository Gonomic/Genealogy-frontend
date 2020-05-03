import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { FormGroup, FormControl } from '@angular/forms';
import {catchError, map, mergeMap, tap, subscribeOn} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Child } from '../child';
import { AddChildToParent } from '../AddChildToParent';
import { RemoveChildFromParent } from '../RemoveChildFromParent';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { StateServiceChildrenScreen } from '../statemanagement.service';;



@Component({
  selector: 'app-children-screen',
  templateUrl: './childrenscreen.component.html',
  styleUrls: ['./childrenscreen.component.css'],
})

export class ChildrenScreenComponent implements OnDestroy, OnInit {
  private children = {};
  private possibleChildrenList = {};
  // private child: Child = new Child;
  private addChildToParrent: AddChildToParent;
  // private removeChildFromParent: RemoveChildFromParent;
  private PersonIdInPersonScreen: number;
  private childrenForm: FormGroup;
  private destroyed$: any;

  private message: any;
  private subscription: Subscription;



  constructor(
    private dataSprocsService: DataSprocsService,
    private stateServiceChildrenScreen: StateServiceChildrenScreen,
    private messageService: MessageService,
    private router: Router
  ) {

      this.childrenForm = new FormGroup({
        ChildToAdd: new FormControl(null)
      });

      this.destroyed$ = new Subject();

      this.subscription = this.messageService
      .getMessage()
      .subscribe(message => {
        if (message.action === 'addNewPerson') {
          this.resetChildList();
          this.resetpossibleChildrenList();
        } else if (message.action = 'getExistingPerson') {
          this.PersonIdInPersonScreen = message.Id;
          // Changes message.Id in beneath lines to this.PersonIdInPersaonScreen
          this.getChildList(this.PersonIdInPersonScreen);
          this.getPossibleChildrenList(this.PersonIdInPersonScreen);
        }
      });

      this.router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          console.log('!-> PersonScreenComponent, Navigationstart.');
          if ( event.url.slice(1, 7) !== 'person') {
            this.stateServiceChildrenScreen.SetStatusBeforeLeavingChildrenScreen(
              this.childrenForm,
              this.children,
              this.possibleChildrenList,
              'edditing'
            );
          }
          this.stateServiceChildrenScreen.setStateIsInitial = false;
        }
      });
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy() Method in ChildrenScreenComponent only partially implemented.');
  }

  ngOnInit() {
    if (! this.stateServiceChildrenScreen.stateIsInitial) {
      this.childrenForm = this.stateServiceChildrenScreen.childrenFormGroup;
      this.children = this.stateServiceChildrenScreen.Children;
      this.possibleChildrenList = this.stateServiceChildrenScreen.possibleChildrenList;
    }
  }

  private onPossibleChildAddition(eventObject): void {
    this.addChildToParrent = new AddChildToParent(eventObject.value, this.PersonIdInPersonScreen);
    console.log('Add child: ' + eventObject.value + ' to person: ' + this.PersonIdInPersonScreen);
    this.dataSprocsService.AddChildToParent(this.addChildToParrent).
    subscribe (
      (data0) => {
        this.dataSprocsService.getChildList(this.PersonIdInPersonScreen).
        subscribe (
          (children) => {
            this.children = children;
            this.dataSprocsService.getPossibleChildrenList(this.PersonIdInPersonScreen).
            subscribe(
              (possiblechildrenlist) => {
                if (possiblechildrenlist === undefined ) {
                  this.possibleChildrenList = [];
                } else {
                  this.possibleChildrenList = possiblechildrenlist;
                }
              }
            );
          }
        );
      }
    );
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
      if (possiblechildrenlist === undefined) {
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

  private removeAsChild(ChildId: number, ParentId: number): void {
    // this.removeChildFromParent = new RemoveChildFromParent(ChildId, ParentId);
    this.dataSprocsService.removeChildFromParent(ChildId, ParentId).
    subscribe (
      (returnedResult) => {
        this.dataSprocsService.getChildList(ParentId).
        subscribe (
          (children) => {
            this.children = children;
            this.dataSprocsService.getPossibleChildrenList(ParentId).
            subscribe(
              (possiblechildrenlist) => {
                if (possiblechildrenlist === undefined) {
                  this.possibleChildrenList = [];
                } else {
                  this.possibleChildrenList = possiblechildrenlist;
                }
              }
            );
          }
        );
      }
    );

  }

}