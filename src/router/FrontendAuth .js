import React from 'react'
import { Route, Routes, useLocation, useNavigate, Navigate, useRoutes } from 'react-router-dom'
import Login from '../pages/login'
import Admin from '../pages/admin'
import Test from '../pages/test'
import AddArticle from '../components/AddArticle'
import ArticleList from '../components/ArticleList'
import Reviews from '../components/Reviews';
import UpdateArticle from '../components/UpdateArticle';

const FrontendAuth = function (props) {
  console.log('FrontendAuth=============>', FrontendAuth)
  let isLogin = localStorage.getItem('isLogin')
  if (!isLogin) {
    return (<Routes>
      <Route path='/*' element={<Login />} />
    </Routes>)
  }

  const routeMap = [<Routes>
    <Route path='/' element={<Login />} />
    <Route path='/admin/*' element={<Admin />} >
      <Route path='add' element={AddArticle}></Route>
      <Route path='list' element={ArticleList}></Route>
      <Route path='reviews' element={Reviews}></Route>
      <Route path='update' element={UpdateArticle}></Route>
    </Route>
    <Route path='/test' name='kang' element={<Test />} />
  </Routes>]
  return (
    routeMap.map((item) => {

      return item
    })
  )
}
export default (FrontendAuth)
