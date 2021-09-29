package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Long> {


}
