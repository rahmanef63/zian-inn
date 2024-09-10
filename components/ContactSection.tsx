'use client'
import { useState, useEffect } from 'react'
import BookingForm from './BookingForm'
import ShimmerButton from './magicui/shimmer-button'

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export default function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const openBookingForm = () => {
      setIsOpen(true);
    };
    onOpenBooking = openBookingForm;
  }, [onOpenBooking]);

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