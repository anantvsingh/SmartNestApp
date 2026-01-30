const mongoose = require('mongoose');
const Device = require('./models/Device');

mongoose.connect('mongodb://127.0.0.1:27017/smart-home');

async function seed() {
  await Device.deleteMany();

  await Device.insertMany([
    { type: 'lights', state: { on: false } },
    { type: 'thermostat', state: { temperature: 22 } },
    { type: 'Main Door Lock', state: { locked: true } },
  ]);

  console.log('Devices seeded');
  process.exit();
}

seed();
