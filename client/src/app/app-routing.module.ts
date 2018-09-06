import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth-guard.service';
import { ModalModule } from '../../node_modules/ngx-bootstrap';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'book', component: BookComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
