const CommentModel = require('../models/comment_model')
const ReplyModel = require('../models/reply_model')
const UserModel = require('../models/user_model')

const ReplyController = {
  async replyList (ctx, next) {
    let list = await ReplyModel.find({commentId: ctx.request.query.id})
    if (list === null) {
      ctx.status = 404
      ctx.body = { message: '找不到回复记录' }
    } else {
      let observerIds = list.map(item => item.observerId)
      let replierIds = list.map(item => item.replierId)
      let observers = await UserModel.find({_id: {$in: observerIds}})
      let repliers = await UserModel.find({_id: {$in: replierIds}})
      replyList = list.map(reply => {
        reply.observerName = observers.find(user => {
          return user._id.toString() === reply.observerId
        }).name
        reply.replierName = repliers.find(user => {
          return user._id.toString() === reply.replierId
        }).name
        return reply
      })
      ctx.body= {
        code: 200,
        message: 'ok',
        data: replyList
      }
    }
  },
  async addReply (ctx, next) {
    let comment = await CommentModel.findById(ctx.request.body.commentId)
    let replyNum = comment.replies
    let update = {
      replies: replyNum + 1
    }
    let newReply = await ReplyModel.create(ctx.request.body)
    let updateComment = await CommentModel.findByIdAndUpdate(ctx.request.body.commentId, update, {new: true})
    ctx.body = {
      code: 200,
      message: 'ok'
    }
  }
}

module.exports = ReplyController
