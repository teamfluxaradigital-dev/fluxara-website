const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  title: String,
  client: String,
  date: Date,
  notes: String,
  done: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Event', EventSchema);
