import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../models/book';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';
import { Observable } from '../../../node_modules/rxjs';
import { flatten } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private deleteId: String;
  private listBook: Book[] = [];
  private editModal: BsModalRef;
  private confirmModal: BsModalRef;
  private showNotNumber: Boolean = false;
  private showFieldNotEmpty: Boolean = false;
  private notNumber: String = "Price is not a number!";
  private srcEdit = '../../assets/images/book/edit.png';
  private srcDelete = '../../assets/images/book/delete.png';
  private fieldNotEmpty: String = "Name & Price not empty!";

  constructor(
    private bookService: BookService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.bookService.getBook().subscribe(data => this.listBook = data);
  }

  private showConfirmModal(template: TemplateRef<any>, id: String) {
    this.deleteId = id;
    this.confirmModal = this.modalService.show(template, { class: 'modal-md' });
  }

  private showEditModal(template: TemplateRef<any>, id: String) {
    let config: any = {
      class: 'modal-md',
      backdrop: 'static'
    };
    this.confirmModal = this.modalService.show(template, config);
  }

  private showAddModal(template: TemplateRef<any>, id: String) {
    let config: any = {
      class: 'modal-md',
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

  private isNumber(val) {
    return !isNaN(Number(val));
  }

  private update(form: NgForm, id: String) {
    if (form.valid) {
      this.showFieldNotEmpty = false;
      let book: Book = new Book();
      book.id = id;
      book.name = form.value.name;
      book.price = form.value.price;
      if (this.bookValidate(book)) {
        this.bookService.saveBook(book).subscribe(
          sucess => {
            window.location.reload();
          }, error => { }
        );
      }
    } else {
      this.showFieldNotEmpty = true;
    }
  }

  private bookValidate(book: Book): Boolean {
    if (!this.isNumber(book.price)) {
      this.showNotNumber = true;
      return false;
    }
    this.showNotNumber = false;
    return true;
  }

  private add(form: NgForm) {
    if (form.valid) {
      this.showFieldNotEmpty = false;
      let book: Book = new Book();
      book.name = form.value.name;
      book.price = form.value.price;
      if (this.bookValidate(book)) {
        this.bookService.saveBook(book).subscribe(
          sucess => {
            window.location.reload();
          }, error => { }
        );
      }
    } else {
      this.showFieldNotEmpty = true;
    }
  }
}
