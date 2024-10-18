const User = require('../models/User');
const passport = require('passport');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    let errors = [];

    // Validar campos
    if (!username || !password) {
        errors.push({ msg: 'Por favor, complete todos los campos' });
    }

    // Si hay errores, renderizar la vista de registro con los errores
    if (errors.length > 0) {
        return res.render('register', { errors });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            errors.push({ msg: 'El usuario ya existe' });
            return res.render('register', { errors });
        }

        // Crear nuevo usuario
        const newUser = new User({ username, password });
        await newUser.save();
        
        req.flash('success', 'Registro exitoso. Ahora puedes iniciar sesión.');
        res.redirect('/login');
    } catch (err) {
        // Manejo de errores generales
        console.error(err);
        errors.push({ msg: 'Hubo un problema en el registro, por favor intenta de nuevo.' });
        res.render('register', { errors });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
};
