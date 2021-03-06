import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from '../../../node_modules/rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpInterceptor } from '../login/http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlRead = environment.apiUrl + "/api/all-book";
  private urlDelete = environment.apiUrl + "/api/delete-book";
  private urlSave = environment.apiUrl + "/api/save-book";

  constructor(private http: HttpInterceptor) { }

  public getBook(): Observable<Book[]> {
    /*let headers = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": localStorage.getItem("token")
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.get(this.urlRead, options).pipe(
      map((response: any) => response.json())
    );*/
    return this.http.get(this.urlRead);
  }

  public deleteBook(id: String): Observable<void> {
    /*let headers = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": localStorage.getItem("token")
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.urlDelete, id, options).pipe(
      map((response: any) => response.json())
    );*/
    return this.http.post(this.urlDelete, id);
  }

  public saveBook(book: Book): Observable<void> {
    return this.http.post(this.urlSave, book);
  }
}
