const express = require('express');
const router = express.Router();

// Ruta para el dashboard, requiere autenticación
router.get('/', (req, res) => {
    // Renderiza la vista del dashboard con los datos del usuario
    res.render('/', {
        
    });
});

module.exports = router;
