
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
const PrivateRoutes = (props) => {
    const user = useSelector(state => state.user.acount)

    if (user && !user.auth) {
        return <>

            <Alert variant="danger" className='mt-3'>
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
