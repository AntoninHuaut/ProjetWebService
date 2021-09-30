import React, { useEffect, useState } from "react";
import { Author, Book, BookState, Publisher } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { axiosExecuteGet, axiosExecutePost } from "../../api/axiosUtils";
import { getPublisherList } from "../../api/publisherService";
import { getAuthorList } from "../../api/authorService";
import { updateBook, addBook } from "../../api/bookService";
import BaseErrorAlert from "../BaseErrorAlert";
import Select, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { authorToSelectOption, getAuthorsFromSelectOptions, publisherToSelectOption, publishersToSelectOption, getPublisherFromSelectOptions } from "../../lib/selectOptionHelper";
import { SelectOption } from "../../types/common";

const animatedComponents = makeAnimated();

interface Props {
    book: Book| undefined,
    show: boolean,
    handleHide: () => any,
    update: (book: Book) => any,
    add: (book: Book) => any
}

const BookModal = ({
    book,
    show,
    handleHide,
    update,
    add
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [authors, setAuthors] = useState<Author[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);

    const [tmpBook, setTmpBook] = useState<Book>(book === undefined ? {
        bookId: -1,
        title: "",
        authors: [],
        description: "",
        publisher: {publisherId: -1, name: ""},
        publicationYear: new Date().getFullYear(),
        state: BookState.AVAILABLE
    } : book);

    const getPublishersRequest = () => {
        axiosExecuteGet(getPublisherList(), setPublishers, setLoading, setError);
    }

    const getAuthorRequest = () => {
        axiosExecuteGet(getAuthorList(), setAuthors, setLoading, setError);
    }

    useEffect(() => {
        setTmpBook(book === undefined ? {
            bookId: -1,
            title: "",
            authors: [],
            description: "",
            publisher: {publisherId: -1, name: ""},
            publicationYear: new Date().getFullYear(),
            state: BookState.AVAILABLE
        } : book);

        getPublishersRequest();
        getAuthorRequest();
    }, [book]);

    const handleChange = (evt: any) => {
        const value = evt.target.value;

        setTmpBook({
            ...tmpBook,
            [evt.target.name]: value
        });
    }

    useEffect(() => {
        console.log(tmpBook);
    }, [tmpBook]);

    const handleSelectAuthors = (selectedOptions: any) => {
        setTmpBook({ ...tmpBook, authors: getAuthorsFromSelectOptions(authors, selectedOptions)});
    }
    
    const handleSelectPublisher = (selectedOptions: any) => {
        console.log(selectedOptions);
        setTmpBook({ ...tmpBook, publisher: getPublisherFromSelectOptions(publishers, selectedOptions)});
    }   

    const sendData = () => {
        if(tmpBook.bookId !== -1){
            axiosExecutePost(updateBook(tmpBook), 
                setLoading, 
                setError,
                (data: Book) => {
                    update(data);
                    handleHide();
                });
        }else{
            axiosExecutePost(addBook(tmpBook), 
                setLoading, 
                setError,
                (data: Book) => {
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
            {tmpBook.bookId === -1 ? 'Create' : 'Update'}
        </Button>
    </>

    return (

        <BaseModal
            showModal={show}
            handleHide={handleHide}
            title={<h5>{tmpBook.bookId === -1 ? 'New ' : 'Edit '} Book</h5>}
            actions={ModalActions}
        >
            
            <BaseErrorAlert error={error} close={() => setError('')} />

            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                value={tmpBook.title}
                                onChange={handleChange}
                                name="title"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Publication year</Form.Label>
                            <Form.Control 
                                type="number"
                                value={tmpBook.publicationYear}
                                onChange={handleChange}
                                name="publicationYear"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mt-4">
                    <Form.Label>Descritpion</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Book descritpion"
                        value={tmpBook.description}
                        onChange={handleChange}
                        style={{ height: '150px' }}
                        name="description"
                    />
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label>Publisher</Form.Label>
                    <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        value={publisherToSelectOption(tmpBook.publisher)}
                        options={publishersToSelectOption(publishers)}
                        onChange={handleSelectPublisher}
                    />            
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label>Authors</Form.Label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        value={authorToSelectOption(tmpBook.authors)}
                        isMulti
                        options={authorToSelectOption(authors)}
                        onChange={handleSelectAuthors}
                    />    
                </Form.Group>

            </Form>
        
        </BaseModal>
    )

};

export default BookModal;