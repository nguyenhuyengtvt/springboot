package com.ts24.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ts24.springboot.entity.Book;
import com.ts24.springboot.service.BookService;

@Controller
@RequestMapping("api")
public class BookController {
	
	@Autowired
	private BookService bookService;

	@GetMapping("all-book")
	public ResponseEntity<List<Book>> getAllBook() {
		List<Book> list = bookService.findAll();
		return new ResponseEntity<List<Book>>(list, HttpStatus.OK);
	}

}