import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@/store'
import { useHistory } from 'react-router-dom'
import { Wrapper } from './style'
import { Typography } from 'antd'


/** WorkbenchMain 视图 */
const WorkbenchMain: React.FC = observer(() => {
  const history = useHistory()
  const { homeWorkbench } = useStore()

  return (
    <Wrapper className="page-container">
      <Typography.Title>hello word</Typography.Title>
    </Wrapper>
  )
})

export default WorkbenchMain