module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Por favor, inicia sesión para acceder.');
        res.redirect('/login');
    },
    
    ensureAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin) {
            return next();
        }
        req.flash('error_msg', 'No tienes permisos para acceder a esta sección.');
        res.redirect('/dashboard');
    }
};
