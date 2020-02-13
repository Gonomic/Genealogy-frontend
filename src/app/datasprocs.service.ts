
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
// import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Person } from './person';
import { Child } from './child';
import { ActionResult } from './ActionResult';
import { AddChildToParent } from './AddChildToParent';
import { RemoveChildFromParent } from './RemoveChildFromParent';
import { FamilytreeMember } from './familytreemember';
import { PlainPersonListMember } from './Plainpersonlistmember';


@Injectable({
  providedIn: 'root'
})

export class DataSprocsService {

  private FeedHumans: any;

  uri = 'http://localhost:1337';

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.get<FamilytreeMember[]>(url).pipe(
      tap(_ => console.log('Fetched FamilyTree for person with id= ' + PersonId)),
      catchError(this.handleError<FamilytreeMember[]>('getFamilyTree id=${PersonId}'))
    );
  }

  getFather(PersonId: number): Observable<Person[]> {
    const url = 'http://localhost:1337/getFather?person=' + PersonId;
    return this.httpClient.get<Person[]>(url).pipe(
      tap(_ => console.log('Fetched father details for Father with id= ' + PersonId)),
      catchError(this.handleError<Person[]>('getFather id=${PersonId}'))
    );
  }

  getPlainListOfPersons(PersonNamesLike: string): Observable<PlainPersonListMember[]> {
    const url = 'http://localhost:1337/getPlainListOfPersons?NameInLike=' + PersonNamesLike;
    return this.httpClient.get<PlainPersonListMember[]>(url).pipe(
      tap(_ => console.log('Fetched persons with names like= ' + PersonNamesLike)),
      catchError(this.handleError<PlainPersonListMember[]>('getPlainListOfPersons PersonNamesLike=${PersonNamesLike}'))
    );
  }

  getPersonDetails(PersonId: number): Observable<Person> {
    const url = 'http://localhost:1337/getPersonDetails?person=' + PersonId;
    return this.httpClient.get<Person>(url).pipe(
      tap(_ => console.log('Fetched person with Id= ' + PersonId)),
      catchError(this.handleError<Person>('getPersonDetails PersonId=${PersonId}'))
    );
  }

  getChildList(PersonId: number): Observable<any> {
    const url = 'http://localhost:1337/getAllChildrenWithPartnerFromOneParent?ParentIn=' + PersonId;
    return this.httpClient.get<any>(url).pipe(
      tap(_ => console.log('Fetched children for person with Id= ' + PersonId)),
      catchError(this.handleError<any>('getChildList PersonId=${PersonId}'))
    );
  }

  getPossibleChildrenList(PersonId: number): Observable<Child> {
    const url = 'http://localhost:1337/getPossibleChildren?ParentId=' + PersonId;
    return this.httpClient.get<Child>(url).pipe(
      tap(_ => console.log('Fetched possible children for person with Id= ' + PersonId)),
      catchError(this.handleError<Child>('getPossibleChildrenList PersonId=${PersonId}'))
    );
  }

  AddChildToParent(AddChildToParentObj: AddChildToParent ) {
    const url = 'http://localhost:1337/postAddChildToParent';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, AddChildToParentObj, httpOptions);
  }

  removeChildFromParent(ChildIn: Number, ParentIn: Number) {
    const url = 'http://localhost:1337/deleteChildFromParent';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        'childId': ChildIn,
        'parentId': ParentIn
      },
    };
    return this.httpClient.delete<any>(url, httpOptions);
  }

  getPossibleMotherList(PersonId, BirthDate: Date): Observable<any> {
    const url = 'http://localhost:1337/getPossibleMothers?Birthdate=' + BirthDate;
    return this.httpClient.get<any>(url).pipe(
      tap(_ => console.log('Fetched possible mothers for person with Id= ' + PersonId)),
      catchError(this.handleError<any>('getPossibleMotherList PersonId=${PersonId}'))
    );
  }

  getPossibleFatherList(PersonId, BirthDate: Date): Observable<any> {
    const url = 'http://localhost:1337/getPossibleFathers?Birthdate=' + BirthDate;
    return this.httpClient.get<any>(url).pipe(
      tap(_ => console.log('Fetched possible fathers for person with Id= ' + PersonId)),
      catchError(this.handleError<any>('getPossibleFatherList PersonId=${PersonId}'))
    );
  }

  GetPossiblePartnerList(PersonId, BirthDate: Date): Observable<any> {
    const url = 'http://localhost:1337/getPossiblePartners?PersonId=' + PersonId + 'Birthdate=' + BirthDate;
    return this.httpClient.get<any>(url).pipe(
      tap(_ => console.log('Fetched possible partners for person with Id= ' + PersonId)),
      catchError(this.handleError<any>('getPossiblePartnerList PersonId=${PersonId}'))
    );
  }

}
