"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, Target, Users, TrendingUp, Plus } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { StudySession } from '@/types'

export default function HomePage() {
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [showAddSession, setShowAddSession] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockSessions: StudySession[] = [
      {
        id: '1',
        examType: 'UPSC CGL',
        date: new Date('2024-11-15'),
        hours: 4,
        topics: ['General Studies', 'Quantitative Aptitude'],
        notes: 'Completed GS paper and started QA section',
        revisions: [
          { id: 'r1', date: new Date('2024-11-16'), hours: 1, topics: ['General Studies'], type: 'partial' }
        ]
      },
      {
        id: '2',
        examType: 'SSC CGL',
        date: new Date('2024-11-14'),
        hours: 3,
        topics: ['Reasoning', 'English'],
        notes: 'Focused on logical reasoning and comprehension',
        revisions: []
      }
    ]
    setStudySessions(mockSessions)
    setCurrentStreak(7)
    setTotalHours(45)
  }, [])

  const totalDays = Math.max(...studySessions.map(s => s.date.getTime())) - 
                   Math.min(...studySessions.map(s => s.date.getTime()))
  const studyDays = studySessions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Exam Tracker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Comprehensive preparation tracking for UPSC CGL, SSC CGL & CHSL
          </p>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Track your progress, manage syllabus, and optimize study sessions
          </p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <StatsCards 
              currentStreak={currentStreak}
              totalHours={totalHours}
              studyDays={studyDays}
              totalDays={totalDays}
            />
            
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 glass-panel rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Recent Study Sessions
                </h2>
                <button
                  onClick={() => setShowAddSession(!showAddSession)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Session
                </button>
              </div>
              
              {studySessions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    No study sessions yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Start tracking your preparation journey
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studySessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {session.examType}
                        </h3>
                        <span className="text-sm text-slate-500">
                          {format(session.date, 'MMM dd, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.hours}h
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {session.topics.length} topics
                        </div>
                      </div>
                      
                      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                        {session.notes}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Quick Actions
              </h2>
              <nav className="space-y-3">
                {[
                  { href: '/dashboard', label: 'Dashboard', icon: TrendingUp },
                  { href: '/syllabus', label: 'Syllabus Tracker', icon: Target },
                  { href: '/schedule', label: 'Study Schedule', icon: Calendar },
                  { href: '/exams', label: 'Exam Details', icon: Users },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Exam Overview
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'UPSC CGL', status: 'Active', progress: 65, color: 'bg-blue-500' },
                  { name: 'SSC CGL', status: 'Paused', progress: 40, color: 'bg-green-500' },
                  { name: 'SSC CHSL', status: 'Planning', progress: 25, color: 'bg-purple-500' },
                ].map((exam, index) => (
                  <div key={exam.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {exam.name}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {exam.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className={`${exam.color} h-full rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${exam.progress}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}