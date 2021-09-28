import React from "react";
import { Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";


interface Props {
    keyField?: string,
    title?: any,
    loading: boolean,
    data: any[],
    columns: any[]
}

const BaseTable = ({
    keyField="",
    title=<></>,
    loading,
    data,
    columns
}: Props) => {


    return (
        <>

            {title}

            {loading ? 
                <Spinner 
                    animation="border"
                />
            :
                <BootstrapTable 
                    keyField={keyField}
                    data={data} 
                    columns={columns}
                />
            }
            
        </>
    )
}

export default BaseTable;