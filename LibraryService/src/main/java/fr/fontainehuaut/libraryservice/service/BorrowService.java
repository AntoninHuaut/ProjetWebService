package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import fr.fontainehuaut.libraryservice.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Optional;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepository;

    public BorrowService(@Autowired BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }

    public Collection<BorrowEntity> findAll() {
        return borrowRepository.findAll();
    }

    public Optional<BorrowEntity> findById(Long id) {
        return borrowRepository.findById(id);
    }

    public Optional<BorrowEntity> add(BorrowEntity borrowEntity) throws ResponseStatusException {
        try {
            borrowEntity.setBorrowId(null);
            return findById(borrowRepository.save(borrowEntity).getBorrowId());
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
        } catch (Exception ignore) {
            return Optional.empty();
        }
    }

    public Optional<BorrowEntity> update(BorrowEntity BorrowEntity) throws ResponseStatusException {
        if (BorrowEntity.getBorrowId() != null
                && borrowRepository.existsById(BorrowEntity.getBorrowId())) {
            try {
                return Optional.of(borrowRepository.save(BorrowEntity));
            } catch (DataIntegrityViolationException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
            } catch (Exception ignore) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    public Optional<BorrowEntity> delete(Long id) {
        Optional<BorrowEntity> optBorrowEntity = borrowRepository.findById(id);

        if (optBorrowEntity.isPresent()) {
            try {
                borrowRepository.delete(optBorrowEntity.get());
            } catch (DataIntegrityViolationException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DataIntegrityViolation");
            }
        }

        return optBorrowEntity;
    }
}
