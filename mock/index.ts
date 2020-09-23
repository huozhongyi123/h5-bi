const jsonServer = require('json-server')

const fs = require('fs')

const path = require('path')

const filePath = path.resolve('./mock/mockList')

interface ArrayConfig {
  status: number
  method: string
}
interface SquareConfig {
  [propName: string]: any
}

interface DefaultConfig<T> {
  data: string | number | T | Array<T>
  status?: number
}

interface JsonResponse {
  locals: DefaultConfig<any>
  jsonp: Function
}

interface JsonRequest {
  originalUrl: string
}

let list: SquareConfig = {}

const files = fs.readdirSync(filePath)
files.forEach((filename: string) => {
  const dirObj = require(`./mockList/${filename}`)
  list = Object.assign(list, dirObj)
})

const server = jsonServer.create()

let db: SquareConfig = {}

Object.keys(list).forEach((key) => {
  if (key === './index.js') return
  const [method, url] = key.split('|')
  const obj = list[key]()
  obj.method = method
  db[url] = obj
})

const router = jsonServer.router(db)

const middlewares = jsonServer.defaults()

const mock = '/mock'

//路由自定义
const rewriter = jsonServer.rewriter({
  [mock + '/*']: '/$1',
})

server.use(middlewares)

server.use(jsonServer.bodyParser) // 抓取body数据使用json-server中间件
server.use(rewriter)
server.use(router)

//自定义返回内容
router.render = (req: JsonRequest, res: JsonResponse) => {
  let defaultData: DefaultConfig<any>
  const { status, method } = res.locals.data
  console.log(req.originalUrl.length)
  if (method == 'get') {
    defaultData = res.locals.data
  } else if (req.originalUrl.length == 1) {
    defaultData = {
      data: 'success',
    }
  } else {
    const objKey = `post|${req.originalUrl.slice(6)}`
    defaultData = list[objKey]()
  }
  const len = Object.keys(defaultData).length
  setTimeout(() => {
    res.jsonp({
      status: status ? status : 200,
      msg: len !== 0 ? '成功' : '失败',
      data: defaultData.data,
    })
  }, 1000)
}
//开启jsonserver服务
server.listen(3333, () => {
  console.log('mock server is running at http://localhost:3333')
})
