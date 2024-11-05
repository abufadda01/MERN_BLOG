import React from 'react'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import PublicNavbar from './components/Navbar/PublicNavbar'
import Home from './components/Home/Home'
import SinglePost from './components/Posts/SinglePost'
import UpdatePost from './components/Posts/UpdatePost'


const App = () => {
  return (
    <Router>

      <PublicNavbar/>

      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/create-post' element={<CreatePost/>}/>

        <Route path='/list-posts' element={<PostsList/>}/>

        <Route path='/post/:postId' element={<SinglePost/>}/>

        {/* <Route path='/post/:postId' element={<UpdatePost/>}/> */}

      </Routes>

    </Router>
  )
}

export default App