const {validationResult} = require('express-validator');
const Driver = require('../Schema/driverSchema');
const Ride = require('../Schema/rideSchema');

const registerDriver = async function (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.send(error);
  } else {
    const {name, currentLocation} = req.body;
    const driver = new Driver({name, currentLocation});
    try {
      await driver.save();
      res.send('Saved Successfully!');
    } catch (err) {
      res.send(err);
    }
  }
};

const changeAvailability = async function (req, res) {
  const {id} = req.params;

  const driver = await Ride.find({driver: id, completed: false});
  const found_driver = await Driver.findOne({_id: id});

  if (driver.length > 0 || !found_driver) {
    if (!found_driver) {
      res.send('Driver is not registered!');
    } else {
      res.send(
        'You cannot Change your availibility because you have picked a rider.'
      );
    }
  } else {
    await Driver.findOne({_id: id}, async function (err, found) {
      if (err) {
        res.send(err);
      } else {
        if (found) {
          found.availability = !found.availability;
          await found.save();
          res.send('Successfully Changed!');
        } else {
          res.send('Soory, User not Found!');
        }
      }
    });
  }
};

const completeRide = async function (req, res) {
  const {id} = req.params;

  const driver = await Driver.findOne({_id: id});
  const ride = await Ride.findOne({driver: id});

  if (!driver || !ride) {
    if (!driver) {
      res.send('This driver is not registered!');
    } else {
      res.send('Please First Take a ride.');
    }
  } else {
    driver.currentLocation = ride.to;
    driver.availability = !driver.availability;
    ride.completed = true;

    try {
      await driver.save();
      await ride.save();
      res.send('Completed Ride!');
    } catch (err) {
      res.send(err);
    }
  }
};

module.exports = {
  changeAvailability,
  registerDriver,
  completeRide,
};
