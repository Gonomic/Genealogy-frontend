import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-previousmariage-screen',
  templateUrl: './previousmariagescreen.component.html',
  styleUrls: ['./previousmariagescreen.component.css'],
})

export class PreviousMariageScreenComponent implements OnDestroy, OnInit {
  private destroyed$ = new Subject();

  message: any;
  subscription: Subscription;

  documentForm = new FormGroup({
    DocumentToAdd: new FormControl(0)
  });

  constructor(
    private dataSprocsService: DataSprocsService,
    private messageService: MessageService,
    private router: Router
  ) {
      this.subscription = this.messageService
        .getMessage()
        .subscribe(message => {
          if (message.action === '????????') {
          console.log('PreviousMariageScreen code to be added.');
          } else if (message.action = '??????????') {
            console.log('PreviousMariageScreen code to be added.');
          }
        });
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    throw new Error('ngOnDestroy() Method in PreviousMariageScreenComponent only partially implemented.');
  }

  ngOnInit(){
    this.router.events
    .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        takeUntil(this.destroyed$),
      )
      .subscribe((event: NavigationStart) => {
        console.log('PreviousMariageScreenComponent, ngOnInit() => Routing event catched: ' + JSON.stringify(event));
      });
  }
}
