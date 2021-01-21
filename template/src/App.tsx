import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRouter from '@/components/private-route'
import loadable from '@loadable/component'

const MainRouter = loadable(() => import('@/router'))
const Login = loadable(() => import('@/views/login'))

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRouter path="/" component={MainRouter} />
    </Switch>
  )
}

export default App
