import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
    private UserName: string;
    private LogedIn: boolean;
    private MayEdit: boolean;
    private AccesToken: string;

    constructor() {}

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

    setUserState(UserNameIn: string, LogedInIn: boolean, MayEditIn: boolean) {
        this.UserName = UserNameIn;
        this.LogedIn = LogedInIn;
        this.MayEdit = MayEditIn;
    }

    get accessToken(): string {
        return this.AccesToken;
    }

    get userName(): string {
        return this.UserName;
    }

    get logedIn(): boolean {
        return this.LogedIn;
    }

    get mayEdit(): boolean {
        return this.MayEdit;
    }

    set userName(newUserName: string) {
        this.UserName = newUserName;
    }

    set logedIn(newLogedIn: boolean) {
        this.LogedIn = newLogedIn;
    }

    set mayEdit(newMayEdit: boolean) {
        this.MayEdit = newMayEdit;
    }

    set userAccesToken(newAccesToken: string){
        this.AccesToken = newAccesToken;
    }
}

