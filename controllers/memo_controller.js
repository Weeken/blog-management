const MemoModel = require('../models/memo_model')

const MemoController = {
  // 所有便签
  async allMemos (ctx, next) {
    ctx.body = await MemoModel.find()
    if (ctx.body === null) {
      ctx.status = 404
      ctx.body = { message: '找不到便笺' }
    } else {
      ctx.body = {
        code: 200,
        message: ctx.response.message,
        data: ctx.body
      }
    }
  },
  // 列表
  async memoList (ctx, next) {
    let limit = 5
    let page = ctx.request.query.page || 1
    let count = await MemoModel.count()
    let pageCount
    if (count <= limit) {
      pageCount = 1
    } else {
      pageCount = count % limit === 0 ? ~~(count / limit) : ~~(count / limit + 1)
    }
    let data = await MemoModel.find({}, null, {skip: (page - 1) * limit, limit: limit, sort: {time: -1}})
    if (data === null) {
      ctx.status = 404
      ctx.body = { message: '找不到便笺' }
    } else {
      ctx.body = {
        code: 200,
        message: ctx.response.message,
        data: data,
        pageCount: pageCount
      }
    }
  },
  // 添加便笺
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
  },
  // 删除便笺
  async deleteMemos (ctx, next) {
    let target = await MemoModel.remove({_id: ctx.params.id})
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  }
}

module.exports = MemoController
