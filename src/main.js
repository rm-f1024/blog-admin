import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import './main.less'
import Login from './pages/login'
import Admin from './pages/admin'
import Test from './pages/test'
import AddArticle from './components/AddArticle'
import ArticleList from './components/ArticleList'
import Reviews from './components/Reviews';
import UpdateArticle from './components/UpdateArticle';

export default function Main() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin/*'  element={<Admin/>} >
          <Route path='add' element={AddArticle}></Route>
          <Route path='list' element={ArticleList}></Route>
          <Route path='reviews' element={Reviews}></Route>
          <Route path='update' element={UpdateArticle}></Route>
        </Route>
        <Route path='/test' name='kang' element={<Test />} />
      </Routes>
    </Router>
  )
}
