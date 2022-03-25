import React from 'react'
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom'
import './main.less'
import Login from './login'
import Admin from './admin'


export default function Main() {

  return (
   <Router>
       <Routes>
       <Route path='/' element={<Login/>} ></Route>
       <Route path='/admin' element={<Admin/>} ></Route>
       </Routes>
   </Router>
  )
}
