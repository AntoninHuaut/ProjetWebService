import React from "react";
import BootstrapTable from "react-bootstrap-table-next";


interface Props {
    keyField?: string,
    title?: any,
    data: any[],
    columns: any[]
}

const BaseTable = ({
    keyField="",
    title=<></>,
    data,
    columns
}: Props) => {


    return (
        <>

            {title}

            <BootstrapTable 
                keyField={ keyField }
                data={ data } 
                columns={ columns } 
            />
        </>
    )
}

export default BaseTable;