const router = require('koa-router')()
const NoteController = require('../controllers/note_controller')
const checkToken = require('../middlewares/checkUserToken')
const checkAdminToken = require('../middlewares/checkAdminToken')

router.prefix('/v1/api/notes')

router.get('/all', NoteController.allNotes)

router.get('/hotNotes', NoteController.hotNotes)

router.get('/noteDetails/:id', NoteController.noteDetails)

router.get('/admin/noteList', checkAdminToken, NoteController.allNotes)

router.post('/admin/addNotes', checkAdminToken, NoteController.createNote)

router.get('/admin/noteDetails/:id', checkAdminToken, NoteController.adminNoteDetails)

router.put('/admin/updateNote/:id', checkAdminToken, NoteController.updateNote)

router.delete('/admin/deleteNotes/:id', checkAdminToken, NoteController.deleteNote)

module.exports = router
