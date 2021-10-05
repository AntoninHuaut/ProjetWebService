import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { UserRole } from "../types/login";
import { roleSelectOptions, roleToSelectOption } from "../lib/selectOptionHelper";
import { SelectOption } from "../types/common";
import { login, register } from "../api/userService";
import { axiosExecutePost } from "../api/axiosUtils";
import { useHistory } from "react-router-dom";
import BaseAlert from "../component/BaseAlert";


const animatedComponents = makeAnimated();

interface Props {

}

const LoginPage = ({

}: Props) => {

    const history = useHistory();

    const [registerMode, setRegisterMode] = useState<boolean>(false);

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<number>(UserRole.CONSULT_ROLE);

    const [roleList, setRoleListe] = useState<SelectOption[]>(roleSelectOptions());

    const handleSelectRole = (selectedOptions: any) => {
        console.log(selectedOptions);
        setRole(parseInt(selectedOptions.value));
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [succesMsg, setSuccessMsg] = useState<string>("");


    const onEnter = (e: any) => {
        console.log(e);
        if (e.key === 'Enter') {
            registerMode ? registerRequest() : loginRequest()
        }
    }


    const registerRequest = () => {
        axiosExecutePost(
            register({
                userName: userName,
                password: password,
                role: role
            }),
            setLoading,
            setError,
            () => {
                setSuccessMsg("User successfully created.");
                setRegisterMode(false);
            }
        )
    }

    const loginRequest = () => {
        axiosExecutePost(
            login({
                userName: userName,
                password: password
            }),
            setLoading,
            setError,
            () => {
                history.push('/');
            }
        )
    }

    return (
        <>
            <Row className="justify-content-md-center" onKeyPress={onEnter}>
                <Col xs={12} sm={6} md={4} lg={3} className="mt-4">

                    <Card body>
                        <Image 
                            src="/key.png" 
                            style={{
                                width: "100%",
                                height: "100%",
                                padding: "20%"
                            }}
                        />


                        <BaseAlert variant="success" msg={succesMsg} close={() => setSuccessMsg("")} />
                        
                        <BaseAlert msg={error} close={() => setError("")} />


                        <Form>

                            <Form.Check 
                                type="switch"
                                label="Register mode"
                                checked={registerMode}
                                onChange={(e:any) => setRegisterMode(e.target.checked)}
                            />

                            <Form.Group
                                className="mt-2"
                            >
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={userName}
                                    onChange={(e: any) => setUserName(e.target.value)}
                                    name="name"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mt-2"
                            >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password"
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    name="password"
                                />
                            </Form.Group>

                            { registerMode &&
                                <Form.Group
                                    className="mt-2"
                                >
                                    <Form.Label>Role:</Form.Label>
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        value={roleToSelectOption(role, roleList)}
                                        onChange={handleSelectRole}
                                        options={roleList}
                                    />  
                                </Form.Group>
                            }

                            <div
                                className="d-flex flex-row-reverse"
                            >
                                <Button
                                    className="mt-4"
                                    onClick={registerMode ? registerRequest : loginRequest}       
                                    disabled={loading}                             
                                >
                                    {registerMode ? "Register" : "Connect"}
                                </Button>

                            </div>


                        </Form>

                            
                    </Card>

                </Col>

            </Row>
            

        </>
    );
}

export default LoginPage;