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
const logUtil = require('./utils/log_util')
const jwtKoa = require('koa-jwt')


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
const like = require('./routes/like')
const comments = require('./routes/comments')
const replies = require('./routes/replies')

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


//log工具
// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date()
  //响应间隔时间
  let ms
  try {
    //开始进入到下一个中间件
    await next()
    ms = new Date() - start
    //记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    //记录异常日志
    logUtil.logError(ctx, error, ms)
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(memos.routes(), memos.allowedMethods())
app.use(notes.routes(), notes.allowedMethods())
app.use(like.routes(), like.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(replies.routes(), replies.allowedMethods())

app.use(async (ctx, next) => {
  await next()
  console.log(ctx)
  if (ctx.response.status === 404) {
    ctx.status = 404
    ctx.body = {
      type: 'error',
      message: 'Not Found'
    }
  }
})

module.exports = app
