const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const CommentSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    noteId: { type: String, require: true },
    content: { type: String, require: true },
    discuss: { type: Number, default: 0 },
    time: { type: Date, default: Date.now }
})
const CommentModel = DB.db.model('comments', CommentSchema)

module.exports = CommentModel
