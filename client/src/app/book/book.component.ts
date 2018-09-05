import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  private listBook: Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit() {
      this.getBook();
  }

  private getBook() {
    this.bookService.getBook().subscribe(data => this.listBook = data);
  }

}
