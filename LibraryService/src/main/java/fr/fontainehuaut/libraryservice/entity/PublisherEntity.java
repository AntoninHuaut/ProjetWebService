package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class PublisherEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "publisherId", nullable = false)
    private Long publisherId;

    @Column(name = "name", nullable = false)
    private String name;
}
