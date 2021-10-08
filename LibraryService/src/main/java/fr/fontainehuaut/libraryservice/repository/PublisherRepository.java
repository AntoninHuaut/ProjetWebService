package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {

    Collection<PublisherEntity> findByNameContaining(String name);
}
