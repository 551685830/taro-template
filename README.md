# Taro 2.0 项目模版

> 说明：master 分支同步taro最新稳定版本更新，且会持续添加新功能，测试通过后会合并至release分支，当前版本基于taro 2.0；
> 基于 taro 1.0 的项目模板请前往 `release-1.0.0` 分支获取，[点此前往](https://github.com/cathe-zhang/taro_template/tree/release-1.0.0/)

## 导航

- [功能列表](#功能列表)
- [项目结构](#项目结构)
- [TODO](#TODO)
- [Setup](#Setup)
- [开发](#开发)
  - [新建页面](#新建页面)
    - [静态资源导入规范](#静态资源导入规范)
    - [类名规范](类名规范)
- [请求数据](#请求数据)
  - [创建service](#创建service)
  - [service文件设计规范](#service文件设计规范)
  - [直接调用service获取数据](#直接调用service获取数据)
  - [通过dva获取数据](#通过dva获取数据)
- [使用组件](#使用组件)
- [技术栈](#技术栈)
- [项目文档](#项目文档)

## 功能列表

- 基础功能支持
  - [x] TypeScript
  - [x] Sass，全局注入公用样式文件
  - [x] UI库（taro-ui）
  - [x] 状态管理（mobx）
  - [x] 异步编程（async/await）
  - [x] 引入字体（iconfont）
- 接口请求
  - [x] request类
  - [x] 拦截器
    - [x] url拦截器
    - [x] header拦截器
    - [x] data拦截器
  - [x] 开发环境本地代理
  - [x] jsonp支持
- 调试
  - [x] vconsole（h5环境）
- 工程化
  - [x] 全局变量
  - [x] 编译前操作
    - [x] 环境变量检查
    - [x] 扫描components文件夹生成入口文件
    - [x] 扫描pages文件夹生成路由列表及app.tsx文件
  - [x] 通过命令一键生成模版文件（页面、组件、样式、服务类、mobx状态管理）

    优化计划：
    - [x] 命令行交互获取文件名等参数
    - [ ] 命令行上下键可选择要生成的文件类型等操作
    - [ ] 迁移至taro-create-file 2.0版本(开发中)，使用npm引入
  - [ ] 接入taro模版源 http://taro-docs.jd.com/taro/docs/template.html
  - [x] 底层组件，用于页面和组件继承，实现类似vue原型绑定的功能
  - [ ] 引入自建组件库(taro-cui，适配taro2.0版本开发中)
  - [x] 引入自建工具类库（wtils）
- 组件
  - [x] image 图片组件 提供错误处理、loading过渡、查看大图等功能
  - [x] imgUploader 图片上传组件 基于image 提供上传图片、图片数量限制、删除图片、查看大图等功能
  - [x] paging 分页提示组件 将scrollerLoader, scrollerEndMessage合并成一个组件，减少判断
  - [x] card 卡片组件 提供圆角、阴影功能，可自定义类名、样式（圆角及内外边距）
  - [x] 基础弹窗组件，可选择弹窗位置，包括中间弹窗、底部弹窗，抛出关闭回调
  - [x] 倒计时组件，可自定义结束时间、自定义倒计时长、是否展示天，自定义item样式
  - [x] 按钮组件，可自定义类名、自定义宽高、背景色、圆角、positionType
  - [x] 缺省组件 可自定义图片、文字、宽高
- 工具类
  - [x] img.ts 图片处理类（如拼接url、预览等）
  - [x] mp.ts 小程序独有api封装（如检查更新）
  - [x] page.ts 页面工具类，实现获取页面路由、跳转等功能
  - [x] toast.ts loading/toast api封装简化
  - [x] formValidator.ts 表单验证
  - [x] meta.ts meta相关功能
  
## 后续功能及优化

- [x] 完善文件结构，实现1.0版本的所有功能
- [ ] Hooks重构
- [ ] 升级之后的README更新
- [ ] 根据2.0迁移指南进行优化 https://nervjs.github.io/taro/docs/migrate-to-2.html
- [ ] 组件使用外部样式类 https://nervjs.github.io/taro/docs/component-style.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB 
- [ ] render-props https://nervjs.github.io/taro/docs/render-props.html
- [ ] context https://nervjs.github.io/taro/docs/context.html
- [ ] 研究拦截器在每次发起request时执行的可行性

## 问题记录

### Taro升级问题

#### 使用 async/await 在小程序中报 `regeneratorRuntime is not defined`

原因：没有async await支持  

解决方案：

- https://nervjs.github.io/taro/docs/async-await.html#docsNav
- https://nervjs.github.io/taro/docs/migrate-to-2.html

### 其他

#### 小程序中无法识别类型声明独立文件的操作

解决方案：不将类型声明独立文件，此问题需要后续观察。

#### h5中 调用chooseImage，点击取消按钮无法不会进入 success fail complete中的任何一个回调

解决方案：loading放在success回调中 上传之前开始展示

## 优化

### taro-ui 样式引入

```scss
// app.scss

// 方式1: 一次性引入所有样式
@import '~taro-ui/dist/style/index.scss';

// 方式2: 在使用到新的组件时才引入
@import "~taro-ui/dist/style/components/noticeBar.scss";
@import "~taro-ui/dist/style/components/tag.scss"
```

对于上面的情况，如果在项目中只使用到了 taro-ui 中的 Button 和 Tag 组件，打包后的 app.css 体积从 210kb 减少到 53kb，只要打包后生成的app.css 文件小于210kb，那么这种引入方式就是值得的。

### 官方优化指南

- [最佳实践](https://nervjs.github.io/taro/docs/best-practice.html#%E7%BB%99%E7%BB%84%E4%BB%B6%E8%AE%BE%E7%BD%AE-defaultprops)

## 不想百度的操作

### 切换npm源 

  ```shell
  npm config set registry https://registry.npmjs.org/
  ```

## 项目结构

以下是项目结构的缩略图

![项目结构](./structure.png)

## Start

```zsh
# 获取模版
git clone https://github.com/cathe-zhang/taro_template.git
# 进入项目文件夹
cd taro_template
# 安装依赖
yarn
# 本地浏览器运行
yarn dev:h5
```

## 开发

### 编译命令

格式：

```shell
yarn <mode>:<platform>-<env>
```

`mode`，编译模式：

- dev 本地开发
- build 服务器部署

`platform`，编译目标平台

- mp 微信小程序
- h5 h5

`env`，环境配置标识，不同标识使用不同的环境配置，如接口host

- sit 测试环境
- uat 预发环境
- pro 生产环境
- 空  开发环境

示例：

```shell
yarn dev:mp  # 本地开发 小程序 开发环境
yarn dev:mp-sit  # 本地开发 小程序 测试环境
yarn build:mp   # 部署 小程序 开发环境
yarn build-mo-pro  # 部署 小程序 生产环境
```

### 新建文件

执行 `yarn template`, 根据指引即可快速创建文件，减少繁琐的新建文件操作，通过该命令可创建如下四种文件：

- 页面（同时生成对应的scss和ts类型生命文件）
- 组件（同时生成对应的scss文件）
- mobx模块
- service类

### 开发规范

#### 静态资源导入规范

  一个页面文件导入模块时应该按照如下规范：

  1. 先导入第三方模块，如第三方UI库等
  2. 再导入项目内部模块，如组件、工具类等
  3. 导入静态文件，图片在前，其他资源次之，样式文件最后

  示例：

  ```tsx
  // 导入第三方库
  import Taro, { Component, Config } from '@tarojs/taro'
  import { View, Text } from '@tarojs/components'
  import { connect } from '@tarojs/redux'
  import { ComponentClass } from 'react';

  // 导入项目内部模块
  import { IPageOwnProps, IPageState, IProps } from './index.itf'
  import Line from '~/components/Line'
  import Toast from '~/utils/toast'

  // 导入静态文件和样式
  import './index.scss'
  ```

#### 类名规范

- 页面容器应以模块-文件名-容器类型命名，如 home-index-page, line-comp 等

- 样式

```scss
// pages/home/index.scss
@import './../../styles/base.scss';

.index-page {
  background: $theme-color;
}
```

- 接口定义

```ts
// pages/home/index.itf.ts
/**
 * redux数据定义
 */
interface IPageStateProps {
  home: {
    exbitionData: {
      exhibition_list: Array<any>
    }
  },
  loading: {
    global: boolean;
  };
}

/**
 * 定义dispatch
 */
interface IPageDispatchProps {
  dispatch: (arg0: any) => any;
}

/**
 * 界面属性定义
 */
export interface IPageOwnProps { }

/**
 * 页面state定义
 */
export interface IPageState { }

/**
 * IProps
 */
export type IProps = IPageStateProps & IPageDispatchProps & IPageOwnProps;
```

### 请求数据

在页面中请求数据，需要先做一个判断：当前这个接口的数据需不需要跨页面共享，如果不需要，那么就没有必要经过dva，直接调用 service 即可；反之则需要定义 model , 在页面上发起 action, 走 dva 的流程。

#### 创建service

service, 也就是我们的服务模块，用于统一存放后端接口定义，供页面调用。

**`service`文件设计规范**

由于同一个接口被不同页面调用调用的可能性非常高，服务模块的结构需要依照后端接口来设计，如同时拥有 java 和 php 两个后端，那么 service 模块就要分成两个大的模块，大的模块下面再根据接口模块划分来划分小的 service 文件。

如一个接口路径为 `https://xxx.normal.com/web-mapi/account/queryBalanceAccount`, 用途是查询用户账户余额，那么这个接口在 service 模块的结构就应该表现为：

首先后台分为两个大的模块，下一层是后台的项目，最后根据后台接口模块命名一个 `xxx.service.ts`, xxx 是后台的模块名称。只要一个接口是在后台接口项目中的这个子模块，那么在前端就应该定义在相应的 service 文件下。

上面的示例接口设计结构如下：

```bash
├── services        服务根文件夹
|   ├── java        java
|       ├── web-mapi
|           ├── account.service.ts
|   ├── php         php
```

#### 直接调用service获取数据

```tsx
import MicangPhpService from '~/services/php/micang.php.service'

class Index extends Component {

  state = {}

  componentDidMount() {
    this.queryExhibitionData()
  }
  
  // 直接调用service
  async queryExhibitionData () {
    let result = await MicangPhpService.getExhibition({
      c_type: 1,
      pageindex: 1,
      pagesize: 10
    },)
    if ( +result.code === 0 ) {
      this.setState({
        exbitionData: result.data
      })
    }
  }

  render() {
    const { exbitionData } = this.state
    return (
      <View className='home-index-page'>
        {
          exbitionData.exhibition_list && exbitionData.exhibition_list.map((item,index)=>{
            return (
              <View>{item.now_time_str}</View>
            )
          })
        }
      </View>
    )
  }
}
```

#### 通过dva获取数据

##### 1. 定义 model

在 src/models 下新建文件:

```ts
// models/home.ts
import MicangPhpService from '~/services/php/micang.php.service'

export default {
  namespace: 'home',
  state: { exbitionData: {} },
  effects: {
    /**
     * 获取会场数据
     */
    *getExhibition({payload}, { call, put }) {
      const { code, data } = yield call(
        MicangPhpService.getExhibition.bind(MicangPhpService, payload)
      );
      if (data) {
        yield put({
          type: 'saveExhibitionData',
          payload: {
            data
          }
        });
      }
    }
  },
  reducers: {
    // 保存数据到redux
    saveExhibitionData(state, { payload }) {
      const { data } = payload;
      return { ...state,
        exbitionData: data
      };
    }
  }
};
```

##### 2. 在页面上发起 action

```tsx
// pages/home/index.tsx
import { connect } from '@tarojs/redux'

@connect(({ home }) => {
  return { home };
})
class Index extends Component {

  componentDidMount() {
    this.queryExhibitionData()
  }

  // 调用dva action请求数据
  queryExhibitionData () {
    this.props.dispatch({
      type: 'home/getExhibition',
      payload: {
        c_type: 1,
        pageindex: 1,
        pagesize: 10
      }
    })
  }

  render() {
    const { exbitionData } = this.props.home
    return (
      <View className='home-index-page'>
        {
          exbitionData.exhibition_list && exbitionData.exhibition_list.map((item,index)=>{
            return (
              <View>{item.now_time_str}</View>
            )
          })
        }
      </View>
    )
  }
}
```

### 使用组件

在业务开发的过程中，我们常需要复用一些相同的结构，如商品轮播图，订单item等，如果每个页面都复制粘贴一遍，不仅不美观，更难以维护，这时候就需要开发组件了。

组件分为展示型组件和容器型组件。展示型组件只需要接收父组件传递的属性并渲染页面，容器型组件则会涉及到数据处理等复杂的逻辑，难以重用，所以平常我们开发的一般都是展示型的组件。

#### 1. 定义组件

组件和页面不一样，我们不需要关心在整个应用层面的不同组件的逻辑关系，只需关注组件本身，所以不像 pages 目录下的文件结构，我们直接在 components 目录下新建文件即可。

最简单的组件，如一条分割线，组件代码如下：

```tsx
// components/Line.tsx
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

/**
 * 组件需要的Props定义
 */
interface IProps {
  height?: number; // 高度
  color?: string; // 颜色
}

export default class Line extends Component<IProps> {

  render() {
    return (
      <View
        style={{
          background: this.props.color || '#F5F5F5',
          height: `${Taro.pxTransform(this.props.height || 10)}`
        }}
      />
    );
  }
}
```

如果需要定义样式，在同级文件夹下新建 scss 文件并引入即可。

#### 2. 在页面中引用

```tsx
import Line from '~/components/Line'

class Index extends Component {

  render() {
    return (
      <View className='index-page'>
        <Text>Hello world!</Text>
        <Line height={1} color="#45aafa" />
      </View>
    )
  }
}
```

## 技术栈

- [taro](https://nervjs.github.io/taro/docs/README.html)
- [taro-ui](https://taro-ui.aotu.io/)
- [mobx](https://cn.mobx.js.org/)
- [typescript](https://www.tslang.cn/docs/handbook/basic-types.html)
- [scss](https://www.sass.hk/)

## 项目文档

- [常见问题记录](./problems.md)
