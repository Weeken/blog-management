const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const MemoSchema = new mongoose.Schema({
    src : { type: String },
    imageOptions: { type: Object , defautl: {} },
    imageUrl : { type: String },
    caption : { type: String },
    title: { type: String },
    desc: { type: String },
    time : { type: Date, default: Date.now }
})
const MemoModel = DB.db.model('memos', MemoSchema )

module.exports = MemoModel
