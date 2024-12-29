import React, { useEffect } from 'react'
import { checkAuthStatusAPI } from '../../services/users/usersApi'
import { useQuery } from '@tanstack/react-query'
import {useDispatch} from "react-redux"
import { isAuthenticated } from '../../redux/slices/authSlice'



const Profile = () => {

  return (
    <div>Profile</div>
  )
}

export default Profile