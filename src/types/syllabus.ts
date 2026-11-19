export interface SubjectData {
  id: string
  title: string
  chapters: ChapterData[]
}

export interface ChapterData {
  id: string
  title: string
  estimatedHours: number
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  lastRevised?: Date
  topics: string[]
}