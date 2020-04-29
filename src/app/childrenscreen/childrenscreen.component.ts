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



@Component({
  selector: 'app-children-screen',
  templateUrl: './childrenscreen.component.html',
  styleUrls: ['./childrenscreen.component.css'],
})

export class ChildrenScreenComponent implements OnDestroy, OnInit {
  private children = {};
  private possibleChildrenList = {};
  private child: Child = new Child;
  private addChildToParrent: AddChildToParent;
  private removeChildFromParent: RemoveChildFromParent;
  private PersonIdInPersonScreen: number;
  private tranResult = {};

  private destroyed$ = new Subject();

  message: any;
  subscription: Subscription;

  childrensForm = new FormGroup({
    ChildToAdd: new FormControl(0)
  });

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private router: Router
  ) {
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
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy() Method in ChildrenScreenComponent only partially implemented.');
  }

  ngOnInit() {
    this.router.events
    .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        takeUntil(this.destroyed$),
      )
      .subscribe((event: NavigationStart) => {
        console.log('ChildrenScreenComponent, ngOnInit() => Routing event catched: NavigationStart ' + JSON.stringify(event));
      });

    this.router.events
    .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$),
      )
      .subscribe((event: NavigationEnd) => {
        console.log('ChildrenScreenComponent, ngOnInit() => Routing event catched: NavigationEnd ' + JSON.stringify(event));
      });
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