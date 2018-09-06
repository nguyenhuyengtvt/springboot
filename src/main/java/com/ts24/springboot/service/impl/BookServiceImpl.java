package com.ts24.springboot.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ts24.springboot.dto.BookDto;
import com.ts24.springboot.entity.Book;
import com.ts24.springboot.repository.BookRepository;
import com.ts24.springboot.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Book> findAll() {
		return (List<Book>) bookRepository.findAll();
	}

	@Override
	public void deleteById(Long id) {
		bookRepository.delete(id);
	}

	@Override
	public void updateBook(BookDto book) {
		Book entity = new Book();
		entity.setName(book.getName());
		entity.setId(Long.valueOf(book.getId().trim()));
		entity.setPrice(Double.valueOf(book.getPrice()));
		bookRepository.save(entity);
	}

}
