const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, noteController.getNotas);
router.post('/', auth, noteController.createNota);
router.delete('/:id', auth, noteController.deleteNota);

module.exports = router;