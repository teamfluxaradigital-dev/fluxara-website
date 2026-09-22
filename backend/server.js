require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
connectDB().then(async () => {
  const bcrypt = require('bcryptjs');
  const User = require('./models/User');
  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password, role: 'admin' });
    console.log('Admin account created:', process.env.ADMIN_EMAIL);
  }
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
