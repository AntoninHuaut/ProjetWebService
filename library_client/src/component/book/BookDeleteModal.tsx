import React, { useState } from "react";
import { axiosExecutePost } from "../../api/axiosUtils";
import { Book } from "../../types/library";
import { deleteBook } from "../../api/bookService";
import DeleteModal from "../DeleteModal";


interface Props {
    book: Book,
    show: boolean,
    handleHide: () => any,
    removeFromList: (id: number) => any,
}

const BookDeleteModal = ({
    book,
    show,
    handleHide,
    removeFromList
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deleteBookRequest = () => {
        axiosExecutePost(deleteBook(book.bookId),
            setLoading,
            setError,
            () => {
                removeFromList(book.bookId);
                handleClose();
            }
        );
    }

    const handleClose = () => {
        setError("");
        handleHide();
    }

    return (
        <DeleteModal
            itemNameToDelete={book?.title ?? ''}
            itemType="book"
            show={show}
            handleHide={handleHide}
            onDeleteItem={deleteBookRequest}
            loadingDelete={loading}
            errorDelete={error}
            setErrorDelete={setError}
        />
    )

}


export default BookDeleteModal;