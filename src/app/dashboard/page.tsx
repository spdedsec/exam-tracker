"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Target, TrendingUp, Award, BookOpen, Users } from 'lucide-react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const currentStreak = 7
  void currentStreak

  // Generate calendar week
  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: endOfWeek(selectedDate)
  })

  // Chart data
  const examTypeData = [
    { name: 'UPSC CGL', value: 65, color: '#3B82F6' },
    { name: 'SSC CGL', value: 30, color: '#10B981' },
    { name: 'SSC CHSL', value: 25, color: '#F59E0B' },
  ]

  const weeklyData = [
    { day: 'Mon', hours: 3 },
    { day: 'Tue', hours: 4.5 },
    { day: 'Wed', hours: 2 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
  ]

  // Mock study sessions for the week
  const weeklySessions = [
    {
      id: '1',
      examType: 'UPSC CGL',
      topic: 'General Studies - Indian Constitution',
      date: new Date('2024-11-18'),
      hours: 2,
      type: 'study'
    },
    {
      id: '2',
      examType: 'SSC CGL',
      topic: 'Reasoning - Logical Sequences',
      date: new Date('2024-11-18'),
      hours: 1.5,
      type: 'revision'
    },
    {
      id: '3',
      examType: 'UPSC CGL',
      topic: 'Quantitative Aptitude - Time and Work',
      date: new Date('2024-11-19'),
      hours: 3,
      type: 'study'
    },
    {
      id: '4',
      examType: 'SSC CHSL',
      topic: 'General Studies - Current Affairs',
      date: new Date('2024-11-19'),
      hours: 1,
      type: 'study'
    }
  ].filter(session => session.date >= startOfWeek(selectedDate) && session.date <= endOfWeek(selectedDate))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Track your progress and performance
          </p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              <StatCard
                icon={Calendar}
                title="Study Days"
                value="45"
                change="+12%"
                color="text-blue-600"
                bgColor="bg-blue-50 dark:bg-blue-950/20"
              />
              <StatCard
                icon={Clock}
                title="Total Hours"
                value="245"
                change="+8%"
                color="text-green-600"
                bgColor="bg-green-50 dark:bg-green-950/20"
              />
              <StatCard
                icon={Target}
                title="Topics Completed"
                value="38"
                change="+15%"
                color="text-purple-600"
                bgColor="bg-purple-50 dark:bg-purple-950/20"
              />
              <StatCard
                icon={Award}
                title="Current Streak"
                value="7 days"
                change="+2"
                color="text-orange-600"
                bgColor="bg-orange-50 dark:bg-orange-950/20"
              />
            </motion.div>

            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Weekly Calendar
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    ←
                  </button>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {format(startOfWeek(selectedDate), 'MMM dd')} - {format(endOfWeek(selectedDate), 'MMM dd')}
                  </span>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div key={day.toString()} className="text-center">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-500 mb-2">
                      {format(day, 'EEE')}
                    </div>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium
                      ${isToday(day)
                        ? 'bg-slate-900 text-white'
                        : isSameDay(day, new Date())
                          ? 'border-2 border-slate-400 text-slate-900 dark:text-slate-100'
                          : 'text-slate-700 dark:text-slate-300'
                      }
                    `}
                    >
                      {format(day, 'd')}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {weeklySessions.filter(s => isSameDay(s.date, day)).length} sessions
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Study Hours Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Weekly Study Hours
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Recent Study Sessions
              </h2>
              <div className="space-y-4">
                {weeklySessions.slice(0, 4).map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className={`p-2 rounded-lg
                      ${session.type === 'study' ? 'bg-blue-100 dark:bg-blue-950/20' : 'bg-green-100 dark:bg-green-950/20'}
                    `}
                    >
                      {session.type === 'study' ? (
                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">
                        {session.topic}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {session.examType} • {format(session.date, 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {session.hours}h
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {session.type}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            {/* Exam Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Exam Distribution
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={examTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {examTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Performance Insights
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Most Studied
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    General Studies
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Average Session
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    3.2 hours
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Best Performing
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    UPSC CGL
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Exams */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Upcoming Exams
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: 'UPSC CGL',
                    nextDeadline: 'Application Form Starts',
                    date: 'Dec 15, 2024',
                    daysLeft: 14,
                    urgency: 'high'
                  },
                  {
                    name: 'SSC CGL',
                    nextDeadline: 'Application Form Ends',
                    date: 'Jan 5, 2025',
                    daysLeft: 29,
                    urgency: 'medium'
                  },
                  {
                    name: 'SSC CHSL',
                    nextDeadline: 'Final Registration',
                    date: 'Feb 10, 2025',
                    daysLeft: 59,
                    urgency: 'low'
                  }
                ].map((exam, index) => (
                  <motion.div
                    key={exam.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {exam.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full
                        ${exam.urgency === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400' :
                          exam.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400'}
                      `}
                      >
                        {exam.daysLeft} days
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {exam.nextDeadline} • {exam.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value, change, color, bgColor }: {
  icon: any
  title: string
  value: string
  change: string
  color: string
  bgColor: string
}) {
  return (
    <div className="stats-card">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {value}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <TrendingUp className="w-3 h-3 text-green-600" />
        <span className="text-xs text-green-600 font-medium">
          {change} this week
        </span>
      </div>
    </div>
  )
}