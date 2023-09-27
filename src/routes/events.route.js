const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validationFields } = require('../middlewares/fields-validator');
const { Event } = require('../controllers/events.controller');

const service = new Event();

router.use(validateJWT);

router.get('/', service.getEvents)

router.post(
  '/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validationFields
  ], 
  service.createEvent
)

router.put('/:id', service.updateEvent)

router.delete('/:id', service.deleteEvent)

module.exports = router;