import React, { useState } from "react";
import { axiosExecutePost } from "../../api/axiosUtils";
import { Borrow } from "../../types/library";
import { deleteBorrow } from "../../api/borrowService";
import DeleteModal from "../DeleteModal";


interface Props {
    borrow: Borrow,
    show: boolean,
    handleHide: () => any,
    removeFromList: (id: number) => any,
}

const BorrowDeleteModal = ({
    borrow,
    show,
    handleHide,
    removeFromList
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deleteBorrowRequest = () => {
        axiosExecutePost(deleteBorrow(borrow.borrowId),
            setLoading,
            setError,
            () => {
                removeFromList(borrow.borrowId);
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
            itemNameToDelete={borrow?.bookId?.title ?? ''}
            itemType="borrow"
            show={show}
            handleHide={handleHide}
            onDeleteItem={deleteBorrowRequest}
            loadingDelete={loading}
            errorDelete={error}
            setErrorDelete={setError}
        />
    )

}


export default BorrowDeleteModal;