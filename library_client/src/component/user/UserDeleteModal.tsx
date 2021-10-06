import React, { useState } from "react";
import { axiosExecutePost } from "../../api/axiosUtils";
import { User } from "../../types/login";
import { deleteUser } from "../../api/userService";
import DeleteModal from "../DeleteModal";


interface Props {
    user: User,
    show: boolean,
    handleHide: () => any,
    removeFromList: (id: number) => any,
}

const UserDeleteModal = ({
    user,
    show,
    handleHide,
    removeFromList
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deleteUserRequest = () => {
        axiosExecutePost(deleteUser(user.userId),
            setLoading,
            setError,
            () => {
                removeFromList(user.userId);
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
            itemNameToDelete={user?.userName ?? ''}
            itemType="user"
            show={show}
            handleHide={handleHide}
            onDeleteItem={deleteUserRequest}
            loadingDelete={loading}
            errorDelete={error}
            setErrorDelete={setError}
        />
    )

}


export default UserDeleteModal;