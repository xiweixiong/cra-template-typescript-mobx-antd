import React from 'react'
// import { ColProps } from 'antd/lib/grid'
import { FormInstance, FormItemProps } from 'antd/lib/form'
import { Form, Button, Row, Col, Space } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Wrapper } from './style'
import _ from 'lodash'

interface SearchBoxProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /** label宽度，默认120px */
  labelWidth?: number
  /** 是否默认展开，默认false */
  defaultOpen?: boolean
  /** 搜索内容初始值对象 */
  initialValues?: Record<string, unknown>
  /** 表单实例 */
  form?: FormInstance
  /** 不显示按钮组 */
  nobtn?: boolean
  /** 搜索按钮回调 */
  onSearch?: () => void
  /** 搜索按钮状态 */
  isSearching?: boolean
}

/** 搜索框组件 */
const BoxSearch = React.forwardRef<FormInstance, SearchBoxProps>(({ onSearch, isSearching, children, initialValues, form, labelWidth = 120, defaultOpen = false, nobtn = false, ...props }, ref) => {
  const [newform] = Form.useForm()
  const column = React.useMemo(() => (document.body.clientWidth >= 1600 ? 4 : 3), [])
  const row = React.useMemo(() => (children instanceof Array ? Math.ceil((children.length + 1) / column) : 1), [column, children])
  const hasRow = React.useMemo(() => row > 1, [row])
  const contentHeight = React.useMemo(() => row * 48 + 16, [row])
  const formIns = React.useMemo(() => (form ? form : newform), [form, newform])

  const [open, setOpen] = React.useState(!!defaultOpen)

  const reset = React.useCallback(() => {
    formIns.resetFields()
    formIns.submit()
  }, [formIns, onSearch])

  const offset = React.useMemo(() => {
    if (!_.isArray(children)) return 0
    if (!open) return 0
    return (column - (children.length % column) - 1) * (24 / column)
  }, [column, children, open])

  const align = React.useMemo(() => {
    if (!_.isArray(children)) return 'left'
    return children.length + 1 >= column ? 'right' : 'left'
  }, [column, children])

  const span = React.useMemo(() => 24 / column, [column])

  return (
    <Wrapper {...props} labelWidth={labelWidth} hasRow={hasRow} isOpen={open} contentHeight={contentHeight}>
      <Form form={formIns} ref={ref} initialValues={initialValues} labelAlign="right" onFinish={onSearch}>
        <Row gutter={24}>
          {_.isArray(children) &&
            children.map((v, i) => {
              const isHide = open ? false : i >= column - 1
              return <BoxSearchItem {...(v as any).props} key={`BoxSearchItem-${i}`} style={{ display: isHide ? 'none' : '' }} />
            })}
          {!_.isArray(children) && children}
          {!nobtn && (
            <Col span={span} offset={offset} key="box-search-button-group" style={{ textAlign: align }}>
              <Form.Item label="">
                <Space>
                  <Button type="primary" htmlType="submit" loading={isSearching} children="搜索" />
                  <Button onClick={reset}>重置</Button>
                  {hasRow && (
                    <Button type="link" icon={<CaretDownOutlined rotate={open ? -180 : 0} />} onClick={() => setOpen(!open)}>
                      {open ? '收起' : '更多'}条件
                    </Button>
                  )}
                </Space>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Wrapper>
  )
})

interface BoxSearchItemProps extends FormItemProps {
  span?: number
}

/** 搜索框Item */
export const BoxSearchItem: React.FC<BoxSearchItemProps> = ({ span, style, children, ...props }) => {
  const column = React.useMemo(() => (document.body.clientWidth >= 1600 ? 4 : 3), [])
  const calcSpan = React.useMemo(() => 24 / column, [column])

  return (
    <Col span={span || calcSpan} style={style}>
      <Form.Item {...props} children={children} />
    </Col>
  )
}

export default BoxSearch
