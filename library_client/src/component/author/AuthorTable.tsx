import React, { useEffect, useState } from "react";
import { Author } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchData from "../SearchData";
import { getAuthorList } from "../../api/authorService";

interface Props {
    data: Author[],
    loading: boolean,
    onEdit: (author: Author) => any,
    onDelete: (author: Author) => any,
    onNew: () => any,
    canEdit: boolean,
    setData: (data: any) => any
}

interface AuthorRow {
    authorId: number,
    authorName: string,
    action: any
}

const AuthorTable = ({
    data=[],
    loading,
    onEdit,
    onDelete,
    onNew,
    canEdit,
    setData
}: Props) => {

    const [formatedData, setFormatedData] = useState<AuthorRow[]>([]);

    const formatData = () => {
        let formated : AuthorRow[] = [];

        data.forEach((item: Author) => {
            formated.push({
                authorId: item.authorId,
                authorName: item.name,
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
        dataField: 'authorId',
        text: 'Author ID',
        sort: true,
        headerStyle: { width: '110px' }
      }, {
        dataField: 'authorName',
        text: 'Author Name',
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
                Authors
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
                searchFunction={getAuthorList}
            />
        </Col>
        
    </Row>


    return(
        <>
            <BaseTable
                title={TableTitle}
                keyField="authorId"
                columns={columns}
                loading={loading}
                data={formatedData}
            />
        </>
    );
}

export default AuthorTable;