"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isToday } from 'date-fns'
import { ScheduleEntry, ScheduleFormData } from '@/types/schedule'

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([
    {
      id: '1',
      examType: 'UPSC CGL',
      title: 'Complete Indian Polity Chapter',
      description: 'Study and revise Indian Constitution, Fundamental Rights, Directive Principles',
      scheduledDate: addDays(new Date(), 2),
      duration: 3,
      priority: 'high',
      completed: false,
      category: 'General Studies'
    },
    {
      id: '2',
      examType: 'SSC CGL',
      title: 'Reasoning - Logical Sequences Practice',
      description: 'Complete 50 questions on logical sequences and syllogisms',
      scheduledDate: addDays(new Date(), 3),
      duration: 2,
      priority: 'medium',
      completed: false,
      category: 'Reasoning'
    },
    {
      id: '3',
      examType: 'UPSC CGL',
      title: 'Quantitative Aptitude - Time and Work',
      description: 'Master time and work concepts with practice questions',
      scheduledDate: addDays(new Date(), 4),
      duration: 4,
      priority: 'high',
      completed: true,
      category: 'Quantitative Aptitude'
    }
  ])

  const weekStart = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const filteredEntries = scheduleEntries.filter(entry => {
    if (selectedExam !== 'all' && entry.examType !== selectedExam) return false
    return true
  })

  const handleDateClick = (date: Date) => {
    // Add a new entry for the clicked date
    const newEntry: ScheduleEntry = {
      id: Date.now().toString(),
      examType: selectedExam === 'all' ? 'UPSC CGL' : selectedExam,
      title: 'New Study Session',
      description: '',
      scheduledDate: date,
      duration: 2,
      priority: 'medium',
      completed: false,
      category: 'General Studies'
    }
    setScheduleEntries([...scheduleEntries, newEntry])
    setShowAddEntry(false)
  }

  const toggleComplete = (id: string) => {
    setScheduleEntries(entries =>
      entries.map(entry =>
        entry.id === id ? { ...entry, completed: !entry.completed } : entry
      )
    )
  }

  const deleteEntry = (id: string) => {
    setScheduleEntries(entries => entries.filter(entry => entry.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-950/20'
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-950/20'
      default: return 'border-slate-500 bg-slate-50 dark:bg-slate-950/20'
    }
  }

  const getEntriesForDay = (date: Date) => {
    return filteredEntries.filter(entry =>
      entry.scheduledDate.toDateString() === date.toDateString()
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Study Schedule
          </h1>
          <equilibre class="text-lg text-slate-600 dark:text-slate-400">
            Plan and manage your exam preparation schedule
          </équilibre>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentDate(addWeeks(currentDate, -1))}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    ←
                  </button>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {format(weekStart, 'MMMM dd')} - {format(addDays(weekStart, 6), 'MMMM dd, yyyy')}
                  </h2>
                  <button
                    onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    →
                  </button>
                </div>
                <button
                  onClick={() => setShowAddEntry(!showAddEntry)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Entry
                </button>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {weekDays.map((day) => {
                  const dayEntries = getEntriesForDay(day)
                  const completedToday = dayEntries.filter(e => e.completed).length

                  return (
                    <motion.div
                      key={day.toString()}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer
                        ${isToday(day) ? 'border-slate-900 dark:border-slate-100' : 'border-slate-200 dark:border-slate-800'}
                        ${dayEntries.length > 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''}
                      `}
                      onClick={() => handleDateClick(day)}
                    >
                      <div className="text-center">
                        <div className={`text-sm font-medium mb-2
                          ${isToday(day) ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}
                        `}
                        >
                          {format(day, 'EEE')}
                        </div>
                        <div className={`text-lg font-bold mb-2
                          ${isToday(day) ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}
                        `}
                        >
                          {format(day, 'd')}
                        </div>
                        <div className="flex justify-center gap-1">
                          {dayEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className={`w-2 h-2 rounded-full
                                ${entry.completed ? 'bg-green-500' : 'bg-red-500'}
                              `}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {completedToday}/{dayEntries.length}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <AnimatePresence>
              {showAddEntry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="glass-panel rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Add New Schedule Entry
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Exam Type
                        </label>
                        <select
                          value={selectedExam}
                          onChange={(e) => setSelectedExam(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        >
                          <option value="all">All Exams</option>
                          <option value="UPSC CGL">UPSC CGL</option>
                          <option value="SSC CGL">SSC CGL</option>
                          <option value="SSC CHSL">SSC CHSL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Category
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          <option>General Studies</option>
                          <option>Quantitative Aptitude</option>
                          <option>Reasoning</option>
                          <option>English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Priority
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Duration (hours)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          placeholder="2"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Enter study title..."
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 h-20"
                        placeholder="Enter description..."
                      />
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Add Entry
                      </button>
                      <button
                        onClick={() => setShowAddEntry(false)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(entry.priority)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(entry.id)}
                        className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        {entry.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                      </button>
                      <h3 className={`font-semibold
                        ${entry.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'}
                      `}
                      >
                        {entry.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(entry.scheduledDate, 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {entry.duration} hours
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs">
                        {entry.category}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Today's Schedule
              </h2>
              <div className="space-y-3">
                {getEntriesForDay(new Date()).map((entry) => (
                  <div key={entry.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100">
                        {entry.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full
                        ${entry.completed ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400'}
                      `}
                      >
                        {entry.completed ? 'Done' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <span>{entry.duration}h</span>
                      <span>{entry.category}</span>
                      <span>{entry.examType}</span>
                    </div>
                  </div>
                ))}
                {getEntriesForDay(new Date()).length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-500 text-center py-4">
                    No scheduled entries for today
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Completed Today
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {getEntriesForDay(new Date()).filter(e => e.completed).length} / {getEntriesForDay(new Date()).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Total This Week
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {filteredEntries.length} entries
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    High Priority
                  </span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-semibold">
                    {filteredEntries.filter(e => e.priority === 'high' && !e.completed).length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}