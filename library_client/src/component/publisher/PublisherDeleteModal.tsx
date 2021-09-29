import React, { useState } from "react";
import { axiosExecutePost } from "../../api/axiosUtils";
import { Publisher } from "../../types/library";
import { deletePublisher } from "../../api/publisherService";
import DeleteModal from "../DeleteModal";


interface Props {
    publisher: Publisher,
    show: boolean,
    handleHide: () => any,
    removeFromList: (id: number) => any,
}

const PublisherDeleteModal = ({
    publisher,
    show,
    handleHide,
    removeFromList
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const deletePublisherRequest = () => {
        axiosExecutePost(deletePublisher(publisher.publisherId),
            setLoading,
            setError
        ).then(() => {
            removeFromList(publisher.publisherId);
            handleClose();
        });
    }

    const handleClose = () => {
        setError("");
        handleHide();
    }

    return (
        <DeleteModal
            itemNameToDelete={publisher?.name ?? ''}
            itemType="publisher"
            show={show}
            handleHide={handleHide}
            onDeleteItem={deletePublisherRequest}
            loadingDelete={loading}
            errorDelete={error}
        />
    )

}


export default PublisherDeleteModal;