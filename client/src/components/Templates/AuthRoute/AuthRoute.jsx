import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { checkAuthStatusAPI } from '../../../services/users/usersApi'
import AuthCheckingComponent from '../AuthCheckingComponent'
import { isAuthenticated } from '../../../redux/slices/authSlice'


const AuthRoute = ({children}) => {

    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children 
}


export default AuthRoute