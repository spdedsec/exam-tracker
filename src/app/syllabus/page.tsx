"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, BookOpen, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import { SyllabusTopic, SubjectData } from '@/types/syllabus'

export default function SyllabusPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddTopic, setShowAddTopic] = useState(false)

  const examSubjects: Record<string, SubjectData> = {
    'UPSC CGL': {
      id: 'upsc-cgl',
      subjects: {
        'General Studies': {
          id: 'gs',
          chapters: [
            {
              id: 'indian-ethos',
              title: 'Indian Ethos',
              estimatedHours: 12,
              status: 'completed',
              progress: 100,
              lastRevised: new Date('2024-11-10'),
              topics: [
                'Culture and Heritage',
                'Constitution and Governance',
                'Indian Economy',
                'Science and Technology'
              ]
            },
            {
              id: 'world-affairs',
              title: 'World Affairs',
              estimatedHours: 15,
              status: 'in-progress',
              progress: 60,
              lastRevised: new Date('2024-11-20'),
              topics: [
                'International Relations',
                'Global Economics',
                'Current Affairs',
                'United Nations'
              ]
            },
            {
              id: 'polity',
              title: 'Polity',
              estimatedHours: 18,
              status: 'not-started',
              progress: 0,
              topics: [
                'Constitution',
                'Executive Powers',
                'Legislative Powers',
                'Judicial Powers'
              ]
            }
          ]
        },
        'Quantitative Aptitude': {
          id: 'quant',
          chapters: [
            {
              id: 'arithmetic',
              title: 'Arithmetic',
              estimatedHours: 20,
              status: 'completed',
              progress: 100,
              lastRevised: new Date('2024-10-15'),
              topics: [
                'Number Systems',
                'Percentages',
                'Time and Work',
                'Profit and Loss'
              ]
            }
          ]
        }
      }
    },
    'SSC CGL': {
      id: 'ssc-cgl',
      subjects: {
        'General Studies': {
          id: 'gs',
          chapters: [
            {
              id: 'indian-culture',
              title: 'Indian Culture',
              estimatedHours: 10,
              status: 'completed',
              progress: 100,
              lastRevised: new Date('2024-11-05'),
              topics: [
                'Art and Culture',
                'Architecture',
                'Famous Personalities',
                'Historical Events'
              ]
            }
          ]
        }
      }
    },
    'SSC CHSL': {
      id: 'ssc-chsl',
      subjects: {
        'General Studies': {
          id: 'gs',
          chapters: [
            {
              id: 'general-knowledge',
              title: 'General Knowledge',
              estimatedHours: 8,
              status: 'in-progress',
              progress: 40,
              lastRevised: new Date('2024-11-18'),
              topics: [
                'Current Affairs',
                'General Science',
                'History & Geography',
                'Economics'
              ]
            }
          ]
        }
      }
    }
  }

  const filteredSubjects = Object.entries(examSubjects)
    .filter(([examId, subjectData]) => {
      if (selectedExam !== 'all' && examId !== selectedExam) return false
      return true
    })
    .map(([examId, subjectData]) => {
      const filteredSubjectsData = Object.entries(subjectData.subjects)
        .filter(([subjectId, subject]) => {
          if (selectedSubject !== 'all' && subjectId !== selectedSubject) return false
          if (filterStatus !== 'all') {
            const subjectStatus = subject.chapters.some(chapter => chapter.status === filterStatus) ? filterStatus : 'not-started'
            if (subjectStatus !== filterStatus) return false
          }
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            return subject.title.toLowerCase().includes(searchLower) ||
                   subject.chapters.some(chapter => chapter.title.toLowerCase().includes(searchLower))
          }
          return true
        })

      return {
        examId,
        subjects: filteredSubjectsData.reduce((acc, [id, subject]) => {
          acc[id] = subject
          return acc
        }, {} as any)
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Syllabus Tracker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Track your progress across UPSC CGL, SSC CGL & SSC CHSL
          </p>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-panel rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Filters
              </h2>
              
              <div className="space-y-4">
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
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="all">All Subjects</option>
                    <option value="gs">General Studies</option>
                    <option value="quant">Quantitative Aptitude</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="not-started">Not Started</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setShowAddTopic(!showAddTopic)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Topic
                </button>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-xl p-6 mb-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search topics, chapters, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </motion.div>
            
            <AnimatePresence>
              {showAddTopic && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-panel rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Add New Topic
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Exam Type
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          <option>UPSC CGL</option>
                          <option>SSC CGL</option>
                          <option>SSC CHSL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Subject
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          <option>General Studies</option>
                          <option>Quantitative Aptitude</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddTopic(false)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {filteredSubjects.map((examData) => (
              <motion.div
                key={examData.examId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel rounded-xl p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  {examData.examId === 'upsc-cgl' ? 'UPSC CGL' : 
                   examData.examId === 'ssc-cgl' ? 'SSC CGL' : 'SSC CHSL'}
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Object.values(examData.subjects).map((subject) => (
                    <div key={subject.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {subject.title}
                        </h3>
                        <BookOpen className="w-5 h-5 text-slate-500" />
                      </div>
                      
                      <div className="space-y-3">
                        {subject.chapters.map((chapter) => (
                          <ChapterCard key={chapter.id} chapter={chapter} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChapterCard({ chapter }: { chapter: any }) {
  const getStatusIcon = () => {
    switch (chapter.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <BookOpen className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusColor = () => {
    switch (chapter.status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
      case 'in-progress':
        return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
      default:
        return 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-3 rounded-lg border ${getStatusColor()} transition-all cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          {chapter.title}
        </h4>
        {getStatusIcon()}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>{chapter.estimatedHours} hours</span>
          <span>{chapter.progress}%</span>
        </div>
        
        <div className="progress-bar">
          <motion.div
            className="progress-fill bg-current"
            initial={{ width: 0 }}
            animate={{ width: `${chapter.progress}%` }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        
        <div className="text-xs text-slate-500 dark:text-slate-500">
          {chapter.lastRevised && `Last revised: ${chapter.lastRevised.toLocaleDateString()}`}
        </div>
      </div>
    </motion.div>
  )
}