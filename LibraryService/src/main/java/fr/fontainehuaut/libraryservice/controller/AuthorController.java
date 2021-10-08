package fr.fontainehuaut.libraryservice.controller;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import fr.fontainehuaut.libraryservice.form.AuthorForm;
import fr.fontainehuaut.libraryservice.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController()
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(@Autowired AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping(value = "/")
    public Collection<AuthorEntity> getAll(@RequestParam(value="name", required = false) String name) {
        return authorService.findAll(name);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<AuthorEntity> getById(@PathVariable long id) {
        Optional<AuthorEntity> optAuthor = authorService.findById(id);
        if (optAuthor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optAuthor.get());
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthorEntity> add(@Valid @RequestBody AuthorForm authorForm) {
        Optional<AuthorEntity> optAuthor = authorService.add(authorForm.toEntity());
        if (optAuthor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(optAuthor.get());
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthorEntity> update(@Valid @RequestBody AuthorForm authorForm) {
        Optional<AuthorEntity> optAuthor = authorService.update(authorForm.toEntity());
        if (optAuthor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optAuthor.get());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<AuthorEntity> deleteById(@PathVariable long id) {
        Optional<AuthorEntity> optAuthor = authorService.delete(id);
        if (optAuthor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optAuthor.get());
    }
}
