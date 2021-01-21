import axios, { AxiosRequestConfig } from 'axios'
import config from '@/config'
import storage from '@/utils/storage'
import qs from 'qs'
import history from './history'

type ReauestOptions = AxiosRequestConfig & {
  url: string
  body?: any
  headers?: any
}

// const errorMsg = '报告！服务器出了点小问题，稍后再试试...'

axios.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error) => {
    const { response } = error
    // 以下响应状态根据后端接口修改
    if (response) {
      if (response.status === 401) {
        // Toast.show('登录失效，请重新登录')
        history.replace('/login')
        return { code: 500, message: '登录失效，请重新登录' }
      }
      const errorMsg = response.data?.message || '报告！服务器出了点小问题，稍后再试试...'
      // Toast.show(errorMsg)
      return { code: 500, message: errorMsg }
    }
    // 请求超时
    if (error.code === 'ECONNABORTED') {
      const msg = '请求超时，请稍后再试'
      // Toast.show(msg)
      return { code: 500, message: msg }
    }
    // 默认错误提示
    const msg = '您的网络出现问题，请检查网络重试'
    // Toast.show(msg)
    return { code: 500, message: msg }
  }
)

export default async function request({ url, body = {}, headers = {}, ...options }: ReauestOptions, host?: string) {
  const h = host ?? config.apiHost
  const newOptions = {
    ...options,
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    validateStatus: (status: any) => {
      return status >= 200 && status < 300
    },
    headers: {
      ...headers,
      Authorization: storage.get(config.authKey)
    },
    url: h + url,
    timeout: 3000,
    withCredentials: true,
    data: body
  }
  return axios(newOptions) as Promise<any>
}
