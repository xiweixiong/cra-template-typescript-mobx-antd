# CRA项目模板

按自己的习惯，基于 CRA 的 TypeScript 创建的模板项目，替换react-scripts为craco

UI框架：antd@^4.9.3

请求：axios@^0.21.0 (src/utils/request.ts)

状态共享：mobx@^5.15.7 mobx-react@^6.3.1

样式：styled-components@^5.2.1 (less是预留antd切换主题功能，其他的样式都是用styled-components)

基本上该整合的都有了，创建后就可以直接开始开发

主要目的是自用，有需要的可以安装后自行修改，也可以结合我的`cr-view-cli`脚手架直接开发

## 安装

```bash
npx create-react-app my-app --template typescript-mobx-antd

# or

yarn create-react-app my-app --template typescript-mobx-antd
```

## 目录结构

```
├── pont-template   // pont模板文件，不需要可删除
├── public
├── src
│   ├── assets      // 资源文件夹
│   ├── components  // 项目级自定义组件
│   ├── config      // api配置文件
│   ├── router      // 项目路由
│   ├── store       // 状态共享商店，基于mobx
│   ├── themes      // 主题配置
│   ├── utils       // 工具库
│   ├── services          // pont自动生成的接口请求和Typescript实体类
│   ├── services-other    // 第三方api请求，仿照pont生成的请求写
│   ├── views       // 视图文件夹
│   ├── App.tsx     // 路由入口文件
│   └── index.tsx   // 项目入口文件
├── .eslintignore         // eslint 忽略文件
├── .eslintrc             // eslint 配置文件，整合的常用的配置，根据需求自行增加或修改
├── .prettierignore       // prettier 忽略文件
├── .prettierrc           // prettier 格式化配置文件
├── craco.config.js       // craco配置文件
├── pont-config.json      // pont配置文件，不需要可删除
├── README.md
├── package.json
├── tsconfig.json         // ts配置文件
└── tsconfig.paths.json   // ts别名扩展配置文件
```

## `cr-view-cli` 使用脚手架创建视图文件

### 安装

```bash
// npm
npm i -g cr-view-cli

// 或yarn
yarn global add cr-view-cli
```

### 命令 

创建视图 

```bash
crview view <moduleName> <packageName> <viewName>
```

创建一个视图，参数为 required:`moduleName` required:`packageName` required:`viewName`  
具体命令例如：`crview view system role list`

规范：  
moduleName： `只能`是单个英文单词  
packageName： 可以为多个英文单词组合，全小写，单词之间以`-`分割，例如：user-manage、wechat-user-manage  
viewName： 定为表达视图实际意义的英文单词，尽量为单个因为单词，如：list、detail、add、edit 等

执行命令会自动创建如下文件结构：

```
├── src
│   ├── views
│       ├── module-system           // 模块文件夹(存在就不创建)
│           ├── role                // 功能文件夹(存在就不创建)
│               ├── list            // 页面文件夹
│                   ├── index.tsx   // 视图文件
│                   ├── style.ts    // 视图样式文件
│               ├── mobx.ts         // 功能mobx库，功能下面的多个视图共享一个mobx库(存在就不创建)
│           ├── mobx.ts             // 模块mobx文件，只是导出模块下所有mobx(存在就不创建)
```