const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generarToken = (user) => {
    return jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '7d'}
    )
}

exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const yaExiste = await User.findOne({email});
        if (yaExiste) {
            return res.status(400).json({error: 'El email ya está registrado'});
        }

        const nuevoUsuario = new User({ nombre, email, password});
        await nuevoUsuario.save();

        res.status(201).json({
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            token: generarToken(nuevoUsuario),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario'});
    }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario),
    });
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error); // 👈 agrega esto
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
