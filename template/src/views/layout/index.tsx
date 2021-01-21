import React from 'react'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'
import { Wrapper, GlobalStyle } from './style'
import { Layout, Tabs } from 'antd'
import { useAliveController } from 'react-activation'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useStore } from '@/store'
import _ from 'lodash'
import menus from '@/menu.json'

import LayoutHeader from './layout-header'
import LayoutSider from './layout-sider'

/** 布局页面 */
const LayoutView: React.FC = observer(({ children }) => {
  const history = useHistory()
  const { common } = useStore()
  const { pathname } = useLocation()
  const { getCachingNodes, drop } = useAliveController()
  const cachingNodes = getCachingNodes()

  const [collapsed, setCollapsed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  /** 初始化应用程序数据 */
  const initAppData = React.useCallback(async () => {
    setLoading(true)
    // 初始化一些基础数据，可以写在这里
    // common...
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  React.useEffect(() => {
    initAppData()
  }, [])

  /** 选项卡切换 */
  const handleTabChange = (key: string) => {
    history.push(key)
  }

  /** 关闭页面选项卡 */
  const handleRemove = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const list = getCachingNodes()
      const tab = list.find((v) => v.name === targetKey)
      if (tab) {
        // 如果是关闭当前路由页面，则选取缓存中最后一个页面
        if (tab.name === pathname) {
          const last = _.last(list.filter((v) => v.name !== tab.name))
          history.replace(last.name)
        }
        setTimeout(() => {
          drop(tab.name)
        }, 100)
      }
    }
  }

  return (
    <Wrapper>
      <GlobalStyle />
      
      <LayoutSider menus={menus} collapsed={collapsed} />
      <Layout className="layout-main">
        <LayoutHeader collapsed={collapsed} onChange={() => setCollapsed(!collapsed)} />
        <Layout.Content>
          <Tabs type="editable-card" activeKey={pathname} onChange={handleTabChange} onEdit={handleRemove} hideAdd>
            {cachingNodes.map((v, i) => {
              const menu = menus.find((m) => m.path === v.name)
              return <Tabs.TabPane tab={menu?.name} key={v.name} closable={i > 0} closeIcon={<CloseCircleOutlined />} />
            })}
          </Tabs>
          {children}
        </Layout.Content>
      </Layout>
    </Wrapper>
  )
})

export default LayoutView
