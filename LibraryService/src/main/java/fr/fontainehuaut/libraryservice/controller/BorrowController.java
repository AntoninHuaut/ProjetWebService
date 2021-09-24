package fr.fontainehuaut.libraryservice.controller;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import fr.fontainehuaut.libraryservice.form.BorrowForm;
import fr.fontainehuaut.libraryservice.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController()
@RequestMapping("/borrow")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(@Autowired BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @GetMapping(value = "/")
    public Collection<BorrowEntity> getAll() {
        return borrowService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<BorrowEntity> getById(@PathVariable long id) {
        Optional<BorrowEntity> optBorrow = borrowService.findById(id);
        if (optBorrow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBorrow.get());
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BorrowEntity> add(@RequestBody BorrowForm borrowForm) {
        Optional<BorrowEntity> optBorrow = borrowService.add(borrowForm.toEntity());
        if (optBorrow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(optBorrow.get());
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BorrowEntity> update(@RequestBody BorrowForm borrowForm) {
        Optional<BorrowEntity> optBorrow = borrowService.update(borrowForm.toEntity());
        if (optBorrow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBorrow.get());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<BorrowEntity> deleteById(@PathVariable long id) {
        Optional<BorrowEntity> optBorrow = borrowService.delete(id);
        if (optBorrow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(optBorrow.get());
    }
}
