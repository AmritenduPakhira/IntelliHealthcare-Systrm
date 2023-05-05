const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  weight: { type: Number },
  calibrationFactor: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema, 'SensorData');
module.exports = SensorData;
