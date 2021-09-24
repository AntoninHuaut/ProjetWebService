package fr.fontainehuaut.libraryservice.service;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import fr.fontainehuaut.libraryservice.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Optional<BorrowEntity> add(BorrowEntity borrowEntity) {
        if (borrowEntity.getBorrowId() != null) return Optional.empty();
        if (isInvalid(borrowEntity)) return Optional.empty();

        return Optional.of(borrowRepository.save(borrowEntity));
    }

    public Optional<BorrowEntity> update(BorrowEntity BorrowEntity) {
        if (isInvalid(BorrowEntity)) return Optional.empty();

        if (BorrowEntity.getBorrowId() != null
                && borrowRepository.existsById(BorrowEntity.getBorrowId())) {
            return Optional.of(borrowRepository.save(BorrowEntity));

        }

        return Optional.empty();
    }

    public Optional<BorrowEntity> delete(Long id) {
        Optional<BorrowEntity> optBorrowEntity = borrowRepository.findById(id);
        optBorrowEntity.ifPresent(borrowRepository::delete);

        return optBorrowEntity;
    }

    private boolean isInvalid(BorrowEntity borrowEntity) {
        return borrowEntity.getBookId() == null || borrowEntity.getUserId() == null || borrowEntity.getBorrowDate() == null
                || borrowEntity.getMaxBorrowDayDuration() == null || borrowEntity.getMaxBorrowDayDuration() <= 0;
    }
}
