const Koa = require('koa')
const serv = require('koa-static')
const path = require('path')

const port = 3001
const app = new Koa()
app.use(serv(path.resolve(__dirname, 'client')))

app.listen(port, () => {
  console.log('server start at ', port);
})