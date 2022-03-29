import { Layout, Menu,Breadcrumb } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useState } from 'react';
import{Route,Routes} from 'react-router-dom'
import  AddArticle from '../../components/AddArticle'
const { Header, Content, Footer, Sider } = Layout;

 const Admin = () => {

 const [collapsed,setCollapsed]  = useState(false)
 const [crumb,setCrumb]  = useState('添加文章')
 const text ={
    add:'添加文章',
    manage:'文章管理',
    reviews:'留言管理',
 }
 const onCollapse= collapsed => {
    setCollapsed(collapsed)
  }
 const onChange = (e) => {
    setCrumb(text[e.key])
 }
     return (
            <Layout style={{minHeight:'100vh'}}>
        <Sider
          collapsible collapsed={collapsed} onCollapse={onCollapse} 
         
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={onChange}>
         
            <Menu.Item key="add" icon={<VideoCameraOutlined />}>
            添加文章
            </Menu.Item>
            <Menu.Item key="manage" icon={<UploadOutlined />}>
            文章管理
            </Menu.Item>
            <Menu.Item key="reviews" icon={<UserOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout>
          <Header className="header-background" style={{ padding: 0 }} />
          <Breadcrumb style={{padding:'1rem'}}>
          <Breadcrumb.Item>
          <a href='/admin'>后台管理</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <a href='/admin/'>{crumb}</a>
          </Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: '0 16px 0' }}>
            <div className="layout-background" style={{ padding: 5, minHeight: 360 }}>
             <AddArticle />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
     )
 }
 export default Admin