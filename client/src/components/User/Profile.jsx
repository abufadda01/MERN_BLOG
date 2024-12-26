import React, { useEffect } from 'react'
import { checkAuthStatusAPI } from '../../services/users/usersApi'
import { useQuery } from '@tanstack/react-query'
import {useDispatch} from "react-redux"
import { isAuthenticated } from '../../redux/slices/authSlice'



const Profile = () => {
    
    const dispatch = useDispatch()

    const {data : user , isLoading} = useQuery({
        queryKey : ["user-auth"],
        queryFn : checkAuthStatusAPI
    })
    
    useEffect(() => {
        dispatch(isAuthenticated(user))
    } , [user])




  return (
    <div>Profile</div>
  )
}

export default Profile