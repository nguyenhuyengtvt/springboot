import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';
import { PlatformLocation } from '../../../node_modules/@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginModel: any = {};
  apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.logout();
  }

  private login(loginForm) {
    if (loginForm.valid) {
      this.loginService.login(this.loginModel.username, this.loginModel.password).subscribe(
        success => {
          this.router.navigate(['book']);
        }, error => {

        });
    }
  }

}
