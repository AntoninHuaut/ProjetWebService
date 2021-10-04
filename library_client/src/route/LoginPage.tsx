import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

interface Props {

}

const LoginPage = ({

}: Props) => {

    const [registerMode, setRegisterMode] = useState<boolean>(false);

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <Row className="justify-content-md-center">
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
                                    onChange={(e: any) => setUserName(e.value)}
                                    name="name"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mt-2"
                            >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password"
                                    value={userName}
                                    onChange={(e: any) => setUserName(e.value)}
                                    name="name"
                                />
                            </Form.Group>

                        </Form>
                            
                        <div
                            className="d-flex flex-row-reverse"
                        >
                            <Button
                                className="mt-4"
                            >
                                {registerMode ? "Register" : "Connect"}
                            </Button>

                        </div>
                        
                    </Card>

                </Col>

            </Row>
            

        </>
    );
}

export default LoginPage;