const mongoose = require('mongoose')
const options = { promiseLibrary: require('bluebird') }

const collection = 'BlogManagement'

const connection = {
  db: mongoose.createConnection(`mongodb://127.0.0.1:27017/${collection}`, options),
  start () {
    this.db.on('error', error => {
        console.log('数据库连接失败：' + error)
    })
    this.db.on('open', _ => {
        console.log('------数据库连接成功！------')
    })
  }
}

module.exports = connection
