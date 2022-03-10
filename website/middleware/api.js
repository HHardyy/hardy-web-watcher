module.exports = async (ctx, next) => {
  let apis = {
    '/api/list1': [{ name: 'hardy', age: 18 }],
    '/api/list2': [{name: '小方块', age: 19}]
  }

  for (let key in apis) {
    if (ctx.path.includes(key)) {
      ctx.body = apis[key]
    }
  }

  return next()
}