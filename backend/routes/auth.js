const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/auth.js');
const { validateSignup, validateSignin } = require('../utils/validators');

// Rutas públicas con validación
router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

module.exports = router;