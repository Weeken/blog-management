const router = require('koa-router')()
const CommentController = require('../controllers/comment_controller')
const checkToken = require('../middlewares/checkUserToken')

router.prefix('/v1/api/comments')

router.get('/commentList', CommentController.commentList)

router.post('/addComment', CommentController.addComment)

module.exports = router
