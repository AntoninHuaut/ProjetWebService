package fr.fontainehuaut.libraryservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PublisherEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "publisherId", nullable = false)
    private Long publisherId;

    @Column(name = "name", nullable = false)
    private String name;

    public PublisherEntity(String name) {
        this.name = name;
    }
}
