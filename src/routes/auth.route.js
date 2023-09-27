const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { validationFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { AuthController } = require('../controllers/auth.controller');

const service = new AuthController();

router.post(
  '/new', 
  [ 
    check('name', 'El nombre es obligatorio').notEmpty(), 
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'La clave debe contener mínimo 6 caracteres').isLength({ min: 6 }), 
    validationFields,
  ], 
  service.createUser
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'La contraseña es obligatoria o no cumple con los requisitos.').isLength({ min: 6}), 
    validationFields,
  ],
  service.login
)

router.get('/renew', validateJWT, service.revalidateToken)


module.exports = router;