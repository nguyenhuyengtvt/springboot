import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../models/book';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private deleteId: String;
  private modalRef: BsModalRef;
  private listBook: Book[] = [];
  private srcDelete = '../../assets/images/book/delete.png';

  constructor(
    private bookService: BookService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getBook();
  }

  private getBook() {
    this.bookService.getBook().subscribe(data => this.listBook = data);
  }

  private showModal(template: TemplateRef<any>, id: String) {
    this.deleteId = id;
    let options: any = {
      class: 'modal-sm',
      backdrop: 'static'
    };
    this.modalRef = this.modalService.show(template, options);
  }

  private yes(): void {
    this.bookService.deleteBook(this.deleteId).subscribe(
      sucess => {
        window.location.reload();
      }, error => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }

  private no(): void {
    this.modalRef.hide();
  }

}
