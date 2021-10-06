import React, { useEffect, useState } from "react";
import { User, UserRole } from "../../types/login";
import BaseModal from "../BaseModal";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { axiosExecuteGet, axiosExecutePost } from "../../api/axiosUtils";
import { getPublisherList } from "../../api/publisherService";
import { getAuthorList } from "../../api/authorService";
import { updateUser, register } from "../../api/userService";
import BaseAlert from "../BaseAlert";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { roleSelectOptions, roleToSelectOption } from "../../lib/selectOptionHelper";
import { SelectOption } from "../../types/common";

const animatedComponents = makeAnimated();

interface Props {
    user: User| undefined,
    show: boolean,
    handleHide: () => any,
    update: (user: User) => any,
    add: (user: User) => any
}

const UserModal = ({
    user,
    show,
    handleHide,
    update,
    add
}: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const [tmpUser, setTmpUser] = useState<User>(user === undefined ? {
        userId: -1,
        userName: "",
        role: UserRole.CONSULT_ROLE,
        token: ""
    } : user);

    const [newPassword, setNewPassword] = useState<string>("");

    const [roleList, setRoleListe] = useState<SelectOption[]>(roleSelectOptions());


    useEffect(() => {
        setTmpUser(user === undefined ? {
            userId: -1,
            userName: "",
            role: UserRole.CONSULT_ROLE,
            token: ""
        } : user);
    }, [user]);

    const handleChange = (evt: any) => {
        const value = evt.target.value;

        setTmpUser({
            ...tmpUser,
            [evt.target.name]: value
        });
    }

    const handleSelectRole = (selectedOptions: any) => {
        setTmpUser({...tmpUser, role: parseInt(selectedOptions.value)});
    } 

    const sendData = () => {
        if(tmpUser.userId !== -1){
            axiosExecutePost(updateUser(tmpUser), 
                setLoading, 
                setError,
                (data: User) => {
                    update(data);
                    handleHide();
                });
        }else{
            axiosExecutePost(register({
                userName: tmpUser.userName,
                role: tmpUser.role,
                password: newPassword
            }), 
                setLoading, 
                setError,
                (data: User) => {
                    add(data);
                    handleHide();
                });
        }
    }

    const ModalActions = 
    <>
        <Button
            variant="secondary"
            disabled={loading}
            onClick={handleHide}
        >
            Cancel
        </Button>
        <Button
            variant="success"
            disabled={loading}
            onClick={sendData}
        >
            {tmpUser.userId === -1 ? 'Create' : 'Update'}
        </Button>
    </>

    return (

        <BaseModal
            showModal={show}
            handleHide={handleHide}
            title={<h5>{tmpUser.userId === -1 ? 'New ' : 'Edit '} User</h5>}
            actions={ModalActions}
        >
            
            <BaseAlert msg={error} close={() => setError('')} />

            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter user name" 
                                value={tmpUser.userName}
                                onChange={handleChange}
                                name="userName"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group
                            className="mt-2"
                        >
                            <Form.Label>Role:</Form.Label>
                            <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                value={roleToSelectOption(tmpUser.role, roleList)}
                                onChange={handleSelectRole}
                                options={roleList}
                            />  
                        </Form.Group>
                    </Col>
                </Row>

                {tmpUser.userId === -1 &&
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter password" 
                            value={newPassword}
                            onChange={(e: any) => setNewPassword(e.target.value)}
                            name="password"
                        />
                    </Form.Group>
                }

            </Form>
        
        </BaseModal>
    )

};

export default UserModal;