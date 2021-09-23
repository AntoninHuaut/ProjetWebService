package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
@NoArgsConstructor
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bookId", nullable = false)
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "publicationYear")
    private int publicationYear;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private BookState state;

    @OneToMany
    private List<BorrowEntity> borrowEntity;

    @OneToMany
    private List<AuthorEntity> authors;

    @ManyToOne
    private PublisherEntity publisherEntity;

    public BookEntity(String title) {
        this.title = title;
    }
}
