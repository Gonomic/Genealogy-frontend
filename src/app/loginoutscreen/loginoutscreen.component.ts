import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { StateManagementService } from '../statemanagement.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SYNOSSO } from '../synoSSO-1.0.0';
import { UserManagementService } from '../usermanagement.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';


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
      // userManagementService = new UserManagementService();
      console.log('In LoginLogOutScreenComponent constructor, initiating SYNOSSO');
      this.InitSynnoSSO();
    }

  ngOnInit() {
    console.log('In LoginLogOutScreenComponent ngOninit, starting LogInToDekkNet.')
    this.LogInToDekkNet();
  }

  private InitSynnoSSO() {
  console.log('In InitSynoSSO starting SYNOSSO.init');

  SYNOSSO.init({
      oauthserver_url: 'https://dekknet.com:4001',
      app_id: '59edb93d8167896de8f74f5ba619a909',
      redirect_uri: 'http://localhost:1001',
      callback: authCallback
    });

    function authCallback(response) {
      if (response.status === 'not_login') {
        // user NOT logged in, take appropriate actions
        // this.ShowLogoutButton = false;
        // this.showLoginButton = true;
        console.log ('In function authCallBack, user NOT loged in, response= ' + JSON.stringify(response));
      } else if (response.status === 'login') {
        this.userManagementService.userAccesToken(response.access_token);
        // user IS logged in, take appropriate actions
        // this.ShowLogoutButton = true;
        // this.ShowLoginButton = false;
        console.log ('In function authCallBack, user loged in, response= ' + JSON.stringify(response));
        // this.httpClient({
        //     url: '/login-backend.php',
        //     method: 'GET',
        //     params: {data: {accesstoken: response.access_token } }
        //  }).
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
   SYNOSSO.login();
  }

  private LogInToDekkNetto(): void {
    console.log('Void');
   }

  get UserName() {return this.loginLogoutForm.get('UserName'); }

  get Wachtwoord1() {return this.loginLogoutForm.get('Wachtwoord1'); }

  get Wachtwoord2() { return this.loginLogoutForm.get('Wachtwoord1'); }
}



