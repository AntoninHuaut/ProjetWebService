import React, { useEffect, useState } from "react";
import { Publisher } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    data: Publisher[],
    loading: boolean,
    onEdit: (publisher: Publisher) => any,
    onDelete: (publisher: Publisher) => any,
    onNew: () => any,
    canEdit: boolean
}

interface PublisherRow {
    publisherId: number,
    publisherName: string,
    action: any
}

const PublisherTable = ({
    data=[],
    loading,
    onEdit,
    onDelete,
    onNew,
    canEdit
}: Props) => {

    const [formatedData, setFormatedData] = useState<PublisherRow[]>([]);

    const formatData = () => {
        let formated : PublisherRow[] = [];

        data.forEach((item: Publisher) => {
            formated.push({
                publisherId: item.publisherId,
                publisherName: item.name,
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
        dataField: 'publisherId',
        text: 'Publisher ID',
        sort: true,
        headerStyle: { width: '110px' }
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
                Publishers
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
                keyField="publisherId"
                columns={columns}
                loading={loading}
                data={formatedData}
            />
        </>
    );
}

export default PublisherTable;