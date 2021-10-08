import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getAuthorList } from "../api/authorService";
import BaseAlert from "../component/BaseAlert";
import AuthorModal from "../component/author/AuthorModal";
import AuthorTable from "../component/author/AuthorTable";
import AuthorDeleteModal from "../component/author/AuthorDeleteModal";
import { Author } from "../types/library";
import { useSelector } from "react-redux";
import { User } from "../types/login";

const AuthorManager = () => {

    const [authors, setAuthors] = useState<Author[]>([]);

    const [loadingAuthors, setLoadingAuthors] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalAuthor, setModalAuthor] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    const [selectedAuthor, setSelectedAuthor] = useState<Author| undefined>(undefined);

    const user: User = useSelector((state: any) => {
        return state.currentUser;
    }).user;

    const getAuthors = () => {
        axiosExecuteGet(
            getAuthorList(),
            setAuthors,
            setLoadingAuthors,
            setError);
    }

    useEffect(() => {
        getAuthors();
    }, []);

    const updateModalAuthor = (author: Author) => {
        setSelectedAuthor({...author});
        setModalAuthor(true);
    }

    const newModalAuthor = () => {
        setSelectedAuthor(undefined);
        setModalAuthor(true);
    }

    const deleteModalAuthor = (author: Author) => {
        setSelectedAuthor({...author});
        setModalDelete(true);
    }

    const updateAuthor = (author: Author) => {
        authors.forEach((p: Author) => {
            if(p.authorId === author.authorId){
                p.name = author.name;
            }
        });
        setAuthors([...authors]);
    }

    const deleteAuthor = (authorId: number) => {
        let p = authors.find(p => p.authorId === authorId) ?? {name: "", authorId: -1};

        const index = authors.indexOf(p);
        if (index > -1) {
            authors.splice(index, 1);
        }
        setAuthors([...authors]);
    }

    const addAuthor = (author: Author) => {
        authors.push(author);
        setAuthors([...authors]);
    }

    return (
        <>
            <Container
                className="pt-4"
            >

                <BaseAlert msg={error} close={() => setError('')} />

                <AuthorTable 
                    data={authors}
                    loading={loadingAuthors}
                    onEdit={updateModalAuthor}
                    onNew={newModalAuthor}
                    onDelete={deleteModalAuthor}
                    canEdit={user.role >= 3}
                />

                <AuthorModal
                    author={selectedAuthor}
                    show={modalAuthor}
                    handleHide={() => setModalAuthor(false)}
                    update={updateAuthor}
                    add={addAuthor}
                />

                {selectedAuthor &&
                    <AuthorDeleteModal 
                        author={selectedAuthor}
                        show={modalDelete}
                        handleHide={() => setModalDelete(false)}
                        removeFromList={deleteAuthor}
                    />
                }

            </Container>
        </>
    );
}

export default AuthorManager;