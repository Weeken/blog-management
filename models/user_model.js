const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, default: '' },
    type: { type: String, require: true, default: '访客' },
    time: { type: Date, default: Date.now }
})
const UserModel = DB.db.model('users', UserSchema)

module.exports = UserModel
