const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const LikeSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    noteId: { type: String, require: true },
    time: { type: Date, default: Date.now }
})
const LikeModel = DB.db.model('likes', LikeSchema)

module.exports = LikeModel
