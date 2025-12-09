import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('fas fa-star');
  const [newHabitColor, setNewHabitColor] = useState('blue-500');

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/habits');
      setHabits(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load habits');
    }
  };

  useEffect(() => { fetchHabits(); }, []);

  const toggleHabit = async (id) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    try {
      await axios.put(`http://localhost:5000/api/habits/${id}/toggle`, { date: dateStr });
      fetchHabits();
      toast.success('Habit updated');
    } catch (err) {
      console.error('Error toggling habit', err);
      toast.error('Failed to update habit');
    }
  };

  const createHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return toast.error('Please provide a name');
    try {
      await axios.post('http://localhost:5000/api/habits', {
        name: newHabitName.trim(),
        icon: newHabitIcon,
        color: newHabitColor
      });
      setNewHabitName('');
      setNewHabitIcon('fas fa-star');
      setNewHabitColor('blue-500');
      setIsCreateOpen(false);
      fetchHabits();
      toast.success('Habit created');
    } catch (err) {
      console.error('Error creating habit', err);
      toast.error('Failed to create habit');
    }
  };

  const dateStrip = Array.from({ length: 5 }, (_, i) => addDays(startOfToday(), i));

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white overflow-hidden font-sans">
      <Toaster position="bottom-center" />
      <div className="px-4 py-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold uppercase">{format(selectedDate, 'EEEE')}</h1>
          <p className="text-gray-400 text-sm mt-1">{format(selectedDate, 'MMM d')}</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
          <i className="fas fa-plus text-lg"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {dateStrip.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <div key={date.toString()} onClick={() => setSelectedDate(date)} className="text-center flex-shrink-0 relative cursor-pointer">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'bg-gray-800 text-gray-400'}`}>
                  <span className="text-xs font-semibold leading-tight">{format(date, 'EEE')}<br/><span className="text-lg">{format(date, 'd')}</span></span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
            <i className="fas fa-sun text-yellow-400 mr-2"></i> Morning
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <i className="fas fa-cloud-sun text-orange-200 mr-2"></i> Afternoon
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
            <i className="fas fa-moon text-purple-400 mr-2"></i> Evening
          </button>
        </div>
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('fas fa-star');
  const [newHabitColor, setNewHabitColor] = useState('blue-500');

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/habits');
      setHabits(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load habits');
    }
  };

  useEffect(() => { fetchHabits(); }, []);

  const toggleHabit = async (id) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    try {
      await axios.put(`http://localhost:5000/api/habits/${id}/toggle`, { date: dateStr });
      fetchHabits();
      toast.success('Habit updated');
    } catch (err) {
      console.error('Error toggling habit', err);
      toast.error('Failed to update habit');
    }
  };

  const createHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return toast.error('Please provide a name');
    try {
      await axios.post('http://localhost:5000/api/habits', {
        name: newHabitName.trim(),
        icon: newHabitIcon,
        color: newHabitColor
      });
      setNewHabitName('');
      setNewHabitIcon('fas fa-star');
      setNewHabitColor('blue-500');
      setIsCreateOpen(false);
      fetchHabits();
      toast.success('Habit created');
    } catch (err) {
      console.error('Error creating habit', err);
      toast.error('Failed to create habit');
    }
  };

  const dateStrip = Array.from({ length: 5 }, (_, i) => addDays(startOfToday(), i));

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white overflow-hidden font-sans">
      <Toaster position="bottom-center" />
      <div className="px-4 py-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold uppercase">{format(selectedDate, 'EEEE')}</h1>
          <p className="text-gray-400 text-sm mt-1">{format(selectedDate, 'MMM d')}</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
          <i className="fas fa-plus text-lg"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {dateStrip.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <div key={date.toString()} onClick={() => setSelectedDate(date)} className="text-center flex-shrink-0 relative cursor-pointer">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'bg-gray-800 text-gray-400'}`}>
                  <span className="text-xs font-semibold leading-tight">{format(date, 'EEE')}<br/><span className="text-lg">{format(date, 'd')}</span></span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
            <i className="fas fa-sun text-yellow-400 mr-2"></i> Morning
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <i className="fas fa-cloud-sun text-orange-200 mr-2"></i> Afternoon
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
            <i className="fas fa-moon text-purple-400 mr-2"></i> Evening
          </button>
        </div>

        <div className="space-y-4">
          {habits.map((habit) => {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const isCompleted = habit.completedDates.includes(dateStr);
            return (
              <div key={habit._id} className="group relative">
                <div className={`rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 border border-transparent ${isCompleted ? `bg-blue-600 shadow-lg shadow-blue-900/50` : 'bg-gray-800 hover:border-gray-700'}`}>
                  <div className="flex-1 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-black/20 text-xl`}>
                      <i className={habit.icon || "fas fa-star"}></i>
                    </div>
                    <span className={`font-semibold text-lg ${isCompleted ? 'text-white' : 'text-gray-200'}`}>{habit.name}</span>
                  </div>

                  <button onClick={() => toggleHabit(habit._id)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-white border-white text-blue-600 scale-110' : 'border-gray-500 hover:border-blue-400'}`}>
                    {isCompleted && <i className="fas fa-check text-sm font-bold"></i>}
                  </button>
                </div>
              </div>
            );
          })}

          {habits.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p>No habits found. Click the + button to add one!</p>
            </div>
          )}
        </div>
      </div>

      {/* Render Create Habit Modal */}
      <CreateHabitModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        name={newHabitName}
        setName={setNewHabitName}
        icon={newHabitIcon}
        setIcon={setNewHabitIcon}
        color={newHabitColor}
        setColor={setNewHabitColor}
        onSubmit={createHabit}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavIcon icon="fas fa-calendar" label="Today" active />
          <NavIcon icon="fas fa-road" label="Journey" />
          <NavIcon icon="fas fa-chart-bar" label="History" />
          <NavIcon icon="fas fa-user" label="Me" />
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, label, active }) {
  return (
    <button className={`flex flex-col items-center gap-1 transition ${active ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
      <i className={`${icon} text-xl`}></i>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}

export default App;

function CreateHabitModal({ open, onClose, name, setName, icon, setIcon, color, setColor, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Create Habit</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. Read Book" />
          </div>

          <div>
            <label className="text-sm text-gray-300">Icon (FontAwesome class)</label>
            <input value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. fas fa-book" />
          </div>

          <div>
            <label className="text-sm text-gray-300">Color (Tailwind color token)</label>
            <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. blue-500" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white text-sm">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
              <i className="fas fa-sun text-yellow-400 mr-2"></i> Morning
            </button>
            <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 whitespace-nowrap">
              <i className="fas fa-cloud-sun text-orange-200 mr-2"></i> Afternoon
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium hover:bg-gray-700 whitespace-nowrap">
              <i className="fas fa-moon text-purple-400 mr-2"></i> Evening
            </button>
          </div>

          <div className="space-y-4">
            {habits.map((habit) => {
              const dateStr = format(selectedDate, 'yyyy-MM-dd');
              const isCompleted = habit.completedDates.includes(dateStr);
              return (
                <div key={habit._id} className="group relative">
                  <div className={`rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 border border-transparent ${isCompleted ? `bg-blue-600 shadow-lg shadow-blue-900/50` : 'bg-gray-800 hover:border-gray-700'}`}>
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-black/20 text-xl`}>
                        <i className={habit.icon || "fas fa-star"}></i>
                      </div>
                      <span className={`font-semibold text-lg ${isCompleted ? 'text-white' : 'text-gray-200'}`}>{habit.name}</span>
                    </div>

                    <button onClick={() => toggleHabit(habit._id)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-white border-white text-blue-600 scale-110' : 'border-gray-500 hover:border-blue-400'}`}>
                      {isCompleted && <i className="fas fa-check text-sm font-bold"></i>}
                    </button>
                  </div>
                </div>
              );
            })}

            {habits.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p>No habits found. Click the + button to add one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Render Create Habit Modal */}
        <CreateHabitModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          name={newHabitName}
          setName={setNewHabitName}
          icon={newHabitIcon}
          setIcon={setNewHabitIcon}
          color={newHabitColor}
          setColor={setNewHabitColor}
          onSubmit={createHabit}
        />

        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <NavIcon icon="fas fa-calendar" label="Today" active />
            <NavIcon icon="fas fa-road" label="Journey" />
            <NavIcon icon="fas fa-chart-bar" label="History" />
            <NavIcon icon="fas fa-user" label="Me" />
          </div>
        </div>
      </div>
    );
  }

  function NavIcon({ icon, label, active }) {
    return (
      <button className={`flex flex-col items-center gap-1 transition ${active ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
        <i className={`${icon} text-xl`}></i>
        <span className="text-[10px] font-medium tracking-wide">{label}</span>
      </button>
    );
  }

  export default App;

  // Create Habit Modal Component
  function CreateHabitModal({ open, onClose, name, setName, icon, setIcon, color, setColor, onSubmit }) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Create Habit</h3>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm text-gray-300">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. Read Book" />
            </div>

            <div>
              <label className="text-sm text-gray-300">Icon (FontAwesome class)</label>
              <input value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. fas fa-book" />
            </div>

            <div>
              <label className="text-sm text-gray-300">Color (Tailwind color token)</label>
              <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" placeholder="e.g. blue-500" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-sm">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white text-sm">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
