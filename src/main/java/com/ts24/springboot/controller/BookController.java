package com.ts24.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ts24.springboot.dto.BookDto;
import com.ts24.springboot.entity.Book;
import com.ts24.springboot.service.BookService;

@Controller
@RequestMapping("api")
public class BookController {
	
	@Autowired
	private BookService bookService;

	@GetMapping("all-book")
	private ResponseEntity<List<Book>> getAllBook() {
		List<Book> list = bookService.findAll();
		return new ResponseEntity<List<Book>>(list, HttpStatus.OK);
	}

	@PostMapping("delete-book")
	private ResponseEntity<Void> deleteBook(@RequestBody String id) {
		bookService.deleteById(Long.valueOf(id.trim()));
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("save-book")
	private ResponseEntity<Void> updateBook(@RequestBody BookDto book) {
		bookService.save(book);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
