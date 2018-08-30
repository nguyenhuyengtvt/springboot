package com.ts24.springboot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ts24.springboot.entity.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

}
