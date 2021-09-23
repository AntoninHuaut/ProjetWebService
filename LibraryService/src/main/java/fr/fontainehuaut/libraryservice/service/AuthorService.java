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

    public Optional<AuthorEntity> add(String authorName) {
        if (isInvalid(authorName)) return Optional.empty();

        return Optional.of(authorRepository.save(new AuthorEntity(authorName)));
    }

    public Optional<AuthorEntity> update(AuthorEntity authorEntity) {
        if (isInvalid(authorEntity.getName())) return Optional.empty();

        if (authorEntity.getAuthorId() != null
                && authorRepository.existsById(authorEntity.getAuthorId())) {
            return Optional.of(authorRepository.save(authorEntity));

        }

        return Optional.empty();
    }

    public Optional<AuthorEntity> delete(Long id) {
        Optional<AuthorEntity> optAuthorEntity = authorRepository.findById(id);
        optAuthorEntity.ifPresent(authorRepository::delete);

        return optAuthorEntity;
    }

    private boolean isInvalid(String authorName) {
        return authorName == null || authorName.isEmpty();
    }
}
