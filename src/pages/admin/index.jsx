import { Layout, Menu,Breadcrumb } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useState } from 'react';
import{Route,Routes,useNavigate} from 'react-router-dom'
import  AddArticle from '../../components/AddArticle'
import ArticleList from '../../components/ArticleList'
import UpdateArticle from '../../components/UpdateArticle'
import Reviews from '../../components/Reviews';
const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} =Menu

 const Admin = () => {
 const nav= useNavigate()
 const [collapsed,setCollapsed]  = useState(false)
 const [crumb,setCrumb]  = useState('添加文章')
 const text ={
    add:'添加文章',
    list:'文章管理',
    reviews:'留言管理',
    update:'修改文章',
    list:'文章列表',
 }
 const onCollapse= collapsed => {
    setCollapsed(collapsed)
  }
 const onChange = (e) => {
    setCrumb(text[e.key])
    nav('/admin/'+e.key)
 }
     return (
            <Layout style={{minHeight:'100vh'}}>
        <Sider
          collapsible collapsed={collapsed} onCollapse={onCollapse} 
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['add']}  onClick={onChange}>
            <Menu.Item key="add" icon={<VideoCameraOutlined />}>
            添加文章
            </Menu.Item>
            <SubMenu key="manage" icon={<UploadOutlined />} title='文章管理'>
              <Menu.Item key='update'>
               修改文章
              </Menu.Item>
              <Menu.Item key='list'>
                文章列表
              </Menu.Item>
            </SubMenu>
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
          {crumb}
          </Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: '0 16px 0' }}>
            <div className="layout-background" style={{ padding: 5, minHeight: 360 }}>
         
            <Routes>
              <Route path='' element={<AddArticle/>}></Route>
              <Route path='add' element={<AddArticle/>}></Route>
              <Route path='reviews' element={<Reviews/>}></Route>
              <Route path='list' element={<ArticleList/>}></Route>
              <Route path='update' element={<UpdateArticle/>}></Route>
            </Routes>
          
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
     )
 }
 export default Admin