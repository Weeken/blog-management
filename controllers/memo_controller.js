const MemoModel = require('../models/memo_model')

const CtxHandler = ctx => {
  if (ctx.body === null || ctx.body.length <= 0) {
    ctx.status = 404
    ctx.body = { message: '找不到便笺' }
  } else {
    ctx.body = {
      code: 200,
      message: ctx.response.message,
      data: ctx.body
    }
  }
}

const MemoController = {
  // 所有便签
  async allMemos (ctx, next) {
    ctx.body = await MemoModel.find()
    CtxHandler(ctx)
  },

  async createMemos (ctx, next) {
    // console.log(ctx.request.body)
    let body = ctx.request.body
    body.imageUrl = body.src + `?imageMogr2/crop/!${body.imageOptions.w}x${body.imageOptions.h}a${body.imageOptions.x}a${body.imageOptions.y}`
    let res = await MemoModel.create(body)
    ctx.body = {
      code: 200,
      message: '添加成功',
      data: res
    }
  }
}

module.exports = MemoController
