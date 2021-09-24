package fr.fontainehuaut.libraryservice.form;

import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PublisherForm {

    private Long publisherId;

    @NotBlank(message = "Name is mandatory")
    private String name;

    public PublisherEntity toEntity() {
        return new ModelMapper().map(this, PublisherEntity.class);
    }
}
