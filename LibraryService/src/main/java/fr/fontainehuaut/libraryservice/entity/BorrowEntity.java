package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Accessors(fluent = true)
@Getter
@Setter
public class BorrowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "borrowId", nullable = false)
    private Long borrowId;

    @ManyToOne(optional = false)
    private BookEntity bookId;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "borrowDate", nullable = false)
    private Instant borrowDate;

    @Column(name = "maxBorrowDayDuration", nullable = false)
    private Integer maxBorrowDayDuration;

    @Column(name = "returnedDate")
    private Instant returnedDate;

    public BorrowEntity(BookEntity bookId, Long userId, Instant borrowDate, Integer maxBorrowDayDuration) {
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = borrowDate;
        this.maxBorrowDayDuration = maxBorrowDayDuration;
    }
}
