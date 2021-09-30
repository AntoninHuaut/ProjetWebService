package fr.fontainehuaut.libraryservice.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bookId", nullable = false)
    private Long bookId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "publicationYear")
    private Integer publicationYear;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private BookState state = BookState.AVAILABLE;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "authorId")
    private List<AuthorEntity> authors;

    @ManyToOne(optional = false)
    @JoinColumn(name = "publisherId")
    private PublisherEntity publisher;

    public BookEntity(Long bookId) {
        this.bookId = bookId;
    }
}
