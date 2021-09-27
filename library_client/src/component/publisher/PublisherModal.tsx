import React, { useEffect, useState } from "react";
import { Publisher } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button } from "react-bootstrap";

interface Props {
    publisher: Publisher| undefined,
    show: boolean,
    handleHide: () => any
}

const PublisherModal = ({
    publisher,
    show,
    handleHide
}: Props) => {

    const [tmpPublisher, setTmpPublisher] = useState<Publisher>(publisher === undefined ? {
        publisherId: -1,
        name: ""
    } : publisher);

    useEffect(() => {
        setTmpPublisher(publisher === undefined ? {
            publisherId: -1,
            name: ""
        } : publisher);
    }, [publisher]);

    const handleChange = (evt: any) => {
        const value = evt.target.value;

        setTmpPublisher({
            ...tmpPublisher,
            [evt.target.name]: value
        });
    }


    const ModalActions = 
    <>
        <Button>
            Cancel
        </Button>
        <Button>
            {tmpPublisher.publisherId === -1 ? 'Create' : 'Update'}
        </Button>
    </>

    return (

        <BaseModal
            showModal={show}
            handleHide={handleHide}
            title={<h5>{tmpPublisher.publisherId === -1 ? 'New ' : 'Edit '} Publisher</h5>}
            actions={ModalActions}
        >
        
            <Form>
                <Form.Group className="mb-6">

                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={tmpPublisher.name}
                        onChange={handleChange}
                        name="name"
                    />
                   
                </Form.Group>
            </Form>
        
        </BaseModal>
    )

};

export default PublisherModal;