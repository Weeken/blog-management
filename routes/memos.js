const router = require('koa-router')()
const MemoController = require('../controllers/memo_controller')

router.prefix('/memos')

router.get('/all', MemoController.allMemos)

router.get('/memoList', MemoController.memoList)

router.post('/addMemos', MemoController.createMemos)

router.delete('/deleteMemos/:id', MemoController.deleteMemos)

module.exports = router
