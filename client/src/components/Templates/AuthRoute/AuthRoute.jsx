import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AuthRoute = ({children}) => {

    const {user : loggedUser} = useSelector((state) => state.auth)

    if(!loggedUser){
        return <Navigate to="/login"/>
    }

    return children 
}


export default AuthRoute