const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/smart-home');

app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url);
  next();
});


app.get('/', (req, res) => {
  res.send('API is running');
});


app.use('/devices', require('./routes/devices'));


app.listen(3000, () => {
  console.log('Mock API running on http://localhost:3000');
});
