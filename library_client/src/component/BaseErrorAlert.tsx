import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
    error: string
};

const BaseErrorAlert = ({
    error
}: Props) => {

    return (
        <>
            {error !== "" ?

                <Alert variant="danger">
                    {error}
                </Alert>

                :

                <></>
            }
        </>
    );
};

export default BaseErrorAlert;