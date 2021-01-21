import { Button, Dropdown, Menu, Space, Spin, Table, Tooltip } from 'antd'
import React from 'react'
import { Wrapper } from './style'
import Icon, { ReloadOutlined } from '@ant-design/icons'

interface BoxTableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string
  extra?: React.ReactNode
  /** 数据加载状态 */
  loading?: boolean
  onReload?: () => void
  nobtn?: boolean
}

declare type SizeType = 'default' | 'middle' | 'small'

/** 列表页面统一Table父组件 */
const TableBox: React.FC<BoxTableProps> = ({ title, extra, loading = false, nobtn = false, onReload, children, ...props }) => {
  const [size, setSize] = React.useState<SizeType>('middle')

  const handleRefsh = () => {
    if (onReload) onReload()
  }

  const tableSvg = () => (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="column-height" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"></path>
    </svg>
  )

  const menu = (
    <Menu selectedKeys={[size]}>
      <Menu.Item key="default" onClick={() => setSize('default')}>
        默认
      </Menu.Item>
      <Menu.Item key="middle" onClick={() => setSize('middle')}>
        中等
      </Menu.Item>
      <Menu.Item key="small" onClick={() => setSize('small')}>
        紧凑
      </Menu.Item>
    </Menu>
  )

  return (
    <Wrapper {...props} className="box-table">
      {(title || extra || !nobtn) && (
        <div className="table-top">
          <span>{title}</span>
          <div className="extra">
            <Space>
              {extra}
              {!nobtn && (
                <Space>
                  {!!onReload && (
                    <Tooltip title="刷新表格">
                      <Button type="text" icon={<ReloadOutlined />} onClick={handleRefsh} />
                    </Tooltip>
                  )}
                  <Tooltip title="表格大小">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button type="text" icon={<Icon component={tableSvg} />} />
                    </Dropdown>
                  </Tooltip>
                </Space>
              )}
            </Space>
          </div>
        </div>
      )}
      <div className="table-content">
        <Spin spinning={loading}>
          <Table {...(children as any).props} size={size} />
        </Spin>
      </div>
    </Wrapper>
  )
}

export default TableBox
