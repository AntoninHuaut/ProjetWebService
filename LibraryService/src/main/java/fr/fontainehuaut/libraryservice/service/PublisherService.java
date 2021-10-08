package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import fr.fontainehuaut.libraryservice.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Optional;

@Service
public class PublisherService {

    private final PublisherRepository publisherRepository;

    public PublisherService(@Autowired PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    public Collection<PublisherEntity> findAll(String name) {
        if (name != null && !name.isEmpty()) {
            return publisherRepository.findByNameContaining(name);
        }
        return publisherRepository.findAll();
    }

    public Optional<PublisherEntity> findById(Long id) {
        return publisherRepository.findById(id);
    }

    public Optional<PublisherEntity> add(PublisherEntity publisherEntity) {
        try {
            publisherEntity.setPublisherId(null);
            return findById(publisherRepository.save(publisherEntity).getPublisherId());
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }

    public Optional<PublisherEntity> update(PublisherEntity publisherEntity) {
        if (publisherEntity.getPublisherId() != null
                && publisherRepository.existsById(publisherEntity.getPublisherId())) {
            try {
                return Optional.of(publisherRepository.save(publisherEntity));
            } catch (Exception ignore) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    public Optional<PublisherEntity> delete(Long id) throws ResponseStatusException {
        Optional<PublisherEntity> optPublisherEntity = publisherRepository.findById(id);
        if (optPublisherEntity.isPresent()) {
            try {
                publisherRepository.delete(optPublisherEntity.get());
            } catch (DataIntegrityViolationException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
            }
        }

        return optPublisherEntity;
    }
}
