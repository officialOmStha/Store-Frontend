import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRout = ({ children }) => {
    const accessToken = localStorage.getItem('access');

    if(!accessToken){
        return <Navigate to="/login"/>
    }
    return children;
}

export default PrivateRout