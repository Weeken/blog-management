const UserModel = require('../models/user_model')

const CtxHandler = ctx => {
  if (ctx.body === null || ctx.body.length <= 0) {
    ctx.status = 404
    ctx.body = { message: '找不到用户' }
  } else {
    ctx.body = {
      code: ctx.response.status,
      message: ctx.response.message,
      data: ctx.body
    }
  }
}

const UserController = {
  // 所有用户
  async allUsers (ctx, next) {
    ctx.body = await UserModel.find()
    CtxHandler(ctx)
  },
  // 搜索用户
  async findUser (ctx, next) {
    ctx.body = await UserModel.find(ctx.query)
    CtxHandler(ctx)
  },
  // 注册
  async register (ctx, next) {
    let exist = await UserModel.findOne({email: ctx.request.body.email})
    if (exist) {
      ctx.status = 401
      ctx.body = { message: '该邮箱已被注册' }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '注册成功',
        data: await UserModel.create(ctx.request.body)
      }
    }
  },
  // 登录
  async login (ctx, next) {
    let exist = await UserModel.findOne({email: ctx.request.body.email})
    if (exist) {
      if (ctx.request.body.password !== exist.password) {
        ctx.status = 401
        ctx.body = { message: '密码不正确' }
      } else {
        ctx.status = 200
        ctx.body = {
          code: 200,
          message: '登录成功',
          data: exist
        }
      }
    } else {
      ctx.status = 404
      ctx.body = { message: '找不到用户' }
    }
  }
}

module.exports = UserController
