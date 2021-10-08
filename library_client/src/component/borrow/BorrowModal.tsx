import React, { useEffect, useState } from "react";
import { Borrow, Book } from "../../types/library";
import BaseModal from "../BaseModal";
import { Form, Button, Row, Col } from "react-bootstrap";
import { axiosExecuteGet, axiosExecutePost } from "../../api/axiosUtils";
import { updateBorrow, addBorrow } from "../../api/borrowService";
import BaseAlert from "../BaseAlert";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getBookFromSelectOptions, booksToSelectOption, getUserFromId, usersToSelectOption } from "../../lib/selectOptionHelper";
import { User } from "../../types/login";
import dayjs from "dayjs";
import { getBookList } from "../../api/bookService";
import { getUserList } from "../../api/userService";

const animatedComponents = makeAnimated();

interface Props {
    borrow: Borrow| undefined,
    show: boolean,
    handleHide: () => any,
    update: (borrow: Borrow) => any,
    add: (borrow: Borrow) => any
}

const BorrowModal = ({
    borrow,
    show,
    handleHide,
    update,
    add
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([]);


    const [tmpBorrow, setTmpBorrow] = useState<Borrow>(borrow === undefined ? {
        borrowId: -1,
        bookId: {bookId: -1, title:""} as Book,
        userId: -1,
        borrowDate: new Date(),
        maxBorrowDayDuration: 14,
        returnedDate: dayjs().add(2, 'day').toDate()
    } : borrow);

    const getBooksRequest = () => {
        axiosExecuteGet(getBookList(), setBooks, setLoading, setError);
    }

    const getUsersRequest = () => {
        axiosExecuteGet(getUserList(), setUsers, setLoading, setError);
    }

    useEffect(() => {
        setTmpBorrow(borrow === undefined ? {
            borrowId: -1,
            bookId: {bookId: -1, title:""} as Book,
            userId: -1,
            borrowDate: new Date(),
            maxBorrowDayDuration: 14,
            returnedDate: dayjs().add(2, 'day').toDate()
        } : borrow);
    }, [borrow, show]);

    useEffect(() => {
        getBooksRequest();
        getUsersRequest();
    }, []);

    const handleChange = (evt: any) => {
        const value = evt.target.value;

        setTmpBorrow({
            ...tmpBorrow,
            [evt.target.name]: value
        });
    }

    const handleChangeDate = (evt: any) => {
        const value = evt.target.value;

        setTmpBorrow({
            ...tmpBorrow,
            [evt.target.name]: dayjs(value, "YYYY-MM-DD").toDate()
        });
    }

    const handleSelectBook = (selectedOptions: any) => {
        setTmpBorrow({ ...tmpBorrow, bookId: getBookFromSelectOptions(books, selectedOptions)});
    }
    
    const handleSelectUser = (selectedOptions: any) => {
        setTmpBorrow({ ...tmpBorrow, userId: parseInt(selectedOptions.value)});
    }   

    const sendData = () => {
        if(tmpBorrow.borrowId !== -1){
            axiosExecutePost(updateBorrow(tmpBorrow), 
                setLoading, 
                setError,
                (data: Borrow) => {
                    update(data);
                    handleHide();
                });
        }else{
            axiosExecutePost(addBorrow(tmpBorrow), 
                setLoading, 
                setError,
                (data: Borrow) => {
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
            {tmpBorrow.borrowId === -1 ? 'Create' : 'Update'}
        </Button>
    </>

    return (

        <BaseModal
            showModal={show}
            handleHide={handleHide}
            title={<h5>{tmpBorrow.borrowId === -1 ? 'New ' : 'Edit '} Borrow</h5>}
            actions={ModalActions}
        >
            
            <BaseAlert msg={error} close={() => setError('')} />

            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Book</Form.Label>
                            <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                value={{value: tmpBorrow.bookId.bookId.toString(), label: tmpBorrow.bookId.title}}
                                options={booksToSelectOption(books)}
                                onChange={handleSelectBook}
                            /> 
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Borrower</Form.Label>
                            <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                value={{value: tmpBorrow.userId.toString(), label: getUserFromId(users, tmpBorrow.userId.toString()).userName}}
                                options={usersToSelectOption(users)}
                                onChange={handleSelectUser}
                            /> 
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Borrow Date</Form.Label>
                            <Form.Control 
                                type="date"
                                value={dayjs(tmpBorrow.borrowDate).format("YYYY-MM-DD")}
                                onChange={handleChangeDate}
                                name="borrowDate"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Max Borrow Date</Form.Label>
                            <Form.Control 
                                type="number"
                                value={tmpBorrow.maxBorrowDayDuration}
                                onChange={(e) => setTmpBorrow({...tmpBorrow, maxBorrowDayDuration: parseInt(e.target.value)})}
                                name="maxBorrowDayDuration"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control 
                                type="date"
                                value={dayjs(tmpBorrow.returnedDate).format("YYYY-MM-DD")}
                                onChange={handleChangeDate}
                                name="returnedDate"
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </Form>
        
        </BaseModal>
    )

};

export default BorrowModal;