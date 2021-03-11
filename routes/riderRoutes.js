const express = require('express');
const {check} = require('express-validator');

const {registerRider, totalRides, bookCab} = require('../actions/riderActions');

const router = express.Router();

router.get('/rides/:id', totalRides);

router.post(
  '/registerRider',
  [check('name').isLength({min: 1})],
  registerRider
);

router.post(
  '/bookCab/:id',
  [
    check('from.lat').isNumeric(),
    check('from.lng').isNumeric(),
    check('to.lat').isNumeric(),
    check('to.lng').isNumeric(),
  ],
  bookCab
);

module.exports = router;
