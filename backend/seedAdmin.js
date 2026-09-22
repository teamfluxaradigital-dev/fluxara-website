require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./models/User');

(async () => {
  await connectDB();
  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password, role: 'admin' });
    console.log('Admin account created:', process.env.ADMIN_EMAIL);
  } else {
    console.log('Admin already exists');
  }
  process.exit();
})();
