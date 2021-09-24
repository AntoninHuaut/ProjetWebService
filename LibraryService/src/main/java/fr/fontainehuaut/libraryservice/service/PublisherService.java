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
        if (publisherEntity.getPublisherId() != null) return Optional.empty();
        if (isInvalid(publisherEntity.getName())) return Optional.empty();

        return Optional.of(publisherRepository.save(publisherEntity));
    }

    public Optional<PublisherEntity> update(PublisherEntity publisherEntity) {
        if (isInvalid(publisherEntity.getName())) return Optional.empty();

        if (publisherEntity.getPublisherId() != null
                && publisherRepository.existsById(publisherEntity.getPublisherId())) {
            return Optional.of(publisherRepository.save(publisherEntity));

        }

        return Optional.empty();
    }

    public Optional<PublisherEntity> delete(Long id) {
        Optional<PublisherEntity> optPublisherEntity = publisherRepository.findById(id);
        optPublisherEntity.ifPresent(publisherRepository::delete);

        return optPublisherEntity;
    }

    private boolean isInvalid(String publisherName) {
        return publisherName == null || publisherName.isEmpty();
    }
}
