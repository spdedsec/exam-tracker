export interface StudySession {
  id: string
  examType: 'UPSC CGL' | 'SSC CGL' | 'SSC CHSL'
  date: Date
  hours: number
  topics: string[]
  notes?: string
  revisions?: RevisionEntry[]
}

export interface RevisionEntry {
  id: string
  date: Date
  hours: number
  topics: string[]
  type: 'partial' | 'full'
}

export interface SyllabusTopic {
  id: string
  examType: 'UPSC CGL' | 'SSC CGL' | 'SSC CHSL'
  subject: string
  chapter: string
  description: string
  estimatedHours: number
  status: 'not-started' | 'in-progress' | 'completed'
  lastRevised?: Date
  nextRevision?: Date
  progress?: number // percentage
}

export interface StudyGoal {
  id: string
  examType: 'UPSC CGL' | 'SSC CGL' | 'SSC CHSL'
  title: string
  description: string
  targetDate?: Date
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  tags?: string[]
}

export interface ExamCalendar {
  id: string
  examType: 'UPSC CGL' | 'SSC CGL' | 'SSC CHSL'
  examName: string
  applicationStart: Date
  applicationEnd: Date
  examDate: Date
  resultDate: Date
  website: string
  eligibility: string
}