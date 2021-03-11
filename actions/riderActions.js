const {validationResult} = require('express-validator');
const Rider = require('../Schema/riderSchema');
const Driver = require('../Schema/driverSchema');
const Ride = require('../Schema/rideSchema');

const registerRider = async function (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.send(error);
  } else {
    const {name} = req.body;
    const rider = new Rider({
      name,
    });
    try {
      await rider.save();
      res.send('Saved Successfully!');
    } catch (err) {
      res.send(err);
    }
  }
};

const bookCab = async function (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.send(error);
  } else {
    const {id} = req.params;
    const {from, to} = req.body;

    const rider_status = await Ride.findOne({rider: id, completed: false});
    const rider = await Rider.findOne({_id: id});
    if (rider_status || !rider) {
      if (!rider) {
        res.send('This rider is not registered!');
      } else {
        res.send(
          'Sorry you are currently riding. First complete this ride and after book another ride.'
        );
      }
    } else {
      const drivers = await Driver.find({availability: true});
      if (drivers.length > 0) {
        let all_drivers = [];
        drivers.forEach(function (item) {
          all_drivers.push({
            _id: item._id,
            distance: Math.sqrt(
              Math.pow(item.currentLocation.lat - from.lat, 2) +
                Math.pow(item.currentLocation.lng - from.lng, 2)
            ),
          });
        });

        all_drivers = all_drivers.sort(function (a, b) {
          return a.distance - b.distance;
        });

        const driver = all_drivers[0];

        const found = await Driver.findOne({_id: driver._id});
        found.availability = !found.availability;

        const ride = new Ride({
          driver: driver._id,
          rider: id,
          from,
          to,
        });

        try {
          await found.save();
          await ride.save();
          res.send('Successfully Registered!');
        } catch (err) {
          res.send(err);
        }
      } else {
        res.send('No Drivers Found!');
      }
    }
  }
};

const totalRides = async function (req, res) {
  const {id} = req.params;

  const all_rides = await Ride.find({rider: id, completed: true});
  res.send(all_rides);
};

module.exports = {
  totalRides,
  bookCab,
  registerRider,
};
