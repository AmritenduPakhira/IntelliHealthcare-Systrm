
const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const SensorData = require('./models/arduino');

const app = express();
const port = 5001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://amrit123:amrit123@cluster0.klbyxfa.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Connect to Arduino and configure data parser
const arduinoPort = new SerialPort('COM12', { baudRate: 57600 });
const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

// Connect to MQTT broker
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Subscribe to the sensor data topic
client.subscribe('/sensorData');

// Handle incoming sensor data
// Handle incoming sensor data
client.on('message', (topic, message) => {
  if (topic === '/sensorData') {
    try {
      const data = JSON.parse(message);

      // Save the data to MongoDB
      const sensorData = {
        weight: (data.value),
        calibrationFactor:60 ,
        timestamp: new Date().getTime()
      };
      const sensorDataModel = new SensorData(sensorData);
      console.log(sensorDataModel);
      sensorDataModel.save();
    }
    catch(error){
      console.log(error);
    }
  }

});


// Start reading data from the Arduino
parser.on('data', (data) => {
  console.log(`${data}`);
  client.publish('/sensorData', JSON.stringify({ value: data }));
});

// Define the SensorData model




// Define the route to get all sensor data
app.get('/sensor-data', (req, res) => {
  SensorData.find()
  .then((data)=>{
    res.send(data);
  })

});

// Define the route to post sensor data
// Define the route to post sensor data
app.post('/sensor-data', (req, res) => {
  const sensorData = new SensorData({
    name: 'weight of the person: ',
    value: parseInt(req.body.value),
    timestamp: new Date().getTime()
  });

  SensorData.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log('Data saved to MongoDB');
      res.status(200).send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
