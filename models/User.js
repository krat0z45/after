const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema de Usuario
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: { 
        type: Boolean, 
        default: false  // Campo para indicar si es administrador
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Pre-guardar la contraseña encriptada
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
