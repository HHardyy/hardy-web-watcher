const Koa = require('koa')
const serv = require('koa-static')
const path = require('path')

const API = require('./middleware/api')

const port = 3001
const app = new Koa()

app.use(API)
app.use(serv(path.resolve(__dirname, 'client')))

app.listen(port, () => {
  console.log('server start at ', port);
})