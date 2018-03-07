const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const NoteSchema = new mongoose.Schema({
    tag: { type: String, default: "" },
    title: { type: String, default: "" },
    abstract: { type: String, default: "" },
    content: { type: String, default: "" },
    like: { type: Number, default: 0 },
    comment: { type: Number, default: 0 },
    read: { type: Number, default: 0 },
    time: { type: Date, default: Date.now }
})
const NoteModel = DB.db.model('notes', NoteSchema )

module.exports = NoteModel
