import React, { useEffect, useState } from "react";
import { Publisher } from "../../types/library";
import BaseTable from "../BaseTable";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {
    data: Publisher[],
    onEdit: (publisher: Publisher) => any
}

interface PublisherRow {
    publisherId: number,
    publisherName: string,
    action: any
}

const PublisherTable = ({
    data=[],
    onEdit
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
    

    return(
        <>
            <BaseTable
                title={<h4>Publishers</h4>}
                keyField="publisherId"
                columns={columns}
                data={formatedData}
            />
        </>
    );
}

export default PublisherTable;