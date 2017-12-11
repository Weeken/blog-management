const router = require('koa-router')()
const UserController = require('../controllers/user_controller')

router.prefix('/users')

router.get('/', UserController.allUsers)

router.get('/findUser', UserController.findUser)

router.post('/login', UserController.login)

router.post('/register', UserController.register)

module.exports = router
