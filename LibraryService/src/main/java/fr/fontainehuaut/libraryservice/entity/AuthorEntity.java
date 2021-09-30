package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AuthorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "authorId", nullable = false)
    private Long authorId;

    @Column(name = "name", nullable = false)
    private String name;

    public AuthorEntity(Long authorId) {
        this.authorId = authorId;
    }
}
