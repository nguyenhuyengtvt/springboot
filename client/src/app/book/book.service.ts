import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from '../../../node_modules/rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlRead = environment.apiUrl + '/api/all-book';

  constructor(private http: Http) { }

  public getBook(): Observable<Book[]> {
    return this.http.get(this.urlRead).pipe(
      map((response: any) => response.json())
    );
  }
}
