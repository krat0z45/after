// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  productDetails: { type: String, required: true },
  customization: { type: String },
  status: { type: String, default: 'Pendiente' }, // 'Pendiente', 'Atendido'
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
