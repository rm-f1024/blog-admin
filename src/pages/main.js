import React, { Fragment } from 'react'
import { BrowserRouter as Router,  } from 'react-router-dom'
import './main.less'

import FrontendAuth  from  '../router/FrontendAuth '

export default function Main() {
 const routerConfig =[
   {
    path:'/',
    component:'Login',
    auth:false,
   },
   {
    path:'/admin*',
    component:'admin',
    auth:true,
   },
   {
    path:'/test',
    component:'HomePage',
    auth:true,
   },

  ]
  return (
    <Router >
      <FrontendAuth {...routerConfig} />
    </Router>
  )
}

