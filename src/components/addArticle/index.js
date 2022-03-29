import React, { useEffect,useState } from 'react'
import { Row, Col, Input, Select, Space, Button, DatePicker } from 'antd'
import { DownCircleOutlined } from '@ant-design/icons'
import {marked} from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import './index.less'
import servicePath from '../../config/apiUrl'
const { Option } = Select
const { TextArea } = Input
function AddArticle(prop) {
console.log('prop=============>',prop)
  useEffect(() => {
    getTypeInfo()
  },[])
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别
  marked.setOptions({
    renderer:  new marked.Renderer(),
    highlight: function(code) {
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
    
    //  useEffect(() => {

    //  },[articleContent])

    async function getTypeInfo() {
    let response= await fetch(servicePath.type,{
    method:'get'
   })
     let data = await response.json()
     setTypeInfo(data.data)
  }

  
 const onSearch = () => {

  }
  const handleChange = () => {

  }
  const handleCache = () => {}
  const handleTextChange= (e) => {
    setMarkdownContent(marked.parse(e.target.value))
  }
  const handleIntroduceChange= (e) => {
    console.log(e.target.value);
    setIntroducehtml(marked.parse(e.target.value))
  }
  return (
    <div>
      <Row gutter={5}  className='add-article'>
     
      <Col span={18} >
          <Row >
            <Col span={20}>
              <Input
              prefix="文章标题"
                placeholder="input search text"
                allowClear
              />

            </Col>
            <Col span={4}>
              <Select defaultValue="选择类别" style={{ width: 120 }} onChange={handleChange}>
                {/* <Option value="all">所有</Option>
                <Option value="tools">工具</Option>
                <Option value="bug">踩坑</Option>
                <Option value="record">学习记录</Option> */}
                {typeInfo.length!==0 ? typeInfo.map((option) => {
                  return  <Option key={option.id} value={option.type_name}></Option>
                }):''}
              </Select>
            </Col>
          </Row>

          <Row gutter={10} style={{padding:'1rem 0 0 0'}}>
            <Col span={12}>
              <TextArea  onChange={handleTextChange}  placeholder='文章内容' autoSize={{ minRows: 30, maxRows: 33 }} >

              </TextArea>
            </Col>

            <Col span={12}>
              <div className='hljs show-html '  dangerouslySetInnerHTML={{__html:markdownContent}}  placeholder='预览内容'  >
              </div>
              {/* <div className='marked-show html-content'  placeholder='预览内容'  >
              {markdownContent}
              </div> */}
            </Col>
          </Row>

        </Col>
     

        <Col span={6}>
           <Space  size={'large'} direction='horizental' wrap='true'>
           <Button onClick={()=>{handleCache()}}>暂存文章</Button>
            <Button  type='primary' >发布文章</Button>
           </Space>
           <br/>
         <br/>
           <TextArea  onChange={handleIntroduceChange}  allowClear  showCount  autoSize={{minRows:6 ,maxRows: 8}}  placeholder='文章简介'>
             
           </TextArea>
           <br/>
           <div className='introduce-html' dangerouslySetInnerHTML={{__html:introducehtml}}></div>
           <br/>
           <DatePicker size='large' placeholder='发布日期'/>
           <DatePicker size='large'  placeholder='修改日期'/>
         
        </Col>
      </Row>
    </div>
  )
}



export default AddArticle