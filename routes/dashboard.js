const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');

// Ruta para el dashboard, requiere autenticación
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Renderiza la vista del dashboard con los datos del usuario
    res.render('dashboard', {
        user: req.user, // req.user contiene los datos del usuario autenticado
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    });
});

module.exports = router;
