const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');
const AdminController = require('../controllers/AdminController');

// Ruta para el panel de administración (solo administradores)
router.get('/admin', ensureAuthenticated, ensureAdmin, AdminController.getAdminPage);

// Ruta para eliminar usuario (solo administradores)
router.get('/admin/delete/:id', ensureAuthenticated, ensureAdmin, AdminController.deleteUser);

// Ruta para editar usuario (solo administradores)
router.get('/admin/edit/:id', ensureAuthenticated, ensureAdmin, AdminController.editUser);

router.post('/admin/edit/:id', ensureAuthenticated, AdminController.updateUser);
module.exports = router;
