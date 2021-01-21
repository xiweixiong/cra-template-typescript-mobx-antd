import packageConfig from 'package.json'

const localStorage = window.localStorage

const read = () => {
  return JSON.parse(localStorage.getItem(packageConfig.name) || '{}')
}

const write = (data: any) => {
  localStorage.setItem(packageConfig.name, JSON.stringify(data))
}

const storage = {
  set(k: string, v: string | Record<string, unknown> | null | undefined) {
    let data = read()
    data[k] = v
    if (v === undefined || v === null || v === '') delete data[k]
    write(data)
  },
  get(k: string) {
    let data = read()
    const res = data[k]
    return res
  }
}

export default storage
