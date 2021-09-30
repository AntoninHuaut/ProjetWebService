import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
    error: string,
    close: () => any
};

const BaseErrorAlert = ({
    error,
    close
}: Props) => {

    return (
        <>
            {error !== "" ?

                <Alert variant="danger" onClose={close} dismissible>
                    {error}
                </Alert>

                :

                <></>
            }
        </>
    );
};

export default BaseErrorAlert;