import React, { useState } from "react";
import { axiosExecutePost } from "../../api/axiosUtils";
import { Author } from "../../types/library";
import { deleteAuthor } from "../../api/authorService";
import DeleteModal from "../DeleteModal";


interface Props {
    author: Author,
    show: boolean,
    handleHide: () => any,
    removeFromList: (id: number) => any,
}

const AuthorDeleteModal = ({
    author,
    show,
    handleHide,
    removeFromList
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deleteAuthorRequest = () => {
        axiosExecutePost(deleteAuthor(author.authorId),
            setLoading,
            setError,
            () => {
                removeFromList(author.authorId);
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
            itemNameToDelete={author?.name ?? ''}
            itemType="author"
            show={show}
            handleHide={handleHide}
            onDeleteItem={deleteAuthorRequest}
            loadingDelete={loading}
            errorDelete={error}
            setErrorDelete={setError}
        />
    )

}


export default AuthorDeleteModal;