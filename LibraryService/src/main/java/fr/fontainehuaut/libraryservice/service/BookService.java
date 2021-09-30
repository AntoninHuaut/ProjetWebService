package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(@Autowired BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Collection<BookEntity> findAll() {
        return bookRepository.findAll();
    }

    public Optional<BookEntity> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Optional<BookEntity> add(BookEntity bookEntity) throws ResponseStatusException {
        try {
            bookEntity.setBookId(null);
            return findById(bookRepository.save(bookEntity).getBookId());
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }

    public Optional<BookEntity> update(BookEntity bookEntity) throws ResponseStatusException {
        if (bookEntity.getBookId() != null
                && bookRepository.existsById(bookEntity.getBookId())) {
            try {
                return Optional.of(bookRepository.save(bookEntity));
            } catch (DataIntegrityViolationException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
            } catch (Exception ignore) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    public Optional<BookEntity> delete(Long id) throws ResponseStatusException {
        Optional<BookEntity> optBookEntity = bookRepository.findById(id);

        if (optBookEntity.isPresent()) {
            try {
                bookRepository.delete(optBookEntity.get());
            } catch (DataIntegrityViolationException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
            }
        }

        return optBookEntity;
    }
}
