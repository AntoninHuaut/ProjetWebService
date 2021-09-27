import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
    children: any,
    title: any,
    actions: any,
    showModal: boolean,
    handleHide: () => any
}

const BaseModal = ({
    children,
    title,
    actions,
    showModal,
    handleHide
}: Props) => {

    return (
        <>
            <Modal
                size="lg"
                centered
                show={showModal}
                onHide={handleHide}
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {children}                    
                </Modal.Body>

                <Modal.Footer>
                    {actions}
                </Modal.Footer>
                
            </Modal>
        </>
    )
}

export default BaseModal;