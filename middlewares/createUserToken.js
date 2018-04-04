const jwt = require('jsonwebtoken')

module.exports = async user => {
  let userToken = {name: user.name}
  let secret = user._id.toString()
  let token = await jwt.sign(userToken, secret)
  return token
}
