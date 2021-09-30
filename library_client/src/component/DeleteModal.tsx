import React from "react";
import BaseModal from "./BaseModal";
import { Button } from "react-bootstrap";
import BaseErrorAlert from "./BaseErrorAlert";

interface Props {
    show: boolean,
    itemNameToDelete: string,
    itemType: string,
    onDeleteItem: () => any,
    handleHide: () => any,
    loadingDelete: boolean,
    errorDelete: string,
    setErrorDelete: (error : string) => any
}

const DeleteModal = ({
    show,
    itemNameToDelete,
    itemType,
    onDeleteItem,
    handleHide,
    loadingDelete,
    errorDelete,
    setErrorDelete
}: Props) => {

    const actions = 
    <>
        <Button
            variant="secondary"
            disabled={loadingDelete}
            onClick={handleHide}
        >
            Cancel
        </Button>
        <Button
            variant="danger"
            disabled={loadingDelete}
            onClick={onDeleteItem}
        >
            Delete
        </Button>
    </>

    return (
        <>
            <BaseModal
                showModal={show}
                handleHide={handleHide}
                title={<h4>Delete {itemType} - {itemNameToDelete}</h4>}
                actions={actions}
            >
                <BaseErrorAlert error={errorDelete} close={() => setErrorDelete('')}/>

                <>
                    Are you sure to delete the {itemType} : {itemNameToDelete} ?
                </>
            
            </BaseModal>
        </>
    );

};

export default DeleteModal;