import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class StateManagementService {

  private varOne: any;
  private varTwo: string;

  constructor(private datepipe: DatePipe) {}

  private handleError<T> (operation = 'operation', results?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to default logging service
      console.error(error);

      // TODO: transform error to make it user readeable
      // this.log('${operation' failed: ${error.message}');

      // Return empty result so the app keeps running
      return of(results as T);
    };
  }
}