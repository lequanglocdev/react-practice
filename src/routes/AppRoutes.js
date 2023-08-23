import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import TableUsers from '../components/TableUsers';
import Home from '../components/Home'
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';
const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                {/* <PrivateRoutes path="/users" >
                    <TableUsers />
                </PrivateRoutes> */}

                <Route
                    path="/users"
                    element={
                        <PrivateRoutes >
                            <TableUsers />
                        </PrivateRoutes>
                    }
                />
            </Routes>

        </div>
    )
}

export default AppRoutes
