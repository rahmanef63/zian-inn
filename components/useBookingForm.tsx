import { useState } from 'react'

interface FormData {
  name: string;
  bookingType: string;
  checkInOutDate: { from: Date | undefined; to: Date | undefined };
  duration: string;
  startDate: Date | undefined;
  tenants: number;
}

export function useBookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bookingType: 'kontrakan',
    checkInOutDate: { from: undefined, to: undefined },
    duration: '',
    startDate: undefined,
    tenants: 1,
  })

  const handleChange = (field: keyof FormData, value: string | Date | { from: Date | undefined; to: Date | undefined } | number) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }))
  }

  return { formData, handleChange }
}
