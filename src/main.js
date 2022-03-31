import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import './main.less'
import Login from './pages/login'
import Admin from './pages/admin'
import Test from './pages/test'
import AddArticle from './components/AddArticle'
import ArticleList from './components/ArticleList'

export default function Main() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin'  element={<Admin/>} >
          <Route path='add' element={AddArticle}></Route>
          <Route path='list' element={ArticleList}></Route>
        </Route>
        <Route path='/test' name='kang' element={<Test />} />
      </Routes>
    </Router>
  )
}
