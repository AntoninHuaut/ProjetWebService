package fr.fontainehuaut.libraryservice.validator;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

public class BorrowEntityEventListener {

    @PrePersist
    @PreUpdate
    public void validateP(BorrowEntity entity) throws Exception {
        if (entity.getBorrowDate().isAfter(entity.getReturnedDate())) {
            throw new Exception("Borrow date should be before the return date");
        }
    }

}
