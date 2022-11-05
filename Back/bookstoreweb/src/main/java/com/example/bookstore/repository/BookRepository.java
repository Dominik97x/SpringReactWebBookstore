package com.example.bookstore.repository;

import com.example.bookstore.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    @Query("FROM Book b WHERE b.title LIKE %:searchText% OR b.authors LIKE %:searchText% OR b.isbn13 LIKE %:searchText% OR b.isbn10 LIKE %:searchText% OR b.publisher LIKE %:searchText% " +
            "ORDER BY b.price ASC")
    Page<Book> findAllBooks(Pageable pageable, @Param("searchText") String searchText);

    @Query("FROM Book b WHERE b.genre LIKE %:searchText%  ORDER BY b.price DESC")
    Page<Book> findAllBooksByGenre(Pageable pageable, @Param("searchText") String genre);

    @Query("Select book FROM Book book WHERE book.id=:id")
    Book getBookById(@Param("id")Long id);




//    @Query("FROM Book b WHERE b.title LIKE %:searchText% OR b.authors LIKE %:searchText% OR b.isbn13 LIKE %:searchText% OR b.isbn10 LIKE %:searchText% OR b.publisher LIKE %:searchText% " +
//            "ORDER BY b.price ASC")
//    Page<Book> findBookById(Pageable pageable, @Param("searchText") String searchText);
}
