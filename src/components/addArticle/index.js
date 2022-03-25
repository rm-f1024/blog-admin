import React from 'react'
import { Row, Col, Input, Dropdown, Menu, Select } from 'antd'
import marked from 'marked'
import './index.less'
const { Search } = Input
const { Option } = Select

function addArticle() {
  const onSearch = () => {

  }
  const handleChange = () => {

  }
  return (
    <div>
      <Row gutter={5} align={'middle'} >
        <Col span={18} >
          <Row align='middle'>
            <Col>
              <Search
                placeholder="input search text"
                allowClear
                style={{ width: "20rem" }}
                size="middle"
                
                onSearch={onSearch}
              />
            </Col>
            <Col>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="all">所有</Option>
                <Option value="tools">工具</Option>
                <Option value="bug">踩坑</Option>
                <Option value="record">学习记录</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={6}>

        </Col>
      </Row>
    </div>
  )
}

const menu = (<Menu>
  <Menu.Item>
    1st menu item
  </Menu.Item>
  <Menu.Item  >
    2nd menu item (disabled)
  </Menu.Item>
  <Menu.Item >
    3rd menu item (disabled)
  </Menu.Item>
  <Menu.Item >
    a danger item
  </Menu.Item>
</Menu>)

export default addArticle