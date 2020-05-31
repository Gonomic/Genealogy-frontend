import { Component, OnInit } from '@angular/core';
import { DataSprocsService } from '../datasprocs.service';
import { StateManagementService } from '../statemanagement.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginout-screen',
  templateUrl: './loginoutscreen.component.html',
  styleUrls: ['./loginoutscreen.component.css']
})
export class LogInOutScreenComponent implements OnInit {
  private loginLogoutForm: FormGroup;
  private formCanBeSubmitted = false;

  constructor(
    private dataSprocsService: DataSprocsService,
    private stateManagementService: StateManagementService,
    private router: Router,
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

  private formIsSubmitable(): boolean {
    this.formCanBeSubmitted = false;
    if (this.userName.value != null && this.userName.value !== '' &&
        this.Wachtwoord1.value != null && this.Wachtwoord1.value !== '' &&
        this.Wachtwoord2.value != null && this.Wachtwoord2.value !== ''
      ) {
        this.formCanBeSubmitted = true;
    } else {
      this.formCanBeSubmitted = false;
    }
    return this.formCanBeSubmitted;
  }

  private loginUser(): void {
    this.dataSprocsService.loginUser(this.loginLogoutForm.get('PersonID').value,
                                     this.loginLogoutForm.get('Wachtwoord1').value)
    .subscribe(
      loginResult => {
        // Navigate to startpage or display NOT logged in message depended on loginresult;
      }
    );
  }

  get userName() {return this.loginLogoutForm.get('userName'); }

  get Wachtwoord1() {return this.loginLogoutForm.get('Wachtwoord1'); }

  get Wachtwoord2() { return this.loginLogoutForm.get('Wachtwoord1'); }

  // Ment for when starting use of Synology SSO on DekkNet,
  // LogInToDekkNet() {
  //   console.log('Login op DekkNet')
  //   SYNOSSO.init({
  //     oauthserver_url: 'https://dekknet.com:4005',
  //     app_id: '28adb409fb6d699318a23fb0df19129e',
  //     redirect_uri: 'http://localhost:1001/personscreen(sidenavNavigatie:searchhub//personsChildren:childrenscreen)',
  //     callback: authCallback
  //   })
  //   function authCallback(response) {
  //     console.log('client side');
  //     if ('not_login' === response.status) {
  //       // user not login
  //       console.log (response.status);
  //     } else if ('login' === response.status) {
  //       console.log (response.status);
  //       console.log (response.access_token);
  //       alert('access token: ' + response.access_token);
  //       $.ajax ({ url : '/login_backend.php' ,
  //         cache: false,
  //         type: 'GET',
  //         data: {
  //           accesstoken:
  //           response.access_token
  //         },
  //           error: function(xhr) {
  //           alert('ajax error');
  //           // deal with errors
  //         },
  //           success: function(response){
  //           alert('success');
  //           // deal with success
  //         }
  //       });
  //     } else {
  //       alert('error');
  //       // deal with errors;
  //     }
  //   }
  // }

  // LogOffFromDekknet() {
  //   console.log('Log uit van DekkNet');
  // }

}
