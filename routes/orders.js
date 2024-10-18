// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const AdminController = require('../controllers/AdminController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');

// Ruta para mostrar el formulario de pedido
router.get('/new', (req, res) => {
    res.render('orderForm');
});

// Ruta para procesar el pedido
router.post('/', async (req, res) => {
    const { customerName, email, productDetails, customization } = req.body;
    const newOrder = new Order({ customerName, email, productDetails, customization });

    try {
        await newOrder.save();
        res.redirect('/orders'); // Redirigir a la página de pedidos
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el pedido');
    }
});

// Ruta para mostrar todos los pedidos (administrador)
router.get('/', ensureAuthenticated,ensureAdmin ,async (req, res) => {
    try {
        const orders = await Order.find();
        res.render('orderList', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los pedidos');
    }
});

// Ruta para marcar un pedido como atendido
router.post('/attend/:id', ensureAuthenticated, ensureAdmin,async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: 'Atendido' });
        res.redirect('/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el pedido');
    }
});

module.exports = router;
