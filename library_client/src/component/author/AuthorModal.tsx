import React, { useEffect, useState } from "react";
import { Author } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button } from "react-bootstrap";
import { axiosExecutePost } from "../../api/axiosUtils";
import { updateAuthor, addAuthor } from "../../api/authorService";
import BaseAlert from "../BaseAlert";

interface Props {
    author: Author| undefined,
    show: boolean,
    handleHide: () => any,
    update: (author: Author) => any,
    add: (author: Author) => any
}

const AuthorModal = ({
    author,
    show,
    handleHide,
    update,
    add
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [tmpAuthor, setTmpAuthor] = useState<Author>(author === undefined ? {
        authorId: -1,
        name: ""
    } : author);

    useEffect(() => {
        setTmpAuthor(author === undefined ? {
            authorId: -1,
            name: ""
        } : author);
    }, [author]);

    const handleChange = (evt: any) => {
        const value = evt.target.value;

        setTmpAuthor({
            ...tmpAuthor,
            [evt.target.name]: value
        });
    }

    const sendData = () => {
        if(tmpAuthor.authorId !== -1){
            axiosExecutePost(updateAuthor(tmpAuthor), 
                setLoading, 
                setError,
                (data: Author) => {
                    update(data);
                    handleHide();
                });
        }else{
            axiosExecutePost(addAuthor(tmpAuthor), 
                setLoading, 
                setError,
                (data: Author) => {
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
            {tmpAuthor.authorId === -1 ? 'Create' : 'Update'}
        </Button>
    </>

    return (

        <BaseModal
            showModal={show}
            handleHide={handleHide}
            title={<h5>{tmpAuthor.authorId === -1 ? 'New ' : 'Edit '} Author</h5>}
            actions={ModalActions}
        >
            
            <BaseAlert msg={error} close={() => setError('')} />

            <Form>
                <Form.Group className="mb-6">

                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={tmpAuthor.name}
                        onChange={handleChange}
                        name="name"
                    />
                   
                </Form.Group>
            </Form>
        
        </BaseModal>
    )

};

export default AuthorModal;