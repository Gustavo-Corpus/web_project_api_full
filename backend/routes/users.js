const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getCurrentUser, updateUser, updateAvatar } = require('../controllers/users');

// validador de URL personalizado
const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error('string.uri');
};

// GET /users/me — datos del usuario actual (requiere auth)
router.get('/me', getCurrentUser);

// PATCH /users/me — actualizar perfil (CON VALIDACIÓN)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
}), updateUser);

// PATCH /users/me/avatar — actualizar avatar (CON VALIDACIÓN)
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateAvatar);

module.exports = router;