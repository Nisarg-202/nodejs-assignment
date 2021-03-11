const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  availability: {
    type: Boolean,
    default: true,
  },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model('Driver', driverSchema);
