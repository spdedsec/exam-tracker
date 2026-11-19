# Exam Tracker - UPSC & SSC Preparation

A comprehensive, fast, and visually appealing exam preparation tracker for UPSC CGL, SSC CGL & SSC CHSL exams. Built with Next.js, React, and TypeScript for optimal performance.

## Features

### 🎯 Core Features
- **Syllabus Tracker**: Comprehensive tracking of subjects and chapters for all three exams
- **Study Scheduler**: Visual calendar with drag-and-drop scheduling
- **Progress Analytics**: Real-time statistics and performance insights
- **Study Sessions**: Log and track study hours, topics, and revisions
- **Exam Information**: Complete details about exam dates, application deadlines, and eligibility
- **Goal Setting**: Set and track study goals and milestones
- **Dark/Light Theme**: Apple-inspired design with seamless theme switching
- **Offline Storage**: LocalStorage-based data persistence

### 📊 Dashboard
- Real-time statistics cards (streak, hours, days, progress)
- Weekly study hours chart
- Recent activity feed
- Exam distribution pie chart
- Quick actions and navigation

### 📚 Syllabus Management
- Hierarchical organization (Exams → Subjects → Chapters)
- Progress tracking with visual indicators
- Revision scheduling
- Estimated time planning
- Status tracking (Not Started/In Progress/Completed)

### 🗓️ Study Schedule
- Weekly calendar view with drag-and-drop
- Priority-based color coding
- Task completion tracking
- Study session logging
- Customizable categories

## Technology Stack

### Frontend
- **Next.js 15** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Zustand** - State management
- **SWR** - Data fetching

### Design Principles
- **Apple Design Language**: Clean, minimal, and intuitive interface
- **Performance First**: Optimized for fast loading and smooth interactions
- **Accessibility**: WCAG AA compliant
- **Responsive Design**: Works on all devices

## Installation

```bash
# Clone the repository
https://github.com/yourusername/exam-tracker.git

# Navigate to project directory
cd exam-tracker

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Usage

### Initial Setup
1. **Create Account**: Register for basic access
2. **Add Exams**: Select which exams you want to track (UPSC CGL, SSC CGL, SSC CHSL)
3. **Import Syllabus**: Upload or manually add syllabus topics
4. **Set Goals**: Define your target dates and goals

### Daily Usage
1. **Log Study Sessions**: Record what you studied, duration, and topics
2. **Update Progress**: Mark chapters as completed or in progress
3. **Review Schedule**: Check tomorrow's planned sessions
4. **Analyze Performance**: Review weekly statistics

### Data Management
- **Export**: Download your data as JSON
- **Import**: Restore data from JSON files
- **Backup**: Automatic localStorage backup
- **Privacy**: All data stored locally in your browser

## Project Structure

```
/src
  /app
    /api           # API routes
    /components    # React components
    /types         # TypeScript types
  /utils         # Utility functions
  /hooks         # Custom hooks
  /assets        # Static assets
```

## Features by Exam

### UPSC CGL
- **General Studies**: Indian Ethos, World Affairs, Polity
- **Quantitative Aptitude**: Arithmetic, Algebra, Geometry
- **Optional Subjects**: UPSC provides optional subject options

### SSC CGL
- **General Studies**: Indian Culture, History, Geography
- **Quantitative Aptitude**: Basic Mathematics, Data Interpretation
- **Reasoning Ability**: Logical sequences, analogies, coding-decoding

### SSC CHSL
- **General Studies**: Current Affairs, General Science, History & Geography
- **English Language**: Comprehension, Grammar, Vocabulary
- **Quantitative Aptitude**: Arithmetic, Algebra, Geometry

## Customization

### Themes
The application supports two themes:
- **Light Mode**: Clean white background with dark text
- **Dark Mode**: Dark background with light text

### Notifications
- Daily study reminders
- Goal achievement notifications
- Exam deadline alerts

### Accessibility
- Screen reader support
- Keyboard navigation
- High contrast mode

## Performance

### Optimization
- **Code Splitting**: Automatic chunk loading
- **Image Optimization**: Next.js image optimization
- **Caching**: Strategic data caching
- **Lazy Loading**: Component lazy loading

### Metrics
- **First Contentful Paint**: <2.0s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

## Contributing

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

### Best Practices
- Follow existing code style and conventions
- Write unit tests for new components
- Add TypeScript types for all props
- Keep components focused and reusable
- Use semantic HTML

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute.

## Support

### Issues
Report bugs and feature requests through GitHub Issues.

### Documentation
- [Documentation](https://docs.exam-tracker.com)
- [API Reference](https://api.exam-tracker.com)

### Community
- [Discord](https://discord.gg/exam-tracker)
- [Twitter](https://twitter.com/exam_tracker)

## Future Enhancements

### Planned Features
- **Social Learning**: Connect with other exam preparers
- **Flashcard System**: Interactive learning materials
- **AI Assistant**: Smart study recommendations
- **Multi-device Sync**: Cloud-based data synchronization
- **Gamification**: Points, badges, and leaderboards

### Roadmap
- Q1 2025: Advanced analytics and reporting
- Q2 2025: Mobile app release
- Q3 2025: AI-powered study planner
- Q4 2025: Integration with external study materials

## Acknowledgments

Special thanks to:
- All contributors and beta testers
- The open-source community for amazing libraries
- UPSC and SSC for official syllabus information
- Students who inspired this project

## Contact

For support, suggestions, or collaborations:
- Email: hello@exam-tracker.com
- GitHub: https://github.com/yourusername/exam-tracker

---

_Built with ❤️ for exam aspirants across India_ 🚀