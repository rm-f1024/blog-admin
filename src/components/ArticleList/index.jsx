import React from 'react'
import { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Space, Spin, message } from 'antd';
import {getAllArticle,deleteArticle} from '../../config/api'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
function ArticleList() {
  const nav= useNavigate()
  const [listData,setListData]= useState([])
 useEffect(()=>{
  getAllArticle().then(res=>{
    if(res.data){
      let datas= res.data;
      datas.forEach((item,index,arr) => {
        item.key=index
     });
       setListData(datas)
    }
  })
 },[])
 


 const handleDel = (id) => {
    deleteArticle(id).then((res) => {
      if(res.data){
        console.log('res===============>',res)
        message.success(res.data)
        nav('/')
      }
    })
 }

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    width:'10rem',
  
    render: (text,record) => <Link to={`/admin/update?id=${record.id}`} >{text}</Link>,

  },
  {
    title: '文章类型',
    dataIndex: 'type',
    
  },
  {
    title: '文章简介',
    dataIndex: 'introduce',
  },
  {
    title: '文章内容',
    dataIndex: 'content',
    ellipsis: true,
  },
  {
    title: '发布状态',
    dataIndex: 'publish',
    align: 'center' ,
    render: tag => {
          let color = tag == 0 ? 'geekblue' : 'green';
          let text='已发布' 
          if(color=='geekblue'){
            text='未发布'
          }
           return <Tag color={color} key={tag}>
              {text}
            </Tag>
      }
  
  },
  {
    title: '发布时间',
    dataIndex: 'addtime',
    render:text=> moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '发布时间',
    dataIndex: 'update_time',
    render:text=> moment(text).format('YYYY-MM-DD HH:mm:ss')

  },
  {
    title:'阅读量',
    dataIndex:'read'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (text, record,index) => 
    {
      // console.log('text===============>',text)
      // console.log('record===============>',record.id)
      // console.log('index===============>',index)
   
      return  ( <Space size="middle">
      <a  onClick={()=>handleDel(record.id)}>Delete {record.id}</a>
    </Space>)
    }
    ,
  },
];
  return (
    <div>
<Table   bordered  pagination={{ position: ['bottomCenter'] }}  columns={columns} dataSource={listData} />
    </div>
  )
}

export default ArticleList