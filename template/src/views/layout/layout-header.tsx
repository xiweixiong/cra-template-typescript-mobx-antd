import React from 'react'
import { observer } from 'mobx-react'
import { HeaderWrapper } from './style'
import { Avatar, Dropdown, Menu, Space, Modal } from 'antd'
import { DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, EditOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons'
import { useStore } from '@/store'

export interface LayoutHeaderProps {
  collapsed: boolean
  onChange?: () => void
}

const LayoutHeader: React.FC<LayoutHeaderProps> = observer(({ collapsed, onChange }) => {
  const { common } = useStore()


  /** 退出登录 */
  const handleLogout = () => {
    Modal.confirm({
      title: '退出登录',
      content: '是否确认退出登录？',
      onOk: () => {
        // 调用退出登录方法
      },
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={() => {}}>
        <TeamOutlined /> 个人信息
      </Menu.Item>
      <Menu.Item key="0" onClick={() => {}}>
        <EditOutlined /> 修改密码
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        <LogoutOutlined /> 退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <HeaderWrapper>
      <div className="header-info">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: onChange,
        })}
      </div>
      <div className="header-actions">
        <Dropdown overlay={menu}>
          <a href=":;" onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span>管理员</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </HeaderWrapper>
  )
})

export default LayoutHeader
