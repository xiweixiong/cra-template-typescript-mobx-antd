interface EnvConfig {
  [key: string]: Config
}
interface BaseConfig {
  authKey: string
}

const baseConfig: BaseConfig = {
  authKey: ''
}

interface Config {
  apiHost: string
}

const envConfig: EnvConfig = {
  dev: {
    apiHost: ''
  },
  test: {
    apiHost: ''
  },
  prod: {
    apiHost: ''
  }
}

const envStr = process.env.REACT_APP_CONFIG_ENV || 'prod'
const envTarget = envConfig[envStr]
const config: Config & BaseConfig = { ...baseConfig, ...envTarget }
export default config
