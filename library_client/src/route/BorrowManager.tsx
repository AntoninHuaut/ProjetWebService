import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getBorrowList } from "../api/borrowService";
import BaseAlert from "../component/BaseAlert";
import BorrowModal from "../component/borrow/BorrowModal";
import BorrowTable from "../component/borrow/BorrowTable";
import BorrowDeleteModal from "../component/borrow/BorrowDeleteModal";
import { Borrow } from "../types/library";
import PrivateComponent from "../component/PrivateComponent";
import { useSelector } from "react-redux";
import { User } from "../types/login";

const BorrowManager = () => {

    const [borrows, setBorrows] = useState<Borrow[]>([]);

    const [loadingBorrows, setLoadingBorrows] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalBorrow, setModalBorrow] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    const [selectedBorrow, setSelectedBorrow] = useState<Borrow| undefined>(undefined);

    const user: User = useSelector((state: any) => {
        return state.currentUser;
    }).user;

    const getBorrows = () => {
        axiosExecuteGet(
            getBorrowList(),
            setBorrows,
            setLoadingBorrows,
            setError);
    }

    useEffect(() => {
        getBorrows();
    }, []);

    const updateModalBorrow = (borrow: Borrow) => {
        setSelectedBorrow({...borrow});
        setModalBorrow(true);
    }

    const newModalBorrow = () => {
        setSelectedBorrow(undefined);
        setModalBorrow(true);
    }

    const deleteModalBorrow = (borrow: Borrow) => {
        setSelectedBorrow({...borrow});
        setModalDelete(true);
    }

    const updateBorrow = (borrow: Borrow) => {
        borrows.forEach((b: Borrow) => {
            if(b.borrowId === borrow.borrowId){
                b.userId = borrow.userId;
                b.bookId = borrow.bookId;
                b.borrowDate = borrow.borrowDate;
                b.maxBorrowDayDuration = borrow.maxBorrowDayDuration;
                b.returnedDate = borrow.returnedDate;
            }
        });
        setBorrows([...borrows]);
    }

    const deleteBorrow = (borrowId: number) => {
        let p : Borrow = borrows.find(p => p.borrowId === borrowId) ?? {borrowId: -1} as Borrow;

        const index = borrows.indexOf(p);
        if (index > -1) {
            borrows.splice(index, 1);
        }
        setBorrows([...borrows]);
    }

    const addBorrow = (borrow: Borrow) => {
        borrows.push(borrow);
        setBorrows([...borrows]);
    }

    return (
        <>
        
            <Container
                className="pt-4"
            >

                <BaseAlert msg={error} close={() => setError('')} />

                <BorrowTable 
                    data={borrows}
                    loading={loadingBorrows}
                    onEdit={updateModalBorrow}
                    onNew={newModalBorrow}
                    onDelete={deleteModalBorrow}
                    canEdit={user.role >= 3}
                />

                <BorrowModal
                    borrow={selectedBorrow}
                    show={modalBorrow}
                    handleHide={() => setModalBorrow(false)}
                    update={updateBorrow}
                    add={addBorrow}
                />

                {selectedBorrow &&
                    <BorrowDeleteModal 
                        borrow={selectedBorrow}
                        show={modalDelete}
                        handleHide={() => setModalDelete(false)}
                        removeFromList={deleteBorrow}
                    />
                }

            </Container>
        </>
    );
}

export default BorrowManager;