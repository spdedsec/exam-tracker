export interface ScheduleEntry {
  id: string
  examType: 'UPSC CGL' | 'SSC CGL' | 'SSC CHSL'
  title: string
  description: string
  scheduledDate: Date
  duration: number
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  category: string
}