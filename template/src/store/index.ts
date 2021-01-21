import home from '@/views/module-home/mobx'
import common from './common'

/** mobx状态库 */
const store = {
  /** home 模块 mobx */
  ...home,
  /** 公共mobx */
  common,
}

/** mobx hooks */
export const useStore = () => {
  return store
}

export default store
