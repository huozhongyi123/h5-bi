# H5 BI

十荟团看板，运行在公众号上

## Project Struct

- 使用 [Next.js](https://nextjs.org/) 框架开发。部署时不适用 SSR 功能，通过 `export` 导出静态资源
- 使用 [SWR](https://github.com/zeit/swr) 请求库
- 使用 [tailwindcss](https://tailwindcss.com/) CSS 框架
- 使用 [Feather](https://feathericons.com) 的 icons
- 项目采用的 `tailwindcss`，我们尽量的有限使用 class first 的方式。
- [API Docs](http://10.2.4.49:30250/swagger-ui.html?urls.primaryName=看板统计API)

## Note

- Pin "@antv/f2": "3.5" 上游版本有 BUG

## 环境变量

不用修改 `.env` `.env.development` 文件，创建 `.env.development.local` 文件，指定环境变量即可。

[Next.js Docs](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables)

- API_ROOT 制定接口地址

## 部署

项目已纯静态方式部署到，大数据服务器那边。

- 项目源码依然托管在 GitHub 上，但是每次发版的时候，运行脚本 `scripts/release-dist`，会自动编译并且将静态文件 push 到 [内网 GitLab](http://gitlaball.nicetuan.net/fe/h5-bi-dist) 上。

- 然后再运行 `scripts/trigger-jenkins` 脚本，会自动触发内网 **[jenkins](http://10.0.8.151:8099)** 部署测试环境。

### 测试环境

[测试环境](http://i-test.nicetuan.net)

开通测试环境账号 **钉钉** @马学刚

## v1.0.0 提测信息

1. 首页日期切换和大区/仓库的选择
2. 首页概览，线路，团点，车辆的内容展示
3. 详情页面概览，线路，团点，车辆内容展示及全部/子站/服务站的切换
