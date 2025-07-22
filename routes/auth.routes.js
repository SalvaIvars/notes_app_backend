const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registrarUsuario);
router.post('/login', authController.loginUsuario);

module.exports = router;