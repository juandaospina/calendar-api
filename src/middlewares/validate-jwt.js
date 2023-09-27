const { request, response } = require('express');

const jwt = require('jsonwebtoken');

function validateJWT(req = request, res = response, next) {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token, it is required.'
    })
  }

  try {
    const payload = jwt.verify(
      token, 
      process.env.SECRET_JWT_SEED
    )

    req.uid = payload.uid;
    req.name = payload.name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    })
  }
  next();
}

module.exports = {
  validateJWT
}