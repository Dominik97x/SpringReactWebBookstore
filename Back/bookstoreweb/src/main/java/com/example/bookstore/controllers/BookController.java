package com.example.bookstore.controllers;

import com.example.bookstore.models.Book;

import com.example.bookstore.resources.Resource;
import com.example.bookstore.security.services.IPageService;
import com.example.bookstore.security.services.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;


@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookController implements Resource<Book> {


    @Autowired
    private IService<Book> bookService;

    @Autowired
    private IPageService<Book> bookPageService;

    @Override
    public ResponseEntity<Page<Book>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(bookPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Book>> findAllBooksByGenre(Pageable pageable, String searchText) {
        return new ResponseEntity<>(bookPageService.findAllBooksByGenre(pageable,searchText),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Book>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(bookPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> findById(Long id) {
        return new ResponseEntity<>(bookService.findById(id).get(), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Book> save(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Book> update(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(bookService.deleteById(id), HttpStatus.OK);
    }




//    @GetMapping("/languages")
//    public  ResponseEntity<Set<String>> findAllLanguages() {
//        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("French", "Portuguese", "English", "Russian", "Hindi", "Arabic", "Spanish", "Chinese")), HttpStatus.OK);
//    }
//
//    @GetMapping("/genres")
//    public  ResponseEntity<Set<String>> findAllGenres() {
//        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Technology", "Science", "History", "Fantasy", "Biography", "Horror", "Romance")), HttpStatus.OK);
//    }
}

