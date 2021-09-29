package fr.fontainehuaut.libraryservice.form;

import fr.fontainehuaut.libraryservice.entity.BookEntity;
import fr.fontainehuaut.libraryservice.entity.BorrowEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
public class BorrowForm {

    private Long borrowId;

    @NotNull
    private BookEntity bookId;

    @NotNull
    private Long userId;

    @NotNull
    private Instant borrowDate;

    @NotNull
    private Integer maxBorrowDayDuration;

    private Instant returnedDate;

    public BorrowEntity toEntity() {
        return new ModelMapper().map(this, BorrowEntity.class);
    }
}
