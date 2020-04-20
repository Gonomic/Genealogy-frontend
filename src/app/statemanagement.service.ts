import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';


@Injectable({
  providedIn: 'root'
})

export class StateManagementService {
    private plainpersonlist: {};
    private IntermPers: any;
    private namesToLookFor: string;
    private indexOfPerson: number;
    private possibleFathersList = {};
    private possibleMothersList = {};
    private possiblePartnersList = {};
    private formContainsValue = false;
    private formCanBeSubmitted = false;
    private actionAtHand: string;
    private initial = true;
    message: any;
    incomingMessage: Subscription;
    theMessageObject: object;

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

    SetStatusBeforeLeavingPersonScreen( plainpersonlistIn: {},
                            IntermPersIn: any,
                            namesToLookForIn: string,
                            indexOfPersonIn: number,
                            possibleFathersListIn: {},
                            possibleMothersListIn: {},
                            possiblePartnersListIn: {},
                            formContainsValueIn: boolean,
                            formCanBeSubmittedIn: boolean,
                            actionAtHandIn: string) {
        this.plainpersonlist = plainpersonlistIn,
        this.IntermPers = IntermPersIn,
        this.namesToLookFor =  namesToLookForIn,
        this.indexOfPerson = indexOfPersonIn,
        this.possibleFathersList = possibleFathersListIn,
        this.possibleMothersList = possibleMothersListIn,
        this.possiblePartnersList = possiblePartnersListIn,
        this.formContainsValue = formContainsValueIn;
        this.formCanBeSubmitted = formCanBeSubmittedIn;
        this.actionAtHand = actionAtHandIn;
        this.initial = false;
    }

    GetStatusAfterReturningToPerson() {

    }

}
