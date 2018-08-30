import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl;
  public isAdmin = new BehaviorSubject<boolean>(false);
  public loggedIn = new BehaviorSubject<boolean>(false);
  public loggedName = new BehaviorSubject<string>('');
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  public inRegisterDisplay() {
    this.loggedIn.next(false);
  }
  public inDashboardDisplay() {
    this.loggedIn.next(true);
  }
  constructor(private http: Http, private router: Router) { }
  login(username: string, password: string) {
    let headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.apiUrl + '/api/login', JSON.stringify({ username: username, password: password }), options).pipe(
      map((response: Response) => {
        let headers = response.headers;
        let user = response.json();
        if (response.headers.has("Authorization")) {
          let token = response.headers.get("Authorization");
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
          this.loggedIn.next(true);
          this.loggedName.next(JSON.parse(localStorage.getItem('currentUser')).name);
          if (user.mrole.role === 'ADMIN') {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false);
          }
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
