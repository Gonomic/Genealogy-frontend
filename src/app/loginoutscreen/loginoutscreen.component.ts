import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { StateManagementService } from '../statemanagement.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SYNOSSO } from '../synoSSO-1.0.0';
import { UserManagementService } from '../usermanagement.service';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


declare const $;

@Component({
  selector: 'app-loginout-screen',
  templateUrl: './loginoutscreen.component.html',
  styleUrls: ['./loginoutscreen.component.css']
})
export class LogInOutScreenComponent implements OnInit {
  private loginLogoutForm: FormGroup;
  private formCanBeSubmitted = false;
  private showLoginButton = true;
  private showLogoutButton = true;

  constructor(
    private dataSprocsService: DataSprocsService,
    private stateManagementService: StateManagementService,
    private userManagementService: UserManagementService,
    private router: Router,
    private httpClient: HttpClient
  ) {
      this.loginLogoutForm = new FormGroup({
        UserId: new FormControl(null),
        UserName: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
        Wachtwoord1: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
        Wachtwoord2: new FormControl(null, { validators: Validators.required, updateOn: 'blur' } ),
      });
    }


  ngOnInit() {
  }

  InitSynnoSSO() {
    // private InitSynnoSSO() {
    console.log('In InitSynoSSO starting SYNOSSO.init');

    // Development on DekkNet.com with port 1011
    this.userManagementService.appId = '5fcc2766d29ab8043933f1bac4e7eddc';
    this.userManagementService.uriRedirect = 'https://dekknet.com:1011';

    // Development on localhost with port 1001
    // this.userManagementService.appId = 'd07123f5f109399f799865bf10346dc9';
    // this.userManagementService.uriRedirect = 'http://localhost:1001';

     // Production on Dekknet.com with port 1001
     // this.userManagementService.appId = '28adb409fb6d699318a23fb0df19129e';
     // this.userManagementService.uriRedirect = 'https://dekknet.com:1001';

    SYNOSSO.init({
      oauthserver_url: 'https://dekknet.com:4005',
      app_id : this.userManagementService.appId,
      redirect_uri: this.userManagementService.uriRedirect,
      ldap_baseDN: 'dc=dekknet,dc=com',
      callback: (response) => {
        if (response.status === 'not_login') {
          // user NOT logged in, take appropriate actions
          // this.ShowLogoutButton = false;
          // this.showLoginButton = true;
          console.log ('In function authCallBack, user NOT loged in, response= ' + JSON.stringify(response) + '. Loging on now!');
          SYNOSSO.login();
        } else if (response.status === 'login') {
          this.userManagementService.userAccesToken = response.access_token;
          this.userManagementService.logedIn = response.status;
          console.log ('In function authCallBack, user loged in, response= ' + JSON.stringify(response));
          console.log('Usermanagement values are, AccessToken= ' + this.userManagementService.accessToken + '. status= ' + this.userManagementService.logedIn);
          const params = new HttpParams().set('action', 'exchange').set('accestoken', this.userManagementService.accessToken).set('app_id', this.userManagementService.appId);
          console.log('Parameters for getting user data=' + JSON.stringify(params));
          this.httpClient.get('https://dekknet.com:4005/webman/sso/SSOAccessToken.cgi', {params})
          // this.httpClient.get('/https://dekknet.com:4005/webman/sso/login-backend.php', {params})
          .subscribe(
            (data) => {
              console.log('Returned data= ' + JSON.stringify(data));
            }
          );

            // this.httpClient({
            //     url: '/login-backend.php',
            //     method: 'GET',
            //     params: {data: {accesstoken: response.access_token } }
            // }).
            // success(function(data, status, headers, config) {
            //     console.log('In SYNOSSO.init, function authCallback,', 'Data= ' + JSON.stringify(data), 'Status= ' + JSON.stringify(status), 'Headers= ' + JSON.stringify(headers), 'Config= ' + JSON.stringify(config));
            // }).
            // error(function(data, status, headers, config) {
            //   console.log('In SYNOSSO.init, function authCallback,', 'Data= ' + JSON.stringify(data), 'Status= ' + JSON.stringify(status), 'Headers= ' + JSON.stringify(headers), 'Config= ' + JSON.stringify(config));
            // });
            // $.ajax ({ url : '/login_backend.php' ,
            //   cache: false,
            //   type: 'GET',
            //   data: {
            //     accesstoken:
            //     response.access_token
            //   },
            //   error: function(xhr) {
            //     console.log('In function authCallBack, ajax error occured, error= ' + JSON.stringify(xhr));
            //     // deal with errors
            //   },
            //   success: function(responseItIs) {
            //     console.log('In function authCallBack, success, response= ' + JSON.stringify(responseItIs));
            //     // deal with success
            //   }
            // });
          } else {
              console.log('Error, error= ' + JSON.stringify(response));
              // deal with errors;
          }
        }
      }
    );
  }


    // private authCallback(response) {
    //   if (response.status === 'not_login') {
    //     // user NOT logged in, take appropriate actions
    //     // this.ShowLogoutButton = false;
    //     // this.showLoginButton = true;
    //     console.log ('In function authCallBack, user NOT loged in, response= ' + JSON.stringify(response));
    //   } else if (response.status === 'login') {
    //     this.userManagementService.userAccesToken = response.access_token;
    //     // user IS logged in, take appropriate actions
    //     // this.ShowLogoutButton = true;
    //     // this.ShowLoginButton = false;
    //     console.log ('In function authCallBack, user loged in, response= ' + JSON.stringify(response));
    //     this.httpClient({
    //         url: '/login-backend.php',
    //         method: 'GET',
    //         params: {data: {accesstoken: response.access_token } }
    //     }).
    //     success(function(data, status, headers, config) {
    //         console.log('In SYNOSSO.init, function authCallback,', 'Data= ' + JSON.stringify(data), 'Status= ' + JSON.stringify(status), 'Headers= ' + JSON.stringify(headers), 'Config= ' + JSON.stringify(config));
    //     }).
    //     error(function(data, status, headers, config) {
    //       console.log('In SYNOSSO.init, function authCallback,', 'Data= ' + JSON.stringify(data), 'Status= ' + JSON.stringify(status), 'Headers= ' + JSON.stringify(headers), 'Config= ' + JSON.stringify(config));
    //     });
    //     // $.ajax ({ url : '/login_backend.php' ,
    //     //   cache: false,
    //     //   type: 'GET',
    //     //   data: {
    //     //     accesstoken:
    //     //     response.access_token
    //     //   },
    //     //   error: function(xhr) {
    //     //     console.log('In function authCallBack, ajax error occured, error= ' + JSON.stringify(xhr));
    //     //     // deal with errors
    //     //   },
    //     //   success: function(responseItIs) {
    //     //     console.log('In function authCallBack, success, response= ' + JSON.stringify(responseItIs));
    //     //     // deal with success
    //     //   }
    //     // });
    //   } else {
    //       console.log('Error, error= ' + JSON.stringify(response));
    //       // deal with errors;
    //   }
    // }

  private AlreadyLoggedIn(): boolean {
    console.log('Already Logged in.');
    this.userManagementService.setUserState('Test', true, true);
    return false;
  }

  private ShowLoginButton(): boolean {
    return this.showLoginButton;
  }

  private ShowLogoutButton(): boolean {
    return this.showLogoutButton;
  }

  private LogOutFromDekkNet(): void {
    console.log('In LogoutFromDekkNet, performing SYNOSSO.logout');
    SYNOSSO.logout(function() {} );
  }

  private LogInToDekkNet(): void {
   console.log('In function LoginToDekknet, performing SYNOSSO.login');
    this.InitSynnoSSO();
  //  SYNOSSO.login();
  }

  private LogInToDekkNetto(): void {
    console.log('Void');
   }

  get UserName() {return this.loginLogoutForm.get('UserName'); }

  get Wachtwoord1() {return this.loginLogoutForm.get('Wachtwoord1'); }

  get Wachtwoord2() { return this.loginLogoutForm.get('Wachtwoord1'); }
}



