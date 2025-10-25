"use client"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
export default function CalendarComponent() {
 const [date, setDate] = useState<Date | undefined>(new Date())
 return (
    <Calendar 
    mode="single"
    selected={date}
    onSelect={setDate}
    captionLayout="dropdown"
    className="rounded-md border shadow-sm"
    />
 )
}
