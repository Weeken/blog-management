const router = require('koa-router')()
const LikeController = require('../controllers/like_controller')
const checkToken = require('../middlewares/checkToken')

router.prefix('/v1/like')

router.post('/like', LikeController.like)

router.post('/dislike', LikeController.dislike)

module.exports = router
