const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');

// Ruta para la página de registro
router.get('/register', (req, res) => {
    res.render('register', { errors: [] }); // Pasar un arreglo vacío por defecto
});

// Ruta para manejar el registro
router.post('/register', AuthController.registerUser);

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
    const error_msg = req.flash('error') || [];
    res.render('login', { error_msg });
});

// Ruta para manejar el inicio de sesión
router.post('/login', AuthController.loginUser);

// Incluir las rutas de administración
const adminRoutes = require('./admin');
router.use('/', adminRoutes);

module.exports = router;
