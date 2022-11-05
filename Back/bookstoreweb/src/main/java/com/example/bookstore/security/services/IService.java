package com.example.bookstore.security.services;

import com.example.bookstore.models.Book;

import java.util.Collection;
import java.util.Optional;


public interface IService<T>{
    Collection<T> findAll();

   Optional<Book> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);


}
