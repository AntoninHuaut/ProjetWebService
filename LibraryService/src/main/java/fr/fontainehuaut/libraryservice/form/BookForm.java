package fr.fontainehuaut.libraryservice.form;

import com.sun.istack.NotNull;
import fr.fontainehuaut.libraryservice.entity.AuthorEntity;
import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.entity.BookState;
import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookForm {

    private Long bookId;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotNull()
    private Integer publicationYear;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull()
    private BookState state = BookState.AVAILABLE;

    private List<AuthorEntity> authors;

    @NotNull
    private PublisherEntity publisher;

    public BookEntity toEntity() {
        return new ModelMapper().map(this, BookEntity.class);
    }
}
