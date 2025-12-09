const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: 'fas fa-check' },
  color: { type: String, default: 'blue-500' },
  completedDates: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);
