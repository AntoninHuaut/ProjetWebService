package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {


}
