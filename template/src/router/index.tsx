import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import { AliveScope } from 'react-activation'
import Layout from '@/views/layout'

const HomeRouter = loadable(() => import('./module-home'))
/**constviews*/
// 上面的注释是cr-view-cli注入标识，不要删除

const Router: React.FC = () => {
  return (
    <AliveScope>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/home" component={HomeRouter} />
          {/**views*/}
          {/* 上面的注释是cr-view-cli注入标识，不要删除 */}
        </Switch>
      </Layout>
    </AliveScope>
  )
}

export default Router
