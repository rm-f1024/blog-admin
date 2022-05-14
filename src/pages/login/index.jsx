import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Input, Button, Spin, Space, message } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import {checkLogin} from '../../config/api/index'
import servicePath from '../../config/apiUrl'
import './index.less'
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false)
  const [password, setPW] = useState('')
  const [userName, setUN] = useState('')
  const handleSetPassword = (e) => {
    setPW(e.target.value)
  }
  const handleSetUserName = (e) => {
    setUN(e.target.value)
    console.log('e=============>',e)
  }
  const handleEnter =(event) => {
    if(event.keyCode==13){
      handleCheckLogin()
    }
  }
  const handleCheckLogin = async (e) => {
    setIsloading(true)
    if (userName === '') {
      message.warn('用户名不能为空')
      setTimeout(() => {
        setIsloading(false)
      }, 500);
      return false
    }
    if (password === '') {
      message.warn('密码不能为空')
      setTimeout(() => {
        setIsloading(false)
      }, 500);
      return false
    }
  
    // const response = await fetch(servicePath.checkLogin, {
    //   method: 'post',
    //   mode: 'cors',
    //   credentials: "include",
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(useObj)
    // })
    // let data = await response.json()
  const params=   new URLSearchParams()
  params.append('userName',userName)
  params.append('password',password)

    checkLogin(params).then((res) => {
      if(res){
        const {data,openId}= res
        if (openId===undefined) {
          message.warning(data)
          setTimeout(() => {
            setIsloading(false)
           }, 500);
        }
        else {
          message.success(data)
          localStorage.setItem('openId',openId)
          localStorage.setItem('isLogin',true)
          setTimeout(() => {
           setIsloading(false)
            navigate('/admin')
          }, 1000);
        }
      }
    })
   
  }

  return (
    <div className='content'>
      {/* <header>
     
    </header> */}
      <section>
        <Spin spinning={isLoading} size='large' tip='登录中....'>

          <Card size='default' title='博客后台' bordered={true} bodyStyle={{ width: '400', height: '300', textAlign: 'center' }} >
            <Space direction='vertical' size='large'>
              <Input    block='true' onChange={handleSetUserName} placeholder="Enter your username"
                prefix={<UserOutlined />}
                size={'large'}
              >
              </Input>
              <Input.Password   autoComplete='new-password' onKeyDown={handleEnter} onChange={handleSetPassword} block='true' placeholder="Enter your password"
                size={'large'}
                prefix={<KeyOutlined />}
              >
              </Input.Password>
              <Button onClick={handleCheckLogin} block='true' type='primary' size={'large'} >登录</Button>
            </Space>
          </Card>
        </Spin>
      </section>
    </div>
  )
}
