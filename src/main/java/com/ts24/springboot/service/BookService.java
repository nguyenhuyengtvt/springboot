package com.ts24.springboot.service;

import java.util.List;
import com.ts24.springboot.entity.Book;

public interface BookService {
	
	List<Book> findAll();
}
