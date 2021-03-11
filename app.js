const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const driverRoutes = require('./routes/driverRoutes');
const riderRoutes = require('./routes/riderRoutes');

const app = express();


app.use(bodyParser.json());
app.use(driverRoutes);
app.use(riderRoutes);

mongoose.connect('mongodb://localhost:27017/cabDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
