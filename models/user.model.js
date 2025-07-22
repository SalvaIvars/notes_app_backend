const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
    },
    password: { type: String, required: true},
});

// Middleware para encriptar la contraseña
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.compararPassword = function (passwordPlane)  {
    return bcrypt.compare(passwordPlane, this.password);
}

module.exports = mongoose.model('User', UserSchema);