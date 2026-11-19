"use client"

import { StudySession, SyllabusTopic, StudyGoal, ExamCalendar } from '@/types'

const STORAGE_KEYS = {
  STUDY_SESSIONS: 'exam_tracker_study_sessions',
  SYLLABUS_TOPICS: 'exam_tracker_syllabus_topics',
  STUDY_GOALS: 'exam_tracker_study_goals',
  EXAM_CALENDARS: 'exam_tracker_exam_calendars',
  USER_PREFERENCES: 'exam_tracker_user_preferences'
} as const

export class StorageService {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      if (!item) return defaultValue
      
      const parsed = JSON.parse(item)
      return parsed as T
    } catch (error) {
      console.error(`Error reading from localStorage key ${key}:`, error)
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    
    try {
      const stringified = JSON.stringify(value)
      localStorage.setItem(key, stringified)
    } catch (error) {
      console.error(`Error writing to localStorage key ${key}:`, error)
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }

  static clear(): void {
    if (typeof window === 'undefined') return
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
  }

  // Study Sessions
  static getStudySessions(): StudySession[] {
    return this.get(STORAGE_KEYS.STUDY_SESSIONS, [])
  }

  static saveStudySessions(sessions: StudySession[]): void {
    this.set(STORAGE_KEYS.STUDY_SESSIONS, sessions)
  }

  static addStudySession(session: StudySession): void {
    const sessions = this.getStudySessions()
    sessions.push(session)
    this.saveStudySessions(sessions)
  }

  static updateStudySession(session: StudySession): void {
    const sessions = this.getStudySessions()
    const index = sessions.findIndex(s => s.id === session.id)
    if (index !== -1) {
      sessions[index] = session
      this.saveStudySessions(sessions)
    }
  }

  static deleteStudySession(id: string): void {
    const sessions = this.getStudySessions()
    this.saveStudySessions(sessions.filter(s => s.id !== id))
  }

  // Syllabus Topics
  static getSyllabusTopics(): SyllabusTopic[] {
    return this.get(STORAGE_KEYS.SYLLABUS_TOPICS, [])
  }

  static saveSyllabusTopics(topics: SyllabusTopic[]): void {
    this.set(STORAGE_KEYS.SYLLABUS_TOPICS, topics)
  }

  static addSyllabusTopic(topic: SyllabusTopic): void {
    const topics = this.getSyllabusTopics()
    topics.push(topic)
    this.saveSyllabusTopics(topics)
  }

  static updateSyllabusTopic(topic: SyllabusTopic): void {
    const topics = this.getSyllabusTopics()
    const index = topics.findIndex(t => t.id === topic.id)
    if (index !== -1) {
      topics[index] = topic
      this.saveSyllabusTopics(topics)
    }
  }

  // Study Goals
  static getStudyGoals(): StudyGoal[] {
    return this.get(STORAGE_KEYS.STUDY_GOALS, [])
  }

  static saveStudyGoals(goals: StudyGoal[]): void {
    this.set(STORAGE_KEYS.STUDY_GOALS, goals)
  }

  static addStudyGoal(goal: StudyGoal): void {
    const goals = this.getStudyGoals()
    goals.push(goal)
    this.saveStudyGoals(goals)
  }

  static updateStudyGoal(goal: StudyGoal): void {
    const goals = this.getStudyGoals()
    const index = goals.findIndex(g => g.id === goal.id)
    if (index !== -1) {
      goals[index] = goal
      this.saveStudyGoals(goals)
    }
  }

  // Exam Calendars
  static getExamCalendars(): ExamCalendar[] {
    return this.get(STORAGE_KEYS.EXAM_CALENDARS, [])
  }

  static saveExamCalendars(calendars: ExamCalendar[]): void {
    this.set(STORAGE_KEYS.EXAM_CALENDARS, calendars)
  }

  // User Preferences
  static getUserPreferences() {
    return this.get(STORAGE_KEYS.USER_PREFERENCES, {
      theme: 'system',
      notifications: true,
      dailyReminder: true,
      reminderTime: '19:00'
    })
  }

  static saveUserPreferences(preferences: any): void {
    this.set(STORAGE_KEYS.USER_PREFERENCES, preferences)
  }

  // Export to JSON
  static exportData(): string {
    const data = {
      studySessions: this.getStudySessions(),
      syllabusTopics: this.getSyllabusTopics(),
      studyGoals: this.getStudyGoals(),
      examCalendars: this.getExamCalendars(),
      userPreferences: this.getUserPreferences()
    }
    return JSON.stringify(data, null, 2)
  }

  // Import from JSON
  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString)
      this.saveStudySessions(data.studySessions || [])
      this.saveSyllabusTopics(data.syllabusTopics || [])
      this.saveStudyGoals(data.studyGoals || [])
      this.saveExamCalendars(data.examCalendars || [])
      this.saveUserPreferences(data.userPreferences || {})
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }
}