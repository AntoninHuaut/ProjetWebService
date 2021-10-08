package fr.fontainehuaut.libraryservice.controller;

import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import fr.fontainehuaut.libraryservice.form.PublisherForm;
import fr.fontainehuaut.libraryservice.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController()
@RequestMapping("/publisher")
public class PublisherController {

    private final PublisherService publisherService;

    public PublisherController(@Autowired PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @GetMapping(value = "/")
    public Collection<PublisherEntity> getAll(@RequestParam(value="name", required = false) String name) {
        return publisherService.findAll(name);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<PublisherEntity> getById(@PathVariable long id) {
        Optional<PublisherEntity> optPublisher = publisherService.findById(id);
        if (optPublisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optPublisher.get());
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PublisherEntity> add(@Valid @RequestBody PublisherForm publisherForm) {
        Optional<PublisherEntity> optPublisher = publisherService.add(publisherForm.toEntity());
        if (optPublisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(optPublisher.get());
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PublisherEntity> update(@Valid @RequestBody PublisherForm publisherForm) {
        Optional<PublisherEntity> optPublisher = publisherService.update(publisherForm.toEntity());
        if (optPublisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optPublisher.get());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<PublisherEntity> deleteById(@PathVariable long id) {
        Optional<PublisherEntity> optPublisher = publisherService.delete(id);
        if (optPublisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optPublisher.get());
    }
}