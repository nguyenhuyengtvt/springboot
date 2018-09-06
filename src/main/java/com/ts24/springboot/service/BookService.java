package com.ts24.springboot.service;

import java.util.List;

import com.ts24.springboot.dto.BookDto;
import com.ts24.springboot.entity.Book;

public interface BookService {
	
	List<Book> findAll();
	
	void deleteById(Long id);
	
	void updateBook(BookDto book);
}
