import React, { useEffect, useState } from "react";
import { Publisher } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
    data: Publisher[],
    loading: boolean,
    onEdit: (publisher: Publisher) => any,
    onNew: () => any
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
    onNew
}: Props) => {

    const [formatedData, setFormatedData] = useState<PublisherRow[]>([]);

    const formatData = () => {
        let formated : PublisherRow[] = [];

        data.forEach((item: Publisher) => {
            formated.push({
                publisherId: item.publisherId,
                publisherName: item.name,
                action: <>
                    <Button
                        onClick={() => onEdit(item)}
                    >
                       <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </>
            });
        });

        setFormatedData(formated);
    }
    
    useEffect(() => {
        formatData();
    }, [data]);

    const columns = [{
        dataField: 'publisherId',
        text: 'Publisher ID'
      }, {
        dataField: 'publisherName',
        text: 'Publisher Name'
      }, {
        dataField: 'action',
        text: 'Actions'
    }];
    
    const TableTitle = 
    <Row>
        <Col>
            <h4>
                Publishers
            </h4>
        </Col>
        
        <Col sm="auto" >
            <Button
                className="mb-2 p-1"
                variant="success"
                onClick={onNew}
            >
                Add <FontAwesomeIcon icon={faPlus} />
            </Button>
        </Col>
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