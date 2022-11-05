package com.example.bookstore.security.services;

import com.example.bookstore.models.Book;
import com.example.bookstore.repository.BookRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class BookServiceImpl implements IService<Book>, IPageService<Book>{
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Collection<Book> findAll() {
        return (Collection<Book>) bookRepository.findAll();
    }

    @Override
    public Page<Book> findAll(Pageable pageable, String searchText) {
        return bookRepository.findAllBooks(pageable, searchText);
    }

    @Override
    public Page<Book> findAllBooksByGenre(Pageable pageable, String searchText) {
        return bookRepository.findAllBooksByGenre(pageable, searchText);
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Book getBookById(long bookId) {
        return bookRepository.getBookById(bookId);
    }

    @Override
    public Book saveOrUpdate(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            bookRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }



}

