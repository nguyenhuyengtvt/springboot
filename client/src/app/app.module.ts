import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BookComponent } from './book/book.component';
import { RouterModule } from '@angular/router';
import { BookService } from './book/book.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './login/auth-guard.service';
import { HttpInterceptor } from './login/http-interceptor';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ //import service
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    HttpInterceptor,
    AuthGuardService,
    BookService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
