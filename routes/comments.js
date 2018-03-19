const router = require('koa-router')()
const CommentController = require('../controllers/comment_controller')
const checkToken = require('../middlewares/checkToken')

router.prefix('/v1/comments')

router.get('/commentList', CommentController.commentList)

router.post('/addComment', CommentController.addComment)

module.exports = router