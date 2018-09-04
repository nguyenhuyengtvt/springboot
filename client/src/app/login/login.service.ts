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
  
  private apiUrl = environment.apiUrl + '/api/login';
  public isAdmin = new BehaviorSubject<boolean>(false);
  public loggedIn = new BehaviorSubject<boolean>(false);
  public loggedName = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: Http, private router: Router) { }

  public login(username: string, password: string) {
    let headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.apiUrl, JSON.stringify({ username: username, password: password }), options).pipe(
      map((response: Response) => {
        let user = response.json();
        if (response.headers.has("Authorization")) {
          let token = response.headers.get("Authorization");
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
          this.loggedIn.next(true);
          return true;
        } else {
          return false;
        }
      }));
  }

  public logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
