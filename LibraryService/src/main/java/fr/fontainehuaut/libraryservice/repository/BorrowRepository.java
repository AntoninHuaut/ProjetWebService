package fr.fontainehuaut.libraryservice.repository;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<BorrowEntity, Long> {


}
