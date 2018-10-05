import { Http, Headers, RequestOptions, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor extends Http {
    
    constructor(public http: Http, backend: XHRBackend, options: RequestOptions) {super(backend, options)}
    
    //code here

    public get(url: string) {
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("token")
        });
        let options = new RequestOptions({
            headers: headers
        });
        return this.http.get(url, options).pipe(
            map((response: any) => response.json())
        );
    }

    public post(url: string, obj: any) {
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("token")
        });
        let options = new RequestOptions({
            headers: headers
        });
        return this.http.post(url, obj, options).pipe(
            map((response: any) => response.json())
        );
    }
}
