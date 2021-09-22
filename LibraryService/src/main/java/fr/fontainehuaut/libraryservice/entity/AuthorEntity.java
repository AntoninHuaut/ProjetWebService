package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class AuthorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "authorId", nullable = false)
    private Long authorId;

    @Column(name = "name", nullable = false)
    private String name;
}
