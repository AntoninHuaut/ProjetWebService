package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import fr.fontainehuaut.libraryservice.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(@Autowired AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Collection<AuthorEntity> findAll() {
        return authorRepository.findAll();
    }

    public Optional<AuthorEntity> findById(Long id) {
        return authorRepository.findById(id);
    }

    public Optional<AuthorEntity> add(AuthorEntity authorEntity) {
        try {
            authorEntity.setAuthorId(null);
            return findById(authorRepository.save(authorEntity).getAuthorId());
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }

    public Optional<AuthorEntity> update(AuthorEntity authorEntity) {
        if (authorEntity.getAuthorId() != null
                && authorRepository.existsById(authorEntity.getAuthorId())) {
            try {
                return Optional.of(authorRepository.save(authorEntity));
            } catch (Exception ignore) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    public Optional<AuthorEntity> delete(Long id) {
        Optional<AuthorEntity> optAuthorEntity = authorRepository.findById(id);
        optAuthorEntity.ifPresent(authorRepository::delete);

        return optAuthorEntity;
    }
}
