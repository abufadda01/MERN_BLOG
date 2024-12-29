import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



const AuthRoute = ({children}) => {

  const token = useSelector((state) => state.auth.token)

  if (token) {
    return children 
  }
  
  return <Navigate to="/login"  replace/> 

}


export default AuthRoute