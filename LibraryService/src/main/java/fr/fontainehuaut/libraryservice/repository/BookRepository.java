package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

    Collection<BookEntity> findByTitleContaining(String title);
}
