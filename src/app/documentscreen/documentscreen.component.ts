import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../eventhub.service';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-document-screen',
  templateUrl: './documentscreen.component.html',
  styleUrls: ['./documentscreen.component.css'],
})

export class DocumentScreenComponent implements OnDestroy, OnInit {
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
          console.log('DocumentScreen code to be added.');
          } else if (message.action = '??????????') {
            console.log('DocumentScreen code to be added.');
          }
        });
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy() Method in DocumentScreenComponent only partially implemented.');
  }

  ngOnInit(){
    this.router.events
    .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        takeUntil(this.destroyed$),
      )
      .subscribe((event: NavigationStart) => {
        console.log('DocumentScreenComponent, ngOnInit() => Routing event catched: ' + JSON.stringify(event));
      });
  }
}
