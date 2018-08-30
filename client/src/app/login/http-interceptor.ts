import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class HttpInterceptor extends Http {
    constructor(
        public http: Http,
        backend: XHRBackend,
        options: RequestOptions,
    ) { super(backend, options) }
    //code here

}
