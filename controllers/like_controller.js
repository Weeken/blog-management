const LikeModel = require('../models/like_model')
const NoteModel = require('../models/note_model')

const LikeController = {
  async like (ctx, next) {
    let note = await NoteModel.findById(ctx.request.body.noteId)
    let likeNum = note.like
    let likeUserId = note.likeUserId
    if (!likeUserId.includes(ctx.request.body.userId)) {
      likeUserId.push(ctx.request.body.userId)
    }
    let update = {
      like: likeNum + 1,
      likeUserId: likeUserId
    } // 增加浏览次数
    let like = await LikeModel.create(ctx.request.body)
    let updateNote = await NoteModel.findByIdAndUpdate(ctx.request.body.noteId, update, {new: true})
    ctx.body = {
      code: 200,
      message: 'ok'
    }
  },
  async dislike (ctx, next) {
    let note = await NoteModel.findById(ctx.request.body.noteId)
    let likeNum = note.like
    let likeUserId = note.likeUserId
    let userId = ctx.request.body.userId
    if (likeUserId.includes(userId)) {
      likeUserId.splice(likeUserId.indexOf(userId), 1)
    }
    let update = {
      like: likeNum - 1,
      isLiked: isLike
    } // 减少浏览次数
    await LikeModel.remove(ctx.request.body)
    await NoteModel.findByIdAndUpdate(ctx.request.body.noteId, update, {new: true})
    ctx.body = {
      code: 200,
      message: 'ok'
    }
  }
}

module.exports = LikeController
