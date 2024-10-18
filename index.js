const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); // Importar path para manejar rutas correctamente
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');
const ordersRouter = require('./routes/orders');

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

// Configurar Express
const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Definir la ruta estática para archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware para pasar mensajes de flash a las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.send('Bienvenido a la página principal');
});

// Rutas
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', adminRoutes);
app.use('/orders', ordersRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
