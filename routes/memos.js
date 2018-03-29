const router = require('koa-router')()
const MemoController = require('../controllers/memo_controller')

router.prefix('/v1/api/memos')

router.get('/all', MemoController.allMemos)

router.get('/admin/memoList', MemoController.memoList)

router.post('/admin/addMemos', MemoController.createMemos)

router.delete('/admin/deleteMemos/:id', MemoController.deleteMemos)

module.exports = router
