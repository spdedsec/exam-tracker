"use client"

import { motion } from 'framer-motion'
import { Flame, Clock, Calendar, Target } from 'lucide-react'

interface StatsCardsProps {
  currentStreak: number
  totalHours: number
  studyDays: number
  totalDays: number
}

export function StatsCards({ currentStreak, totalHours, studyDays, totalDays }: StatsCardsProps) {
  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: Clock,
      label: 'Total Study Time',
      value: `${totalHours} hours`,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Calendar,
      label: 'Study Days',
      value: `${studyDays} days`,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: Target,
      label: 'Total Period',
      value: `${totalDays} days`,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="stats-card"
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}