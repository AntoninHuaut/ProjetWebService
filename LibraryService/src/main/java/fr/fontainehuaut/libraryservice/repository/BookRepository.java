package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<PublisherEntity, Long> {


}
