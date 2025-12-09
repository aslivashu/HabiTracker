require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Habit = require('./models/Habit');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// ROUTES

// 1. Get all habits
app.get('/api/habits', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create a new habit
app.post('/api/habits', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    const savedHabit = await newHabit.save();
    res.json(savedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Toggle Habit Completion
app.put('/api/habits/:id/toggle', async (req, res) => {
  const { date } = req.body; // Expect "YYYY-MM-DD"
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    const index = habit.completedDates.indexOf(date);
    if (index === -1) {
      habit.completedDates.push(date);
    } else {
      habit.completedDates.splice(index, 1);
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
