const mongoose = require('mongoose');

module.exports = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<db_password>') || uri.includes('PUT_YOUR_REAL_DB_PASSWORD')) {
    console.error('\n  MONGO_URI in backend/.env still has a placeholder password.');
    console.error('  Replace it with your real MongoDB Atlas password, then restart.\n');
    process.exit(1);
  }

  // fail fast instead of buffering requests for 10s and timing out silently
  mongoose.set('bufferCommands', false);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('\n  Could not connect to MongoDB:', err.message);
    console.error('  Check the password in backend/.env, and that your IP is allowed');
    console.error('  under Atlas > Network Access.\n');
    process.exit(1);
  }
};
