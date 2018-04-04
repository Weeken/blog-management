const jwt = require('jsonwebtoken')

module.exports = async admin => {
  let adminToken = {name: admin.name}
  let secret = admin._id.toString()
  let token = await jwt.sign(adminToken, secret, { expiresIn: '12h' })
  return token
}
