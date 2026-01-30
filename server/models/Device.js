const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  state: {
    type: Object, 
    required: true,
  },
});

module.exports = mongoose.model('Device', DeviceSchema);
