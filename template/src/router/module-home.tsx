import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import KeepAlive from 'react-activation'

// 页面路由
const WorkbenchMainView = loadable(() => import('@/views/module-home/workbench/main'))
/**constviews*/

const HomeRouter: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${path}/workbench/main`} />
      </Route>

      <Route path={`${path}/workbench/main`}><KeepAlive name={`${path}/workbench/main`}><WorkbenchMainView /></KeepAlive></Route>
      {/**views*/}
    </Switch>
  )
}

export default HomeRouter
