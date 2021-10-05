import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
    msg: string,
    close: () => any,
    variant?: string
};

const BaseAlert = ({
    msg,
    close,
    variant = "danger"
}: Props) => {

    return (
        <>
            {msg !== "" ?

                <Alert variant={variant} onClose={close} dismissible>
                    {msg}
                </Alert>

                :

                <></>
            }
        </>
    );
};

export default BaseAlert;