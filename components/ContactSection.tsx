'use client'
import { useState } from 'react'
import BookingForm from './BookingForm'
import ShimmerButton from './magicui/shimmer-button'

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto flex justify-center items-center">
        <ShimmerButton onClick={() => setIsOpen(true)} className="mb-4 w-full">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Buka Form Booking
          </span>
        </ShimmerButton>
        <BookingForm
          isOpen={isOpen} 
          onClose={handleClose}
          onSubmit={handleSubmit} 
        />
      </div>
    </section>
  )
}