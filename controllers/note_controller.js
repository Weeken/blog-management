const NoteModel = require('../models/note_model')
const CommentModel = require('../models/comment_model')
const UserModel = require('../models/user_model')

const NoteController = {
  // 所有笔记
  async allNotes (ctx, next) {
    try {
      let limit = 10
      let page = ctx.request.query.page || 1
      let count = await NoteModel.count()
      let pageCount
      if (count <= limit) {
        pageCount = 1
      } else {
        pageCount = count % limit === 0 ? ~~(count / limit) : ~~(count / limit + 1)
      }
      let data = await NoteModel.find({}, null, {skip: (page - 1) * limit, limit: limit, sort: {time: -1}})
      if (data === null) {
        ctx.status = 404
        ctx.body = { message: '找不到笔记' }
      } else {
        ctx.body = {
          code: 200,
          message: 'ok',
          data: data.map(item => {
            return {
              _id: item._id,
              tag: item.tag,
              title: item.title,
              read: item.read,
              like: item.like,
              likeUserId: item.likeUserId,
              comments: item.comments,
              commentList: item.commentList,
              abstract: item.abstract,
              time: item.time
            }
          }),
          pageCount: pageCount
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  // 热门笔记
  async hotNotes (ctx, next) {
    try {
      let res = await NoteModel.find({}, null, {limit: 8, sort: {read: -1}})
      ctx.body = {
        code: 200,
        message: 'ok',
        data: res
      }
    } catch (err) {
      console.log(err);
    }
  },
  // 创建笔记
  async createNote (ctx, next) {
    let res = await NoteModel.create(ctx.request.body)
    ctx.body = {
      code: 200,
      message: '提交成功',
      data: res
    }
  },
  // 笔记详情
  async noteDetails (ctx, next) {
    let note = await NoteModel.findById(ctx.params.id)
    let readNum = note.read
    let update = { read: readNum + 1 } // 增加浏览次数
    let newNote = await NoteModel.findByIdAndUpdate(ctx.params.id, update, {new: true})
    ctx.body = {
      code: 200,
      message: 'ok',
      data: newNote
    }
  },
  async adminNoteDetails (ctx, next) {
    let note = await NoteModel.findById(ctx.params.id)
    ctx.body = {
      code: 200,
      message: 'ok',
      data: note
    }
  },
  // 更新笔记
  async updateNote (ctx, next) {
    let update = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      abstract: ctx.request.body.abstract,
      tag: ctx.request.body.tag
    }
    let res = await NoteModel.findByIdAndUpdate(ctx.params.id, update, {new: true})
    ctx.body = {
      code: 200,
      message: '更新成功',
      data: res
    }
  },
  // 删除笔记
  async deleteNote (ctx, next) {
    let target = await NoteModel.remove({_id: ctx.params.id})
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  }
}

module.exports = NoteController
