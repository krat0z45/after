const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Estrategia de inicio de sesión local
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        // Aquí deberías agregar la lógica para comparar las contraseñas
        // Por ejemplo, usando bcrypt para verificar la contraseña
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serializar el usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Exportar el objeto passport
module.exports = passport; // Asegúrate de exportar passport
