package fr.fontainehuaut.libraryservice.form;

import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class AuthorForm {

    private Long authorId;

    @NotBlank(message = "Name is mandatory")
    private String name;

    public AuthorEntity toEntity() {
        return new ModelMapper().map(this, AuthorEntity.class);
    }
}
