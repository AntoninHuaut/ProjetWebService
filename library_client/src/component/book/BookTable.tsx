import React, { useEffect, useState } from "react";
import { Book } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchData from "../SearchData";
import { getBookList } from "../../api/bookService";

interface Props {
    data: Book[],
    loading: boolean,
    onEdit: (book: Book) => any,
    onDelete: (book: Book) => any,
    onNew: () => any,
    canEdit: boolean,
    setData: (data: any) => any
}

interface BookRow {
    bookId: number,
    title: string,
    publicationYear: string,
    state: string,
    publisherName: string,
    action: any
}

const BookTable = ({
    data=[],
    loading,
    onEdit,
    onDelete,
    onNew,
    canEdit,
    setData
}: Props) => {

    const [formatedData, setFormatedData] = useState<BookRow[]>([]);

    const formatData = () => {
        let formated : BookRow[] = [];

        data.forEach((item: Book) => {
            formated.push({
                bookId: item.bookId,
                title: item.title,
                publicationYear: item.publicationYear.toString(),
                state: item.state.toString(),
                publisherName: item.publisher.name,
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
        dataField: 'bookId',
        text: 'Book ID',
        sort: true,
        headerStyle: { width: '110px' }
      }, {
        dataField: 'title',
        text: 'Title',
        sort: true
      },{
        dataField: 'publicationYear',
        text: 'Publication year',
        sort: true
      },{
        dataField: 'state',
        text: 'State',
        sort: true
      }, {
        dataField: 'publisherName',
        text: 'Publisher Name',
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
                Books
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

        <Col sm="auto" >
            <SearchData 
                setData={setData}
                searchFunction={getBookList}
            />
        </Col>

    </Row>


    return(
        <>
            <BaseTable
                title={TableTitle}
                keyField="bookId"
                columns={columns}
                loading={loading}
                data={formatedData}
            />
        </>
    );
}

export default BookTable;