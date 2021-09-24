package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Optional<BookEntity> add(BookEntity bookEntity) {
        try {
            bookEntity.setBookId(null);
            return findById(bookRepository.save(bookEntity).getBookId());
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }

    public Optional<BookEntity> update(BookEntity bookEntity) {
        if (bookEntity.getBookId() != null
                && bookRepository.existsById(bookEntity.getBookId())) {
            try {
                return Optional.of(bookRepository.save(bookEntity));
            } catch (Exception ignore) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    public Optional<BookEntity> delete(Long id) {
        Optional<BookEntity> optBookEntity = bookRepository.findById(id);
        optBookEntity.ifPresent(bookRepository::delete);

        return optBookEntity;
    }
}
