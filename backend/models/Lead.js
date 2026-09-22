const mongoose = require('mongoose');
const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  services: [String],
  message: String,
  status: { type: String, default: 'New' }
}, { timestamps: true });
module.exports = mongoose.model('Lead', LeadSchema);
