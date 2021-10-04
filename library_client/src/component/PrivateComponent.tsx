import React from "react";
import { Redirect, Route } from "react-router";
import { User } from "../types/login";


const PrivateComponent = () => {
    
    let userStr = localStorage.getItem('user');
    
    let user: User | null = userStr !== "" && userStr !== null ? JSON.parse(userStr) : null;

    if(user === null || user.token === null || user.token === ""){
        return(
            <Redirect to="/login" />
        );
    }

    return (<></>);

}

export default PrivateComponent;