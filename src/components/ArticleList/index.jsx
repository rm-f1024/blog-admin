import React from 'react'
import { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Space, Spin } from 'antd';
import {getAllArticle} from '../../config/api'
import moment from 'moment'
function ArticleList() {
  const [listData,setListData]= useState([])
 useEffect(()=>{
  getAllArticle().then(res=>{
    if(res.data){
       setListData(res.data)
    }
  })
 },[])
 

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
    render:(text)=> moment(text.toString()).format('YYYY-MM-DD HH:mm:ss')
   
  },
  {
    title: '发布时间',
    dataIndex: 'update_time',
    render:(text)=> moment(text.toString()).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title:'阅读量',
    dataIndex:'read'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
  return (
    <div>
<Table   bordered  pagination={{ position: ['bottomCenter'] }}  columns={columns} dataSource={listData} />
    </div>
  )
}

export default ArticleList