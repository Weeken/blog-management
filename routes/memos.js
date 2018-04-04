const router = require('koa-router')()
const MemoController = require('../controllers/memo_controller')
const checkAdminToken = require('../middlewares/checkAdminToken')

router.prefix('/v1/api/memos')

router.get('/all', MemoController.allMemos)

router.get('/admin/memoList', checkAdminToken, MemoController.memoList)

router.post('/admin/addMemos', checkAdminToken, MemoController.createMemos)

router.delete('/admin/deleteMemos/:id', checkAdminToken, MemoController.deleteMemos)

module.exports = router
