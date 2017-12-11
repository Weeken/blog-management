const router = require('koa-router')()
const MemoController = require('../controllers/memo_controller')

router.prefix('/memos')

router.get('/', MemoController.allMemos)

router.post('/addMemos', MemoController.createMemos)

module.exports = router
