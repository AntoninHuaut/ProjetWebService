import React, { useEffect, useState } from "react";
import { Publisher } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button } from "react-bootstrap";
import { axiosExecutePost } from "../../api/axiosUtils";
import { updatePublisher, addPublisher } from "../../api/publisherService";
import BaseErrorAlert from "../BaseErrorAlert";

interface Props {
    publisher: Publisher| undefined,
    show: boolean,
    handleHide: () => any,
    update: (publisher: Publisher) => any,
    add: (publisher: Publisher) => any
}

const PublisherModal = ({
    publisher,
    show,
    handleHide,
    update,
    add
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

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

    const sendData = () => {
        if(tmpPublisher.publisherId !== -1){
            axiosExecutePost(updatePublisher(tmpPublisher), 
                setLoading, 
                setError,
                (data: Publisher) => {
                    update(data);
                    handleHide();
                });
        }else{
            axiosExecutePost(addPublisher(tmpPublisher), 
                setLoading, 
                setError,
                (data: Publisher) => {
                    add(data);
                    handleHide();
                });
        }
    }

    const ModalActions = 
    <>
        <Button
            variant="secondary"
            disabled={loading}
            onClick={handleHide}
        >
            Cancel
        </Button>
        <Button
            variant="success"
            disabled={loading}
            onClick={sendData}
        >
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
            
            <BaseErrorAlert error={error} close={() => setError('')} />

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