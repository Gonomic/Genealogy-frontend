
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
import { Child } from './child';
import { ActionResult } from './ActionResult';
import { AddChildToParent } from './AddChildToParent';
import { FamilytreeMember } from './familytreemember';
import { PlainPersonListMember } from './Plainpersonlistmember';


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

  getFamilyTree(PersonId: number): Observable<FamilytreeMember[]> {
    const url = 'http://localhost:1337/getFamilyTree?person=' + PersonId + '&GenerationsToGoUp=20&GenerationsToGoDown=20&IncludePartners=1';
    return this.http.get<FamilytreeMember[]>(url).pipe(
      tap(_ => console.log('Fetched FamilyTree for person with id= ' + PersonId)),
      catchError(this.handleError<FamilytreeMember[]>('getFamilyTree id=${PersonId}'))
    );
  }

  getFather(PersonId: number): Observable<Person[]> {
    const url = 'http://localhost:1337/getFather?person=' + PersonId;
    return this.http.get<Person[]>(url).pipe(
      tap(_ => console.log('Fetched father details for Father with id= ' + PersonId)),
      catchError(this.handleError<Person[]>('getFather id=${PersonId}'))
    );
  }

  getPlainListOfPersons(PersonNamesLike: string): Observable<PlainPersonListMember[]> {
    const url = 'http://localhost:1337/getPlainListOfPersons?NameInLike=' + PersonNamesLike;
    return this.http.get<PlainPersonListMember[]>(url).pipe(
      tap(_ => console.log('Fetched persons with names like= ' + PersonNamesLike)),
      catchError(this.handleError<PlainPersonListMember[]>('getPlainListOfPersons PersonNamesLike=${PersonNamesLike}'))
    );
  }

  getPersonDetails(PersonId: number): Observable<Person> {
    const url = 'http://localhost:1337/getPersonDetails?person=' + PersonId;
    return this.http.get<Person>(url).pipe(
      tap(_ => console.log('Fetched person with Id= ' + PersonId)),
      catchError(this.handleError<Person>('getPersonDetails PersonId=${PersonId}'))
    );
  }

  getChildList(PersonId: number): Observable<Child> {
    const url = 'http://localhost:1337/getAllChildrenWithPartnerFromOneParent?ParentIn=' + PersonId;
    return this.http.get<Child>(url).pipe(
      tap(_ => console.log('Fetched children for person with Id= ' + PersonId)),
      catchError(this.handleError<Child>('getChildList PersonId=${PersonId}'))
    );
  }

  getPossibleChildrenList(PersonId: number): Observable<Child> {
    const url = 'http://localhost:1337/getPossibleChildren?ParentId=' + PersonId;
    return this.http.get<Child>(url).pipe(
      tap(_ => console.log('Fetched possible children for person with Id= ' + PersonId)),
      catchError(this.handleError<Child>('getPossibleChildrenList PersonId=${PersonId}'))
    );
  }

  AddChildToParent(AddChildToParentObj: AddChildToParent ): Observable<any> {
    const url = 'http://localhost:1337/postAddChildToParent';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, AddChildToParentObj, httpOptions)
    .pipe(
      tap(_ => console.log('Added Child: ' + AddChildToParentObj.ChildId + ' to parent ' + AddChildToParentObj.ParentId)),
      catchError(this.handleError<AddChildToParent>('AddChildToParent Child=${AddChildToParentObj.ChildId} and parent=$(AddChildToParentObj.ParentId)'))
    );
  }



}
