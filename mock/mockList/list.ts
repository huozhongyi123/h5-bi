const demoList = [
  {
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师',
  },
  {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师',
  },
]

module.exports = {
  'post|parameter': () => {
    return {
      status: 200,
      data: demoList,
    }
  },
  'get|regiter': () => {
    return {
      status: 500,
      data: { msg: 'success' },
    }
  },
}
