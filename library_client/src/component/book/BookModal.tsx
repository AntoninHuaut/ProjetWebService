import React, { useEffect, useState } from "react";
import { Author, Book, BookState, Publisher } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button } from "react-bootstrap";
import { axiosExecuteGet, axiosExecutePost } from "../../api/axiosUtils";
import { getPublisherList } from "../../api/publisherService";
import { getAuthorList } from "../../api/authorService";
import { updateBook, addBook } from "../../api/bookService";
import BaseErrorAlert from "../BaseErrorAlert";
import Select, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { authorToSelectOption, getAuthorsFromSelectOptions } from "../../lib/selectOptionHelper";
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

    const handleSelectAuthors = (selectedOptions: OnChangeValue<SelectOption, true>) => {
        setTmpBook({...tmpBook, authors: getAuthorsFromSelectOptions(authors, selectedOptions)});
    }
        

    const sendData = () => {
        if(tmpBook.bookId !== -1){
            axiosExecutePost(updateBook(tmpBook), 
                setLoading, 
                setError,
                (data: Book) => update(data))
            .then(() => {
                handleHide();
            });
        }else{
            axiosExecutePost(addBook(tmpBook), 
                setLoading, 
                setError,
                (data: Book) => add(data))
            .then(() => {
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
            
            <BaseErrorAlert error={error} />

            <Form>
                <Form.Group className="mb-6">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        value={tmpBook.title}
                        onChange={handleChange}
                        name="title"
                    />
                </Form.Group>

                <Form.Group className="mb-12">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        value={tmpBook.title}
                        onChange={handleChange}
                        name="title"
                    />               
                </Form.Group>

                <Form.Group className="mb-12">
                    <Form.Label>Authors</Form.Label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={authorToSelectOption(tmpBook.authors)}
                        isMulti
                        options={authorToSelectOption(authors)}
                    />    
                </Form.Group>

            </Form>
        
        </BaseModal>
    )

};

export default BookModal;