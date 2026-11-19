"use client"

import { Inter, JetBrains_Mono } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Exam Tracker - UPSC & SSC Preparation',
  description: 'Comprehensive exam tracker for UPSC CGL, SSC CGL & CHSL with syllabus, study tracking, and analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}