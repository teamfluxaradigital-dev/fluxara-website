const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  assignedTo: String,
  dueDate: Date,
  done: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Task', TaskSchema);
