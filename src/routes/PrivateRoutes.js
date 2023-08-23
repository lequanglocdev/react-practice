import { Routes, Route } from "react-router-dom";

import React from 'react'
import { useContext } from "react";
import { UserContext } from "../context/UserContext"
import { Alert } from "react-bootstrap";
const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext)

    if (user && !user.auth) {
        return <>

            <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permisson to acess this route
                </p>
            </Alert>
        </>
    }

    return (
        <div>
            {props.children}
        </div>
    )
}

export default PrivateRoutes
