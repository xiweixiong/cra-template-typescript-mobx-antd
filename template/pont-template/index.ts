import * as Pont from 'pont-engine'
import { CodeGenerator, Interface } from 'pont-engine'

export class FileStructures extends Pont.FileStructures {}
export default class MyGenerator extends CodeGenerator {
  getInterfaceContent(inter: Interface) {
    const bodyParmas = inter.getBodyParamsCode()

    const queryParamsType = 'IQueryParams'
    const queryParamsTmp = `queryParams:${queryParamsType}`
    const bodyParamsTmp = `bodyParams:${bodyParmas}`
    const paramsInterfaceTmp = `
      interface IParams {
        ${queryParamsTmp}
        ${bodyParmas ? bodyParamsTmp : ''}
      }
    `
    const requestParams = bodyParmas ? `{queryParams,bodyParams}` : `{queryParams}`

    const lowerCase = (str: string) => {
      return str.slice(0, 1).toLowerCase() + str.slice(1)
    }

    return `
    import request from '@/utils/request'
    ${this.dataSource.name === 'file' ? `import config from '@/config'` : ''}

    export ${inter.getParamsCode(queryParamsType)}
    export ${paramsInterfaceTmp}

    /**
     * @desc ${inter.description}
     */
    export function ${lowerCase(inter.name)}(${requestParams}: IParams = {} as IParams) {
      return request({
        url: \`${inter.path}\`,
        method: '${inter.method}',
        params: queryParams,
        ${bodyParmas ? 'body: bodyParams' : ''}
      }${this.dataSource.name === 'file' ? `, config.resourceHost` : ''}) as Promise<${inter.responseType}>
    }
   `
  }
}
