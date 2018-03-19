const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const CommentSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    userName: { type: String, default: `访客${1000 * Math.random()}` },
    userAvatar: { type: String, default: `` },
    noteId: { type: String, require: true },
    content: { type: String, require: true },
    replies: { type: Number, default: 0 },
    replyList: { type: Array, default: [] },
    time: { type: Date, default: Date.now }
})
const CommentModel = DB.db.model('comments', CommentSchema)

module.exports = CommentModel
