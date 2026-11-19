"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, BookOpen, Download, ExternalLink, CheckCircle } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { ExamCalendar } from '@/types'

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string>('all')

  const examCalendars: ExamCalendar[] = [
    {
      id: 'upsc-cgl-2024',
      examType: 'UPSC CGL',
      examName: 'Combined Graduate Level Examination',
      applicationStart: new Date('2024-08-01'),
      applicationEnd: new Date('2024-08-30'),
      examDate: new Date('2024-12-15'),
      resultDate: new Date('2025-04-30'),
      website: 'https://www.upsc.gov.in',
      eligibility: 'Graduation in any discipline'
    },
    {
      id: 'ssc-cgl-2024',
      examType: 'SSC CGL',
      examName: 'Combined Graduate Level Examination',
      applicationStart: new Date('2024-08-15'),
      applicationEnd: new Date('2024-09-15'),
      examDate: new Date('2024-11-20'),
      resultDate: new Date('2025-01-30'),
      website: 'https://www.ssc.nic.in',
      eligibility: 'Graduation in any discipline'
    },
    {
      id: 'ssc-chsl-2024',
      examType: 'SSC CHSL',
      examName: 'Combined Higher Secondary Level Examination',
      applicationStart: new Date('2024-09-01'),
      applicationEnd: new Date('2024-10-15'),
      examDate: new Date('2024-12-05'),
      resultDate: new Date('2025-03-15'),
      website: 'https://www.ssc.nic.in',
      eligibility: '12th Class with any graduation or equivalent'
    }
  ]

  const filteredCalendars = selectedExam === 'all' 
    ? examCalendars 
    : examCalendars.filter(calendar => calendar.examType === selectedExam)

  const getStatus = (exam: ExamCalendar) => {
    const today = new Date()
    if (today < exam.applicationStart) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400' }
    if (today >= exam.applicationStart && today <= exam.applicationEnd) return { status: 'In Progress', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400' }
    if (today > exam.applicationEnd && today < exam.examDate) return { status: 'Closed', color: 'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400' }
    if (today >= exam.examDate) return { status: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' }
    return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400' }
  }

  const getDaysLeft = (date: Date) => {
    const today = new Date()
    return differenceInDays(date, today)
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
            Exam Details
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Comprehensive information about UPSC CGL, SSC CGL & SSC CHSL
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Filter by Exam:
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedExam('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedExam === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }
                `}
              >
                All
              </button>
              <button
                onClick={() => setSelectedExam('UPSC CGL')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedExam === 'UPSC CGL'
                    ? 'bg-blue-900 text-white'
                    : 'bg-blue-200 text-blue-800 hover:bg-blue-300 dark:bg-blue-950/20 dark:text-blue-400 dark:hover:bg-blue-950/40'
                  }
                `}
              >
                UPSC CGL
              </button>
              <button
                onClick={() => setSelectedExam('SSC CGL')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedExam === 'SSC CGL'
                    ? 'bg-green-900 text-white'
                    : 'bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-950/40'
                  }
                `}
              >
                SSC CGL
              </button>
              <button
                onClick={() => setSelectedExam('SSC CHSL')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedExam === 'SSC CHSL'
                    ? 'bg-purple-900 text-white'
                    : 'bg-purple-200 text-purple-800 hover:bg-purple-300 dark:bg-purple-950/20 dark:text-purple-400 dark:hover:bg-purple-950/40'
                  }
                `}
              >
                SSC CHSL
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCalendars.map((exam, index) => {
            const status = getStatus(exam)
            const daysLeft = getDaysLeft(exam.applicationEnd)

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-panel rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                  >
                    {status.status}
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-500">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Application Closed'}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {exam.examName}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {exam.examType}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                    <div className="text-sm">
                      <span className="font-medium">Application:</span><br/>
                      <span className="text-slate-600 dark:text-slate-400">
                        {format(exam.applicationStart, 'MMM dd, yyyy')} - {format(exam.applicationEnd, 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                    <div className="text-sm">
                      <span className="font-medium">Exam Date:</span><br/>
                      <span className="text-slate-600 dark:text-slate-400">
                        {format(exam.examDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                    <div className="text-sm">
                      <span className="font-medium">Results:</span><br/>
                      <span className="text-slate-600 dark:text-slate-400">
                        {format(exam.resultDate, 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                    <div className="text-sm">
                      <span className="font-medium">Eligibility:</span><br/>
                      <span className="text-slate-600 dark:text-slate-400">
                        {exam.eligibility}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={exam.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official Website
                  </a>
                  <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}