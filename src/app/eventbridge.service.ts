import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class EventBridgeService {
    private onPersonChosenEndSource = new Subject<void>();
    public onPersonChosenEnd$ = this.onPersonChosenEndSource.asObservable();

    public SendTheMessage(ForInvolvedPerson: number) {
      console.log('In EventBridgeService. Person ID coming in= ' + ForInvolvedPerson);
      this.onPersonChosenEndSource.next();
    }

  constructor() { }
}
