import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Select, Space, Button, DatePicker, Form, message } from 'antd'
import { DownCircleOutlined } from '@ant-design/icons'
import { marked } from 'marked'
import moment from 'moment'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import './index.less'
import { addArticle, updateArticle, publishArticle } from '../../config/api/index'
import servicePath from '../../config/apiUrl'
const { Option } = Select
const { TextArea } = Input
function AddArticle(prop) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [typeInfo, setTypeInfo] = useState([]) //简介的html内容
  const [form] = Form.useForm()
  const init = {
    title: '',
    ariticle: '',
    introduce: '',
    addtime: '',
    type_id: -1
  }
  useEffect(() => {
    getTypeInfo()
  }, [])
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  const getTypeInfo = async () => {
    let response = await fetch(servicePath.type, {
      method: 'get'
    })
    let data = await response.json()
    setTypeInfo(data.data)
  }
  const handleFinish = async (values) => {
    console.log('Received values of form: ', values);
    let param = new URLSearchParams()
    param.append('title', values['title'])
    let date = new Date(values['addtime']['_d']).getTime()
    param.append('addtime', moment(parseInt(date)).format('YYYY-MM-DD HH:mm:ss'))
    param.append('content', values['content'])
    param.append('introduce', values['introduce'])
    param.append('type_id', values['type_id'])
    if (articleId == 0) {
      addArticle(param).then((res) => {
        if (res.data) {
          message.success(res.data)
          setArticleId(res.insertId)
        }
      }).catch((err) => { console.log(err); })
    }
    else {
      param.append('id', articleId)
      updateArticle(param).then((res) => {
        if (res.data) {
          message.success(res.data)
        }
      }).catch((err) => { console.log(err); })
    }


    // let response =  await  fetch('http://localhost:7001/admin/article',{
    //     method:'post',
    //     headers:{
    //      'Content-Type':' application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body:param
    //   })
    //   let result = await response.json()
    //   message.success(result.data)
  }
  const handlePublish = () => {
    if (articleId === 0) {
      message.warn('请先暂存文章')
      return
    }
    let ojb = { ...form.getFieldsValue() }
    
    ojb.addtime = ojb.addtime.format('YYYY-MM-DD HH:mm:ss')
    console.log('addtime=============>',ojb.addtime)
    ojb.publish = 1
    ojb.id = articleId
    publishArticle(ojb).then((res) => {
      if (res.data !== null) {
        message.success(res.data)
        form.resetFields()
      }
    })
  }
  const validatorType = (_, value) => {
    console.log('value=============>', value)
    if (value === -1) {
      return Promise.reject(new Error('选择文章类型'))
    } else {
      return Promise.resolve()

    }
  }
  const onSearch = () => {
  }
  const handleChange = (value) => {
    console.log(value);
  }

  const handleTextChange = (e) => {
    setMarkdownContent(marked.parse(e.target.value))
  }
  const handleIntroduceChange = (e) => {
    console.log(e.target.value);
    setIntroducehtml(marked.parse(e.target.value))
  }
  return (
    <div>
      <Form form={form} onFinish={handleFinish} initialValues={init}>
        <Row gutter={5} className='add-article'>
          <Col span={18} >
            <Row >
              <Col span={20}>
                <Form.Item name='title'
                  rules={[{ required: true, message: 'Please input your title!' }]}
                >
                  <Input
                    prefix="文章标题"
                    placeholder="input search text"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name='type_id'
                  rules={[{ required: true, validator: validatorType }]}
                >
                  <Select style={{ width: 120 }} onChange={handleChange}>
                    <Option disabled value={-1} >{'选择类型'}</Option>
                    {typeInfo.length !== 0 ? typeInfo.map((option) => {
                      return <Option key={option.id} value={option.id} >{option.type_name}</Option>
                    }) : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10} style={{ padding: '1rem 0 0 0' }}>
              <Col span={12}>
                <Form.Item name='content'
                  rules={[{ required: true, message: 'Please input your article' }]}
                >
                  <TextArea onChange={handleTextChange} placeholder='文章内容' autoSize={{ minRows: 30, maxRows: 33 }} >
                  </TextArea>
                </Form.Item>
              </Col>

              <Col span={12}>
                <div className='hljs show-html ' dangerouslySetInnerHTML={{ __html: markdownContent }} placeholder='预览内容'  >
                </div>
                {/* <div className='marked-show html-content'  placeholder='预览内容'  >
              {markdownContent}
              </div> */}
              </Col>
            </Row>

          </Col>


          <Col span={6}>
            <Space size={'large'} direction='horizental' wrap='true'>
              <Button htmlType='submit' type='primary'>暂存文章</Button>
              <Button onClick={() => { handlePublish() }}>发布文章</Button>
            </Space>
            <br />
            <br />
            <Form.Item name='introduce'
              rules={[{ required: true, message: 'please input your introduce' }]}
            >

              <TextArea onChange={handleIntroduceChange} allowClear showCount autoSize={{ minRows: 6, maxRows: 8 }} placeholder='文章简介'>
              </TextArea>

            </Form.Item>
            <br />
            <div className='introduce-html' dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
            <br />
            <Form.Item name='addtime'
              rules={[{ required: true, message: 'please select your addtime' }]}
            >
              <DatePicker size='large' placeholder='发布日期' />
            </Form.Item>
            <DatePicker size='large' placeholder='修改日期' />

          </Col>
        </Row>
      </Form>
    </div>
  )
}



export default AddArticle