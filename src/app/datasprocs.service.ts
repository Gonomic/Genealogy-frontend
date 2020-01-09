
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// // import { catchError, map, tap} from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })

// export class DataSprocsService {

//   // httpOptions = {
//   //     headers: new HttpHeaders({
//   //       'Access-Control-Allow-Origin': ['http://localhost:1337', 'http://127.0.0.1:1337']
//   //     })
//   //   };

//   private FeedHumans: any;

//   uri = 'http://localhost:1337';

//   constructor(private http: HttpClient) {}

//   getFather(ChildId) {
//     const obj = {
//       ChildId: ChildId
//     };
//     this.http.get('http://localhost:1337/getFather?person=777')
//     .subscribe(
//           data => console.log('Done. Fetched data= ' + JSON.stringify(data)),
//           error => console.log('Error. Error= '  + JSON.stringify(error)));
//       }

// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Person } from './person';
import {FamilyTree} from './FamilyTree';


@Injectable({
  providedIn: 'root'
})

export class DataSprocsService {

  private FeedHumans: any;

  uri = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

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

  getFamilyTree(PersonId: number): Observable<FamilyTree[]> {
    const url = 'getFamilyTree?person=' + PersonId + '&GenerationsToGoUp=20&GenerationsToGoDown=20&IncludePartners=1';
    return this.http.get<FamilyTree[]>(url).pipe(
      tap(_ => console.log('Fetched FamilyTree for person with id= ' + PersonId)),
      catchError(this.handleError<FamilyTree[]>('getPersons id=${PersonId}'))
    );
  }

  getPersons(PersonId: number): Observable<Person[]> {
    const url = 'http://localhost:1337/getFather?person=' + PersonId;
    return this.http.get<Person[]>(url).pipe(
      tap(_ => console.log('Fetched person details from person with id= ' + PersonId)),
      catchError(this.handleError<Person[]>('getPersons id=${PersonId}'))
    );
  }

}
