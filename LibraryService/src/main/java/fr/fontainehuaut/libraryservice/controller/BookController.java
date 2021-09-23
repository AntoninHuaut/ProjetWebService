package fr.fontainehuaut.libraryservice.controller;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController()
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(@Autowired BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(value = "/")
    public Collection<BookEntity> getAll() {
        return bookService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<BookEntity> getById(@PathVariable long id) {
        Optional<BookEntity> optBook = bookService.findById(id);
        if (optBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBook.get());
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookEntity> add(@RequestBody BookEntity bookForm) {
        Optional<BookEntity> optBook = bookService.add(bookForm);
        if (optBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(optBook.get());
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookEntity> update(@RequestBody BookEntity book) {
        Optional<BookEntity> optBook = bookService.update(book);
        if (optBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBook.get());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<BookEntity> deleteById(@PathVariable long id) {
        Optional<BookEntity> optBook = bookService.delete(id);
        if (optBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBook.get());
    }
}
