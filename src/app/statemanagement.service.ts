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

    constructor(private datepipe: DatePipe) {
        this.initial = true;
    }

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
        this.namestolookfor =  namesToLookForIn,
        this.indexofperson = indexOfPersonIn,
        this.possiblefatherslist = possibleFathersListIn,
        this.possiblemotherslist = possibleMothersListIn,
        this.possiblepartnerslist = possiblePartnersListIn,
        this.formcontainsvalue = formContainsValueIn;
        this.formcanbesubmitted = formCanBeSubmittedIn;
        this.actionathand = actionAtHandIn;
        console.log('In statemanagementservice, method SetStatusBeforeLeavingPersonScreen(). Value of this.personformgroup.controls.PersonFamilyName= ' + this.personformgroup.controls.PersonFamilyName.value);
    }

    get personFormGroup(): FormGroup {
        console.log('In statemanagementservice, getter personFormGroup(). Value of this.personformgroup.controls.PersonFamilyName= ' + this.personformgroup.controls.PersonFamilyName.value);
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

    get stateIsInitial(): boolean {
        return this.initial;
    }

    set setStateIsInitial(IsInitial: boolean) {
        this.initial = IsInitial;
    }

}

export class StateServiceChildrenScreen {
    private childrenformgroup: FormGroup;
    private children = {};
    private possiblechildrenlist = {};
    private actionathand: string;
    private initial = true;

    private message: any;
    private incomingMessage: Subscription;
    private theMessageObject: object;

    // constructor(private datepipe: DatePipe) {
        constructor() {
        this.initial = true;

    }

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

    SetStatusBeforeLeavingChildrenScreen(
                            formGroupIn: FormGroup,
                            childrenIn: {},
                            possibleChildrenListIn: {},
                            actionAtHandIn: string) {
        this.childrenformgroup = formGroupIn;
        this.children = childrenIn;
        this.possiblechildrenlist = possibleChildrenListIn;
        this.actionathand = actionAtHandIn;
    }

    get childrenFormGroup(): FormGroup {
        return this.childrenformgroup;
    }

    get Children(): object {
        return this.children;
    }

    get possibleChildrenList(): object {
        return this.possiblechildrenlist;
    }

    get stateIsInitial(): boolean {
        return this.initial;
    }

    set setStateIsInitial(IsInitial: boolean) {
        this.initial = IsInitial;
    }
}

export class StateServiceSerchHubScreen {
    private searchform: FormGroup;
    private plainpersonlist = {};
    private actionathand: string;
    private initial = true;

    private message: any;
    private incomingMessage: Subscription;
    private theMessageObject: object;

    constructor() {
        this.initial = true;
    }

    SetStatusBeforeLeavingSearchHubScreen(
                            searchFormIn: FormGroup,
                            plainPersonListIn: {},
                            actionAtHandIn: string) {
        this.searchform = searchFormIn;
        this.plainpersonlist = plainPersonListIn;
        this.actionathand = actionAtHandIn;
    }

    get searchFormGroup(): FormGroup {
        return this.searchform;
    }

    get plainPersonList(): object {
        return this.plainpersonlist;
    }

    get stateIsInitial(): boolean {
        return this.initial;
    }

    set setStateIsInitial(IsInitial: boolean) {
        this.initial = IsInitial;
    }

}
