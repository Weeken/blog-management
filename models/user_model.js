const mongoose = require('mongoose')

const DB = require('../connection/connect_db')

const UserSchema = new mongoose.Schema({
    email : { type:String },
    name : { type:String },
    password: { type:String },
    time : { type:Date, default:Date.now }
})
const UserModel = DB.db.model('users', UserSchema )

module.exports = UserModel
