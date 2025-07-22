const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

router.get('/', noteController.getNotas);
router.post('/', noteController.createNota);
router.delete('/:id', noteController.deleteNota);

module.exports = router;