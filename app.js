const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const static = require('koa-static')
const path = require('path')


// 连接数据库
const connect = require('./connection/connect_db.js')
connect.start()

const options = {
	allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}

const index = require('./routes/index')
const users = require('./routes/users')
const memos = require('./routes/memos')
const notes = require('./routes/notes')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors(options))
app.use(json())
app.use(logger())
app.use(static(__dirname + '/public'))  // => http:192.168.50.132/

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(memos.routes(), memos.allowedMethods())
app.use(notes.routes(), notes.allowedMethods())

module.exports = app
