const express = require('express');
const Device = require('../models/Device');
const router = express.Router();

// Get all devices
router.get('/', async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// Update device state
router.put('/:id', async (req, res) => {
  const device = await Device.findByIdAndUpdate(
    req.params.id,
    { state: req.body.state },
    { new: true }
  );
  res.json(device);
});

module.exports = router;
