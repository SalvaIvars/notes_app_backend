const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en la base de datos
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Usuario no válido' });

    // Guardar el usuario en la request para usarlo en el controlador
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Error en middleware auth:', error.message);
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = auth;
