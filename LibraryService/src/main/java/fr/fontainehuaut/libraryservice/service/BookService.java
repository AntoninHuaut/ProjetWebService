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

    public Optional<BookEntity> add(BookEntity bookForm) {
        if (isInvalid(bookForm.title())) return Optional.empty();

        BookEntity bookEntity = new BookEntity(bookForm.title())
                .publicationYear(bookForm.publicationYear())
                .description(bookForm.description())
                .state(bookForm.state())
                .authors(bookForm.authors())
                .publisherEntity(bookForm.publisherEntity());
        return Optional.of(bookRepository.save(bookEntity));
    }

    public Optional<BookEntity> update(BookEntity bookEntity) {
        if (isInvalid(bookEntity.title())) return Optional.empty();

        if (bookEntity.bookId() != null
                && bookRepository.existsById(bookEntity.bookId())) {
            return Optional.of(bookRepository.save(bookEntity));

        }

        return Optional.empty();
    }

    public Optional<BookEntity> delete(Long id) {
        Optional<BookEntity> optBookEntity = bookRepository.findById(id);
        optBookEntity.ifPresent(bookRepository::delete);

        return optBookEntity;
    }

    private boolean isInvalid(String bookTitle) {
        return bookTitle == null || bookTitle.isEmpty();
    }
}
