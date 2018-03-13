const router = require('koa-router')()
const NoteController = require('../controllers/note_controller')
const checkToken = require('../middlewares/checkToken')

router.prefix('/v1/notes')

router.get('/all', NoteController.allNotes)

router.post('/admin/addNotes', NoteController.createNote)

router.get('/hotNotes', NoteController.hotNotes)

router.get('/noteDetails/:id', NoteController.noteDetails)

router.put('/admin/updateNote/:id', NoteController.updateNote)

router.delete('/admin/deleteNotes/:id', NoteController.deleteNote)

module.exports = router
