package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import fr.fontainehuaut.libraryservice.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class PublisherService {

    private final PublisherRepository publisherRepository;

    public PublisherService(@Autowired PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    public Collection<PublisherEntity> findAll() {
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

    public Optional<PublisherEntity> delete(Long id) {
        Optional<PublisherEntity> optPublisherEntity = publisherRepository.findById(id);
        optPublisherEntity.ifPresent(publisherRepository::delete);

        return optPublisherEntity;
    }
}
