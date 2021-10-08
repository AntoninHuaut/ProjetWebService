import React, { useEffect, useState } from "react";
import { Borrow } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/login";
import { axiosExecuteGet } from "../../api/axiosUtils";
import { getUserList } from "../../api/userService";
import { getUserFromId } from "../../lib/selectOptionHelper";
import dayjs from "dayjs";

interface Props {
    data: Borrow[],
    loading: boolean,
    onEdit: (borrow: Borrow) => any,
    onDelete: (borrow: Borrow) => any,
    onNew: () => any,
    canEdit: boolean
}

interface BorrowRow {
    borrowId: number,
    bookTitle: string,
    userName: string,
    borrowDate: string,
    maxBorrowDate: string,
    returnDate: string,
    action: any
}

const BorrowTable = ({
    data=[],
    loading,
    onEdit,
    onDelete,
    onNew,
    canEdit
}: Props) => {

    const [formatedData, setFormatedData] = useState<BorrowRow[]>([]);

    const [users, setUsers] = useState<User[]>([]);
    const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const getUsersRequest = () => {
        axiosExecuteGet(getUserList(), setUsers, setLoadingRequest, setError);
    }

    useEffect(() => {
        getUsersRequest();
    }, []);

    const formatData = () => {
        let formated : BorrowRow[] = [];

        data.forEach((item: Borrow) => {
            formated.push({
                borrowId: item.borrowId,
                bookTitle: item.bookId?.title ?? "",
                userName: getUserFromId(users, item.userId.toString()).userName,
                borrowDate: dayjs(item.borrowDate).format("DD/MM/YYYY HH:mm"),
                maxBorrowDate: item.maxBorrowDayDuration.toString()+ " day(s)",
                returnDate: dayjs(item.returnedDate).format("DD/MM/YYYY HH:mm"),
                action: canEdit ? <>
                    <Button
                        variant="outline-secondary"
                        onClick={() => onEdit(item)}
                    >
                       <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    {' '}
                    <Button
                        className="ml-2"
                        variant="outline-danger"
                        onClick={() => onDelete(item)}
                    >
                       <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </> : <></>
            });
        });

        setFormatedData(formated);
    }
    
    useEffect(() => {
        formatData();
    }, [data]);

    const columns = [{
        dataField: 'borrowId',
        text: 'Borrow ID',
        sort: true,
        headerStyle: { width: '110px' }
      }, {
        dataField: 'bookTitle',
        text: 'Book Title',
        sort: true
      },{
        dataField: 'userName',
        text: 'Borrower',
        sort: true
      },{
        dataField: 'borrowDate',
        text: 'Borrow Date',
        sort: true
      }, {
        dataField: 'maxBorrowDate',
        text: 'Max Borrow Date',
        sort: true
      }, {
        dataField: 'returnDate',
        text: 'Retrun Date',
        sort: true
      }, {
        dataField: 'action',
        text: 'Actions',
        sort: false,
        headerStyle: { width: '110px' }
    }];
    
    const TableTitle = 
    <Row>
        <Col>
            <h4>
                Borrows
            </h4>
        </Col>
        
        {canEdit &&
            <Col sm="auto" >
                <Button
                    className="mb-2 p-1"
                    variant="success"
                    onClick={onNew}
                >
                    Add <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Col>
        }
    </Row>


    return(
        <>
            <BaseTable
                title={TableTitle}
                keyField="borrowId"
                columns={columns}
                loading={loading}
                data={formatedData}
            />
        </>
    );
}

export default BorrowTable;