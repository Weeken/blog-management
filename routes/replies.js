const router = require('koa-router')()
const ReplyController = require('../controllers/reply_controller')
const checkToken = require('../middlewares/checkUserToken')

router.prefix('/v1/api/replies')

router.get('/replyList', ReplyController.replyList)

router.post('/addReply', ReplyController.addReply)

module.exports = router
