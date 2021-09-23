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
    @Column(name = "state", nullable = false)
    private BookState state = BookState.AVAILABLE;

    @OneToMany
    private List<AuthorEntity> authors;

    @ManyToOne(optional = false)
    private PublisherEntity publisherEntity;

    public BookEntity(String title) {
        this.title = title;
    }

    public BookEntity setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
        return this;
    }

    public BookEntity setDescription(String description) {
        this.description = description;
        return this;
    }

    public BookEntity setState(BookState state) {
        this.state = state;
        return this;
    }

    public BookEntity setAuthors(List<AuthorEntity> authors) {
        this.authors = authors;
        return this;
    }

    public BookEntity setPublisherEntity(PublisherEntity publisherEntity) {
        this.publisherEntity = publisherEntity;
        return this;
    }
}
