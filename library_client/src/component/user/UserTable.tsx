import React, { useEffect, useState } from "react";
import { User, UserRole } from "../../types/login";
import BaseTable from "../BaseTable";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchData from "../SearchData";
import { getUserList } from "../../api/userService";


interface Props {
    data: User[],
    loading: boolean,
    onEdit: (user: User) => any,
    onDelete: (user: User) => any,
    onNew: () => any,
    canEdit: boolean,
    setData: (data: any) => any
}

interface UserRow {
    userId: number,
    userName: string,
    role: string
    action: any
}

const UserTable = ({
    data=[],
    loading,
    onEdit,
    onDelete,
    onNew,
    canEdit,
    setData
}: Props) => {

    const [formatedData, setFormatedData] = useState<UserRow[]>([]);

    const formatData = () => {
        let formated : UserRow[] = [];

        data.forEach((item: User) => {
            formated.push({
                userId: item.userId,
                userName: item.userName,
                role: Object.values(UserRole)[item.role-1].toString().replace(/_ROLE/g, ''),
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
        dataField: 'userId',
        text: 'User ID',
        sort: true,
        headerStyle: { width: '110px' }
      }, {
        dataField: 'userName',
        text: 'User Name',
        sort: true
      },{
        dataField: 'role',
        text: 'Role',
        sort: true
      },{
        dataField: 'action',
        text: 'Actions',
        sort: false,
        headerStyle: { width: '110px' }
    }];
    
    const TableTitle = 
    <Row>
        <Col>
            <h4>
                Users
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
                searchFunction={getUserList}
            />
        </Col>
    </Row>


    return(
        <>
            <BaseTable
                title={TableTitle}
                keyField="userId"
                columns={columns}
                loading={loading}
                data={formatedData}
            />
        </>
    );
}

export default UserTable;