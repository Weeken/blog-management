const CommentModel = require('../models/comment_model')
const NoteModel = require('../models/note_model')
const UserModel = require('../models/user_model')
const ReplyModel = require('../models/reply_model')

const CommentController = {
  async commentList (ctx, next) {
    let list = await CommentModel.find({noteId: ctx.request.query.id})

    if (list === null) {
      ctx.status = 404
      ctx.body = { message: '找不到评论记录' }
    } else {
      try {
        let userIds = list.map(item => item.userId)
        let users = await UserModel.find({_id: {$in: userIds}})
        // console.log(users);
        let commentIds = list.map(item => item._id.toString())
        let replies = await ReplyModel.find({commentId: {$in: commentIds}})
        let observerIds = replies.map(item => item.observerId)
        let replierIds = replies.map(item => item.replierId)
        let observers = await UserModel.find({_id: {$in: observerIds}})
        let repliers = await UserModel.find({_id: {$in: replierIds}})
        replyList = replies.map(reply => {
          reply.observerName = observers.find(user => {
            return user._id.toString() === reply.observerId
          }).name
          // console.log(reply.observerName);
          reply.replierName = repliers.find(user => {
            return user._id.toString() === reply.replierId
          }).name
          return reply
        })
        commentList = list.map(comment_ => {
          let user_ = users.find(user => {
            return user._id.toString() === comment_.userId
          })
          comment_.userName = user_.name
          comment_.userAvatar = user_.avatar
          comment_.replyList = replyList.filter(reply => {
            return reply.commentId === comment_._id.toString()
          })
          return comment_
        })
        ctx.body= {
          code: 200,
          message: 'ok',
          data: commentList
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async addComment (ctx, next) {
    let note = await NoteModel.findById(ctx.request.body.noteId)
    let commentNum = note.comments
    let update = {
      comments: commentNum + 1
    }
    let newComment = await CommentModel.create(ctx.request.body)
    let updateNote = await NoteModel.findByIdAndUpdate(ctx.request.body.noteId, update, {new: true})
    ctx.body = {
      code: 200,
      message: 'ok'
    }
  }
}

module.exports = CommentController
