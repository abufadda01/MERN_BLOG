import React, { useEffect } from 'react'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import {BrowserRouter as Router , Routes , Route, Navigate} from "react-router-dom"
import PublicNavbar from './components/Navbar/PublicNavbar'
import PrivateNavbar from './components/Navbar/PrivateNavbar'
import Home from './components/Home/Home'
import SinglePost from './components/Posts/SinglePost'
import UpdatePost from './components/Posts/UpdatePost'
import Login from './components/User/Login'
import Register from './components/User/Register'
import Profile from './components/User/Profile'
import {useDispatch , useSelector} from "react-redux"
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatusAPI } from './services/users/usersApi'
import { isAuthenticated, logout } from './redux/slices/authSlice'
import LoadingSpinner from './components/Templates/LoadingSpinner'
import AuthRoute from './components/Templates/AuthRoute/AuthRoute'
import AuthCheckingComponent from './components/Templates/AuthCheckingComponent'



const App = () => {

  const dispatch = useDispatch()

  const {data : user , isLoading } = useQuery({
    queryKey : ["user-auth"],
    queryFn : checkAuthStatusAPI ,
    onSuccess: (data) => dispatch(isAuthenticated(data)), 
    onError: () => dispatch(logout()), 
  })
  
  useEffect(() => {
    if (user) {
      dispatch(isAuthenticated(user));
    }
  }, [user, dispatch])

  
  const {user : loggedUser} = useSelector((state) => state.auth)


  // if(isLoading) return <AuthCheckingComponent/>


  
  return (
    <Router>

      {loggedUser ? <PrivateNavbar/> : <PublicNavbar/> }
      
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/create-post' element={<AuthRoute><CreatePost/></AuthRoute> }/>

        <Route path='/list-posts' element={<PostsList/>}/>

        <Route path='/post/:postId' element={<SinglePost/>}/>

        <Route path='/login' element={!loggedUser ? <Login/> : <Navigate to={"/"}/>}/>

        <Route path='/register' element={!loggedUser ? <Register/> : <Navigate to={"/"}/>}/>

        <Route path='/profile' element={<AuthRoute><Profile/></AuthRoute>}/>
 
        {/* <Route path='/post/:postId' element={<UpdatePost/>}/> */}

      </Routes>

    </Router>
  )
}

export default App