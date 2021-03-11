const express = require('express');
const {check} = require('express-validator');

const {
  changeAvailability,
  completeRide,
  registerDriver,
} = require('../actions/driverActions');

const router = express.Router();

router.post(
  '/registerDriver',
  [
    check('name').isLength({min: 1}),
    check('currentLocation.lat').isNumeric(),
    check('currentLocation.lng').isNumeric(),
  ],
  registerDriver
);

router.post('/changeAvailability/:id', changeAvailability);

router.post('/completeRide/:id', completeRide);

module.exports = router;
