import React from 'react'
import { BrowserRouter as Router,Route ,Routes,useNavigate} from 'react-router-dom'
import './main.less'
import Login from './login'
import Admin from './admin'
import Test from './test'

export default function Main() {
  
  return (
   <Router >
       <Routes>
       <Route path='/' element={<Login/>} ></Route>
       <Route path='/admin' name='kang' element={<Admin/>} ></Route>
       <Route path='/test' name='kang' element={<Test/>} ></Route>
       </Routes>
   </Router>
  )
}
