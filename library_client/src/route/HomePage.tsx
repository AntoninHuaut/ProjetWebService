import React from 'react';
import { Container, Row, Col } from "react-bootstrap";


const HomePage = () => {

    return (
        <>
            <Container>
                <Row 
                    className="p-4"
                >

                    <Col xs={6} md={3} className="p-4">
                        <img
                            src="/book_home_image.png"
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%"
                            }}
                            alt="React Bootstrap logo"
                        />
                    </Col>

                    <Col
                        className="p-4 align-middle text-center"                        
                    >
                        <h3>Welcome to the best book manager application ever created !</h3>

                        <p
                            className="pt-4"
                        >
                            This awesome application allow you to manage book borrow by using 3 different services, that's what 
                            make that application incredibly nice.
                        </p>
                    </Col>

                </Row>           
            </Container>

            <div className="fixed-bottom">
                <footer className="text-center text-lg-start bg-light text-muted">

                    <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                        © 2021 Copyright {' : '}
                        <a className="text-decoration-none text-reset fw-bold" href="https://www.linkedin.com/in/luc-audabram-50868017a/">AUDABRAM Luc</a>,
                        {' '}
                        <a className="text-decoration-none text-reset fw-bold" href="https://www.linkedin.com/in/quentinfon/">FONTAINE Quentin</a>,
                        {' '}
                        <a className="text-decoration-none text-reset fw-bold" href="https://www.linkedin.com/in/antonin-huaut/">HUAUT Antonin</a>
                    </div>

                </footer>
            </div>
        </>
    );
}

export default HomePage;