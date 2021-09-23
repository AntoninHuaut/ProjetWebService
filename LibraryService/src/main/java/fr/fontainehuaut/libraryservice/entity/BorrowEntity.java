package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
public class BorrowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "borrowId", nullable = false)
    private Long borrowId;

    @ManyToOne
    private BookEntity bookId;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "borrowDate", nullable = false)
    private Instant borrowDate;

    @Column(name = "maxBorrowDayDuration", nullable = false)
    private Integer maxBorrowDayDuration = 7;

    @Column(name = "returnedDate")
    private Instant returnedDate;
}
