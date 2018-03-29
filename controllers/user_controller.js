const UserModel = require('../models/user_model')
const jwt = require('jsonwebtoken')

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

const createToken = async user => {
  let userToken = {name: user.name}
  let secret = user._id.toString()
  let token = await jwt.sign(userToken, secret)
  return token
}

const UserController = {
  // 所有用户
  async allUsers (ctx, next) {
    ctx.body = await UserModel.find()
    CtxHandler(ctx)
  },
  // 搜索用户
  async findUser (ctx, next) {
    ctx.body = await UserModel.find(ctx.request.query)
    CtxHandler(ctx)
  },
  async userDetails (ctx, next) {
    let user = await UserModel.findById(ctx.params.id)
    if (!user) {
      ctx.status = 401
      ctx.body = { message: '找不到用户' }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '注册成功',
        data: {
          id: user._id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          type: user.type,
          time: user.time
        }
      }
    }
  },
  // 修改密码
  async resetPassword (ctx, next) {
    let update = {
      password: ctx.request.body.newPassword
    }
    let user = await UserModel.findById(ctx.params.id)
    if (user.password === ctx.request.body.oldPassword) {
      let res = await UserModel.findByIdAndUpdate(ctx.params.id, update, {new: true})
      ctx.body = {
        code: 200,
        message: '修改成功'
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: '原密码错误'
      }
    }
  },
  // 修改头像
  async changeAvatar (ctx, next) {
    try {
      let url = ctx.request.body.src + `?imageMogr2/crop/!${ctx.request.body.imageOptions.w}x${ctx.request.body.imageOptions.h}a${ctx.request.body.imageOptions.x}a${ctx.request.body.imageOptions.y}`
      let update = {
        avatar: url
      }
      let user = await UserModel.findById(ctx.params.id)
      let res = await UserModel.findByIdAndUpdate(ctx.params.id, update, {new: true})
      ctx.body = {
        code: 200,
        message: '修改成功'
      }
    } catch (err) {
      console.log(err)
    }
  },
  // 注册
  async register (ctx, next) {
    let exist = await UserModel.findOne({email: ctx.request.body.email})
    if (exist) {
      ctx.status = 401
      ctx.body = { message: '该邮箱已被注册' }
    } else {
      ctx.status = 200
      let res = await UserModel.create(ctx.request.body)
      ctx.body = {
        code: 200,
        message: '注册成功',
        data: {
          email: res.email,
          name: res.name,
          type: res.type,
          avatar: res.avatar,
          time: res.time
        }
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
          data: {
            id: exist._id,
            email: exist.email,
            name: exist.name,
            type: exist.type,
            avatar: exist.avatar,
            token: await createToken(exist)
          }
        }
      }
    } else {
      ctx.status = 404
      ctx.body = { message: '找不到用户' }
    }
  }
}

module.exports = UserController
