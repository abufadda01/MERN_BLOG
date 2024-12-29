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
import { isAuthenticated, logout } from './redux/slices/authSlice'
import LoadingSpinner from './components/Templates/LoadingSpinner'
import AuthRoute from './components/Templates/AuthRoute/AuthRoute'
import AuthCheckingComponent from './components/Templates/AuthCheckingComponent'
import GuestRoute from './components/Templates/AuthRoute/GuestRoute'
import { useGetUserMutation } from './redux/api/authApi'
import UserDashbaord from './components/User/UserDashboard'
import AccountSummaryDashboard from './components/Templates/AccountSummary'



const App = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth)

  const [getUser, getUserResponse] = useGetUserMutation()


  useEffect(() => {

    if (user.token && user.user === null) {
      getUser({ token: user?.token })
    }

  }, [user.token , user.user])



  useEffect(() => {

    if (!getUserResponse.isLoading && !getUserResponse.isUninitialized) {

      if (getUserResponse.isError) {

        dispatch(isAuthenticated({ user: null , token: null }))

      } else {

        dispatch(isAuthenticated({ user: { ...getUserResponse.data }, token: user.token }))

      }

    }

  }, [getUserResponse])




  if (getUserResponse.isLoading) {
    return <AuthCheckingComponent /> 
  }



  return (
    <Router>

      {user?.user ? <PrivateNavbar/> : <PublicNavbar/>}
      
      <Routes>

        <Route path='/' element={<AuthRoute><Home/></AuthRoute>}/>
        
        {/* nested routes */}
        <Route path='/dashboard' element={<AuthRoute><UserDashbaord/></AuthRoute>}>
    
          <Route path='' element={<AuthRoute><AccountSummaryDashboard /></AuthRoute>} />
          
          <Route path='create-post' element={<AuthRoute><CreatePost /></AuthRoute>} />
    
        </Route>

        
        <Route path='/list-posts' element={<AuthRoute><PostsList /></AuthRoute>} />
        
        <Route path='/post/:postId' element={<AuthRoute><SinglePost /></AuthRoute>} />
        
        <Route path='/update-post/:postId' element={<AuthRoute><UpdatePost /></AuthRoute>} />
        
        <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>} />

        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />

        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* <Route path='/post/:postId' element={<AuthRoute><UpdatePost/></AuthRoute>}/> */}

      </Routes>

    </Router>
  )
}

export default App