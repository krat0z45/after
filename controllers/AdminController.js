const User = require('../models/User');

// Controlador para obtener la página de administración
exports.getAdminPage = async (req, res) => {
    try {
        const users = await User.find(); // Obtener todos los usuarios
        const totalUsers = users.length; // Contar total de usuarios
        const lastUser = users[users.length - 1]; // Obtener el último usuario registrado

        // Verificar si el usuario actual es administrador
        if (!req.user.admin) {
            req.flash('error_msg', 'No tienes permisos para acceder a esta página.');
            return res.redirect('/dashboard');
        }

        res.render('admin', {
            users, 
            totalUsers, 
            lastUser, 
            success_msg: req.flash('success_msg'),
            error_msg: req.flash('error_msg')
        });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Hubo un error al cargar la página de administración.');
        res.redirect('/dashboard');
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        // Verificar si el usuario actual es administrador
        if (!req.user.admin) {
            req.flash('error_msg', 'No tienes permisos para eliminar usuarios.');
            return res.redirect('/admin');
        }

        await User.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Usuario eliminado exitosamente.');
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Hubo un error al eliminar el usuario.');
        res.redirect('/admin');
    }
};

// Controlador para editar un usuario
exports.editUser = async (req, res) => {
    try {
        // Verificar si el usuario actual es administrador
        if (!req.user.admin) {
            req.flash('error_msg', 'No tienes permisos para editar usuarios.');
            return res.redirect('/admin');
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            req.flash('error_msg', 'Usuario no encontrado.');
            return res.redirect('/admin');
        }

        res.render('edit', { user });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Hubo un error al cargar el usuario.');
        res.redirect('/admin');
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { username, email, admin } = req.body;
        const isAdmin = admin === 'on' ? true : false; // Convertir el checkbox en booleano

        await User.findByIdAndUpdate(req.params.id, { 
            username, 
            email, 
            admin: isAdmin 
        });

        req.flash('success_msg', 'Usuario actualizado exitosamente.');
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Hubo un error al actualizar el usuario.');
        res.redirect('/admin');
    }
};
