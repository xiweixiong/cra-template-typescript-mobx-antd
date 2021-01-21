import React from 'react'
import { SiderWrapper } from './style'
import { Layout, Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { useHistory, useLocation } from 'react-router-dom'

import logo from '@/assets/images/logo.svg'

declare type SiderTheme = 'light' | 'dark'
interface LayoutSiderProps {
  menus: any
  /** 是否折叠 */
  collapsed: boolean
  /** 主题 */
  theme?: SiderTheme
}

/** 右侧折叠菜单 */
const LayoutSider: React.FC<LayoutSiderProps> = ({ menus, collapsed, theme = 'dark', ...props }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const openKey = React.useMemo(() => pathname.split('/').slice(0, -2).join('/'), [pathname])

  /**
   * 递归生成菜单
   * @param {Object} menu 菜单对象
   */
  const recursionMenu = (menu: any) => {
    const children = menus.filter((v: any) => v.pid === menu.id)
    if (children.length > 0) {
      return (
        <Menu.SubMenu key={menu.path} title={menu.name}>
          {children.map((v: any) => recursionMenu(v))}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={menu.path} title={menu.name}>
          {menu.name}
        </Menu.Item>
      )
    }
  }

  /** 菜单跳转 */
  const handleSelectMenu = (key: React.Key) => {
    history.push(key.toString())
  }

  return (
    <Layout.Sider width={200} trigger={null} collapsible theme={theme} collapsed={collapsed} {...props}>
      <SiderWrapper>
        <div className={`logo ${collapsed ? 'mini' : ''}`}>
          {collapsed && <img src={logo} alt="" />}
          {!collapsed && <img src={logo} alt="" />}
        </div>
        <div className="menu-wrapper">
          <Scrollbars autoHide>
            <Menu mode="inline" theme={theme} selectedKeys={[pathname]} defaultOpenKeys={[openKey]} onSelect={(e) => handleSelectMenu(e.key)}>
              {menus.filter((v) => v.pid === 0).map((v) => recursionMenu(v))}
            </Menu>
          </Scrollbars>
        </div>
      </SiderWrapper>
    </Layout.Sider>
  )
}

export default LayoutSider
