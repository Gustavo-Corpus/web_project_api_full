const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_ROUNDS = 10;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos.' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' }
    );

    return res.send({ token });
  } catch (err) {
  return next(err);
}
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {email, password } = req.body;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
  
      email,
      password: hash,
    });

    return res.status(201).send({
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'El email ya está registrado.';
  } else if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = 'Datos de usuario inválidos.';
  }
  return next(err);
}
};

