import React, { useState } from 'react'
import {Card,Input,Icon,Button,Spin,Space}from 'antd'
import { KeyOutlined , UserOutlined } from '@ant-design/icons';
import './index.less'
export default function Login() {
  const [isLoading,setIsloading] = useState(false)

  return (
    <div className='content'>
    {/* <header>
     
    </header> */}
     <section  >
     <Spin  spinning={isLoading} size='large'  tip='登录中....'>

       <Card  size ='default'  title='博客后台' bordered={true}  hoverable ='true' bodyStyle={{width:'400',height:'300' ,textAlign:'center'}} >
       <Space    direction='vertical' size='large'>
     <Input  block='true' placeholder="Enter your username" 
       prefix={<UserOutlined/>}
       size={'large'}
       >
       </Input>
       <Input.Password  block='true' placeholder="Enter your password" 
        size={'large'}
         prefix={<KeyOutlined />}
         >
       </Input.Password>
       <Button block='true' type='primary' size={'large'} >登录</Button>
       </Space>
  
       </Card>
    
     </Spin>
     </section>
     </div>
  )
}
