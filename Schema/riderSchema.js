const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Rider', riderSchema);
