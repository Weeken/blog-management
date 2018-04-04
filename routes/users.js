const router = require('koa-router')()
const UserController = require('../controllers/user_controller')
const checkToken = require('../middlewares/checkUserToken')
// router.get('/token', checkToken, GetToken)

router.prefix('/v1/api/users')

router.get('/', checkToken, UserController.allUsers)

router.get('/findUser', checkToken, UserController.findUser)

router.get('/userDetails/:id', checkToken, UserController.userDetails)

router.put('/changeAvatar/:id', checkToken, UserController.changeAvatar)

router.put('/resetPassword/:id', checkToken, UserController.resetPassword)

router.post('/login', UserController.login)

router.post('/admin/login', UserController.adminLogin)

router.post('/register', UserController.register)

module.exports = router
