'use client'

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {Button} from "@nextui-org/react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0)) // January 2025
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const previousMonth = new Date(year, month, 0)
    const daysInPreviousMonth = previousMonth.getDate()
    
    const days = []
    
    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPreviousMonth - i,
        isCurrentMonth: false
      })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true
      })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false
      })
    }
    
    return days
  }
  const isToday = (date: number, isCurrentMonth: boolean) => {
    const today = new Date()
    return (
      isCurrentMonth &&
      date === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex  justify-between mb-6">
      <h3 className="graph_heading">{monthYear}</h3>
        {/* <h2 className="text-xl font-bold">{monthYear}</h2> */}
        <div className="flex gap-2">
        <Button 
  size="sm"
  className=""
  onClick={() => setCurrentDate(new Date())} // Set currentDate to today's date
>
  Today
</Button>
          <div className="flex gap-1">
            <Button
           size="sm"
              className=""
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
            size="sm"
              className=""
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysOfWeek.map((day) => (
          <div
            key={day}
           className="bg-white p-1 sm:p-2 text-center text-xs sm:text-sm"
          >
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
          key={index}
          className={`p-2 sm:p-4 text-center ${
            day.isCurrentMonth ? '' : 'text-gray-400'
          } ${
            isToday(day.date, day.isCurrentMonth)
              ? '' // Change background to gray if today
              : 'bg-white' // Default background color
          }`}
        >
           <span className="text-xs sm:text-base">{day.date}</span>
           
          </div>
        ))}
      </div>
    </div>
  )
}

