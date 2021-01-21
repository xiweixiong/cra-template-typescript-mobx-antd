import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import storage from '@/utils/storage'
import config from '@/config'

interface AuthRouteProps extends RouteProps {}

/**
 * 鉴权路由
 * @param props RouteProps
 */
const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  // 这里做权限验证
  const authorization = storage.get(config.authKey)
  if (true) {
    return <Route {...props} />
  } else {
    return <Redirect to={{ pathname: '/login' }} />
  }
}

export default AuthRoute
