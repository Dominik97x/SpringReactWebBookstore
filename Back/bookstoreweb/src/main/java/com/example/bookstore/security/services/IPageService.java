package com.example.bookstore.security.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


public interface IPageService<T> {
    Page<T> findAll(Pageable pageable, String searchText);
    Page<T> findAllBooksByGenre(Pageable pageable, String searchText);
    Page<T> findAll(Pageable pageable);
    }
