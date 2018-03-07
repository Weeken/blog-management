const router = require('koa-router')()
const NoteController = require('../controllers/note_controller')

router.prefix('/notes')

router.get('/all', NoteController.allNotes)

router.post('/addNotes', NoteController.createNote)

router.get('/hotNotes', NoteController.hotNotes)

router.get('/noteDetails/:id', NoteController.noteDetails)

router.put('/updateNote/:id', NoteController.updateNote)

router.delete('/deleteNotes/:id', NoteController.deleteNote)

module.exports = router
