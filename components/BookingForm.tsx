'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { DateRangePicker } from './DateRangePicker'
import { unitTypes } from '../constants/propertyData'
import { CheckAvailabilityDate } from './ui-costum/CheckAvailabilityDate'

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function BookingForm({  isOpen, onClose, onSubmit }: BookingFormProps) {
  
  const [selectedTab, setSelectedTab] = useState('check')
  const [bookingType, setBookingType] = useState('kontrakan')

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan proses submit form di sini
    onSubmit(); // Panggil fungsi onSubmit setelah proses submit selesai
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            className="bg-background text-foreground rounded-lg shadow-lg overflow-hidden max-w-xl w-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="check">Cek Unit</TabsTrigger>
                  <TabsTrigger value="book">Booking</TabsTrigger>
                </TabsList>
                <div className="p-4">
                  <TabsContent value="check" className="mt-0">
                    <CheckAvailabilityForm />
                  </TabsContent>
                  <TabsContent value="book" className="mt-0">
                    <BookingDetailsForm bookingType={bookingType} setBookingType={setBookingType} />
                  </TabsContent>
                </div>
              </Tabs>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CheckAvailabilityForm() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center text-center space-x-4">
          <CardTitle>Site Visit</CardTitle>
          <CardDescription>Masukkan tanggal untuk mengecek unit yang tersedia.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 border-none">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" placeholder="Masukkan nama lengkap Anda" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-type">Tipe Unit</Label>
          <Select >
            <SelectTrigger id="booking-type">
              <SelectValue placeholder="Pilih tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kontrakan">Kontrakan</SelectItem>
              <SelectItem value="penginapan">Penginapan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex justify-between items-center mx-auto w-auto ">
          <Label htmlFor="check-date">Tanggal Cek</Label>
          <CheckAvailabilityDate />
        </div>
        <Button className="w-full">Cek unit</Button>
      </CardContent>
    </Card>
  )
}


function BookingDetailsForm({ bookingType, setBookingType }: { bookingType: string; setBookingType: (type: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center text-center space-x-4">
        <CardTitle>Booking Unit</CardTitle>
        <CardDescription>Isi form berikut untuk melakukan booking.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2">
          <Label htmlFor="booking-type">Tipe Booking</Label>
          <Select onValueChange={setBookingType} defaultValue={bookingType}>
            <SelectTrigger id="booking-type">
              <SelectValue placeholder="Pilih tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kontrakan">Kontrakan</SelectItem>
              <SelectItem value="penginapan">Penginapan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" placeholder="Masukkan nama lengkap Anda" />
        </div>
        {bookingType === 'kontrakan' ? (
          <>
            <KontrakanFields />
            <div className="space-y-2">
              <Label htmlFor="unit-type">Tipe</Label>
              <Select>
                <SelectTrigger id="unit-type">
                  <SelectValue placeholder="Pilih tipe unit" />
                </SelectTrigger>
                <SelectContent>
                    {unitTypes[bookingType].map((unitType) => (
                      <SelectItem key={unitType} value={unitType}>
                        {unitType}
                      </SelectItem>
                    ))}
                  </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <PenginapanFields />
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Booking Sekarang</Button>
      </CardFooter>
    </Card>
  )
}

function KontrakanFields() {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="duration">Durasi Sewa (Bulan)</Label>
        <Select>
          <SelectTrigger id="duration">
            <SelectValue placeholder="Pilih durasi sewa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Bulan</SelectItem>
            <SelectItem value="3">3 Bulan</SelectItem>
            <SelectItem value="6">6 Bulan</SelectItem>
            <SelectItem value="12">12 Bulan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 flex flex-col items-start">
        <Label htmlFor="start-date">Tanggal Mulai Sewa</Label>
        <CheckAvailabilityDate />
      </div>
    </>
  )
}

function PenginapanFields() {
  return (
    <div className="space-y-2">
      <Label htmlFor="date-range">Tanggal Check-in dan Check-out</Label>
        <div className="flex items-center justify-between">
          <Label htmlFor="tenants">Jumlah penyewa</Label>
          <Select>
            <SelectTrigger id="tenants" className="w-[100px]">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      <DateRangePicker />
    </div>
  )
}