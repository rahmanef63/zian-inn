'use client'

import { useState } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "./ui/button"
import { Calendar } from './ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { cn } from '../lib/utils'

export function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd MMM yyyy")} - {format(date.to, "dd MMM yyyy")}
              </>
            ) : (
              format(date.from, "dd MMM yyyy")
            )
          ) : (
            <span>Pilih tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}