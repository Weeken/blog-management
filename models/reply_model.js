const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const ReplySchema = new mongoose.Schema({
    observerId: { type: String, require: true },
    observerName: { type: String, default: `` },
    replierId: { type: String, require: true },
    replierName: { type: String, default: `` },
    commentId: { type: String, require: true },
    content: { type: String, require: true },
    time: { type: Date, default: Date.now }
})
const ReplyModel = DB.db.model('replies', ReplySchema)

module.exports = ReplyModel
