import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getBookList } from "../api/bookService";
import BaseErrorAlert from "../component/BaseErrorAlert";
import BookModal from "../component/book/BookModal";
import BookTable from "../component/book/BookTable";
import BookDeleteModal from "../component/book/BookDeleteModal";
import { Book } from "../types/library";
import PrivateComponent from "../component/PrivateComponent";

const BookManager = () => {

    const [books, setBooks] = useState<Book[]>([]);

    const [loadingBooks, setLoadingBooks] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalBook, setModalBook] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    const [selectedBook, setSelectedBook] = useState<Book| undefined>(undefined);

    const getBooks = () => {
        axiosExecuteGet(
            getBookList(),
            setBooks,
            setLoadingBooks,
            setError);
    }

    useEffect(() => {
        getBooks();
    }, []);

    const updateModalBook = (book: Book) => {
        setSelectedBook({...book});
        setModalBook(true);
    }

    const newModalBook = () => {
        setSelectedBook(undefined);
        setModalBook(true);
    }

    const deleteModalBook = (book: Book) => {
        setSelectedBook({...book});
        setModalDelete(true);
    }

    const updateBook = (book: Book) => {
        books.forEach((b: Book) => {
            if(b.bookId === book.bookId){
                b.title = book.title;
                b.authors = book.authors;
                b.description = book.description;
                b.publicationYear = book.publicationYear;
                b.publisher = book.publisher;
                b.state = book.state;
            }
        });
        setBooks([...books]);
    }

    const deleteBook = (bookId: number) => {
        let p : Book = books.find(p => p.bookId === bookId) ?? {bookId: -1} as Book;

        const index = books.indexOf(p);
        if (index > -1) {
            books.splice(index, 1);
        }
        setBooks([...books]);
    }

    const addBook = (book: Book) => {
        books.push(book);
        setBooks([...books]);
    }

    return (
        <>
        
            <Container
                className="pt-4"
            >

                <BaseErrorAlert error={error} close={() => setError('')} />

                <BookTable 
                    data={books}
                    loading={loadingBooks}
                    onEdit={updateModalBook}
                    onNew={newModalBook}
                    onDelete={deleteModalBook}
                />

                <BookModal
                    book={selectedBook}
                    show={modalBook}
                    handleHide={() => setModalBook(false)}
                    update={updateBook}
                    add={addBook}
                />

                {selectedBook &&
                    <BookDeleteModal 
                        book={selectedBook}
                        show={modalDelete}
                        handleHide={() => setModalDelete(false)}
                        removeFromList={deleteBook}
                    />
                }

            </Container>
        </>
    );
}

export default BookManager;