package fr.fontainehuaut.libraryservice.validator;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;

import javax.persistence.PrePersist;

public class BorrowEntityEventListener {

    @PrePersist
    public void validate(BorrowEntity entity) throws Exception {
        if (entity.getBorrowDate().isAfter(entity.getReturnedDate())) {
            throw new Exception("Borrow date should be before the return date");
        }
    }
}
