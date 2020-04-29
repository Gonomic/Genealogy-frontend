import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class StateManagementService {
    private personformgroup: FormGroup;
    private plainpersonlist: {};
    // private IntermPers: any;
    private namestolookfor: string;
    private indexofperson: number;
    private possiblefatherslist = {};
    private possiblemotherslist = {};
    private possiblepartnerslist = {};
    private formcontainsvalue = false;
    private formcanbesubmitted = false;
    private actionathand: string;
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

    SetStatusBeforeLeavingPersonScreen(
                            formGroupIn: FormGroup,
            	            plainpersonlistIn: {},
                            // IntermPersIn: any,
                            namesToLookForIn: string,
                            indexOfPersonIn: number,
                            possibleFathersListIn: {},
                            possibleMothersListIn: {},
                            possiblePartnersListIn: {},
                            formContainsValueIn: boolean,
                            formCanBeSubmittedIn: boolean,
                            actionAtHandIn: string) {
        this.personformgroup = formGroupIn,
        this.plainpersonlist = plainpersonlistIn,
        // this.IntermPers = IntermPersIn,
        this.namestolookfor =  namesToLookForIn,
        this.indexofperson = indexOfPersonIn,
        this.possiblefatherslist = possibleFathersListIn,
        this.possiblemotherslist = possibleMothersListIn,
        this.possiblepartnerslist = possiblePartnersListIn,
        this.formcontainsvalue = formContainsValueIn;
        this.formcanbesubmitted = formCanBeSubmittedIn;
        this.actionathand = actionAtHandIn;
        this.initial = false;
    }

    get personFormGroup(): FormGroup {
        return this.personformgroup;
    }

    get plainPersonlist(): object {
        return this.plainpersonlist;
    }

    get namesToLookFor(): string {
        return this.namestolookfor;
    }

    get indexOfPerson(): number {
        return this.indexofperson;
    }

    get possibleFathersList(): object {
        return this.possiblefatherslist;
    }

    get possibleMothersList(): object {
        return this.possiblemotherslist;
    }

    get possiblePartnersList(): object {
        return this.possiblepartnerslist;
    }

    get formContainsValue(): boolean {
        return this.formcontainsvalue;
    }

    get formCanbeSubmitted(): boolean {
        return this.formcanbesubmitted;
    }

}
