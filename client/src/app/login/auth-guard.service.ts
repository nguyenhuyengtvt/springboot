import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService.isLoggedIn.pipe(
      take(1),
      map(() => {
        if (!localStorage.getItem("token")) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }));
  }
}
