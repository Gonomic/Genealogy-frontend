import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable(
  // { providedIn: 'root' }
)

export class MessageService {

  private subject = new Subject<any>();

  // constructor() {
  //   console.log('In constructor of EventHubService!');
  // }

  sendMessage(message: string) {
    console.log('In MessageService/sendMessage, message= ' + message);
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    console.log('In EventHubService/getPerson, returning observable: ' + JSON.stringify(this.subject.asObservable()));
    return this.subject.asObservable();
  }

}
