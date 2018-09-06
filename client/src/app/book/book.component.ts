import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../models/book';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private deleteId: String;
  private confirmModal: BsModalRef;
  private editModal: BsModalRef;
  private listBook: Book[] = [];
  private srcDelete = '../../assets/images/book/delete.png';
  private srcEdit = '../../assets/images/book/edit.png';

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

  private showConfirmModal(template: TemplateRef<any>, id: String) {
    this.deleteId = id;
    this.confirmModal = this.modalService.show(template, { class: 'modal-md' });
  }

  private showEditModal(template: TemplateRef<any>, id: String) {
    let config: any = {
      class: 'modal-lg',
      backdrop: 'static'
    };
    this.confirmModal = this.modalService.show(template, config);
  }

  private yes(): void {
    this.bookService.deleteBook(this.deleteId).subscribe(
      sucess => {
        window.location.reload();
      }, error => {
        console.log(error);
      }
    );
    this.confirmModal.hide();
  }

  private close(): void {
    this.confirmModal.hide();
  }

  private update(form: NgForm, id: String) {
    let book: Book = new Book();
    book.id = id;
    book.name = form.value.name;
    book.price = form.value.price;
    this.bookService.updateBook(book).subscribe(
      sucess => {
        window.location.reload();
      }, error => {
        console.log(error);
      }
    );
  }

}
