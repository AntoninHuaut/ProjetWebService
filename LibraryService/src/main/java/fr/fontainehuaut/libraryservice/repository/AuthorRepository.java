package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {

    Collection<AuthorEntity> findByNameContaining(String name);
}
