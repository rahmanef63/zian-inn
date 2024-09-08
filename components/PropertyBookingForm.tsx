'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { format, differenceInDays, addDays } from "date-fns"
import { Property } from '../constants/propertyData'
import { DateRange } from 'react-day-picker'

interface PropertyBookingFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  property: Property
}

const PropertyBookingForm = ({ isOpen, onClose, onSubmit, property }: PropertyBookingFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    startMonth: "",
    startYear: "",
    adultCount: "",
    childCount: "",
    dateRange: { from: undefined, to: undefined } as DateRange | undefined
  })

  const getDurationOptions = (minStay: string) => {
    switch (minStay) {
      case 'bulanan':
        return [1, 3, 6, 12];
      case 'min3bulan':
        return [3, 6, 12];
      case 'min6bulan':
        return [6, 12];
      default:
        return [3, 6, 12];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    let message = `Halo, saya ${formData.name} ingin memesan properti ${property.name}:
Tipe Unit: ${property.type}
`

    if (property.type === 'kontrakan') {
      const startDate = new Date(`${formData.startYear}-${formData.startMonth}-01`)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + parseInt(formData.duration))
      
      const totalDays = differenceInDays(endDate, startDate)
      const totalPrice = property.price * parseInt(formData.duration)

      message += `Tanggal Mulai: ${format(startDate, 'dd/MM/yyyy')}
Durasi: ${formData.duration} bulan
Total Hari: ${totalDays} hari
Total Harga: Rp ${totalPrice.toLocaleString()}`
    } else {
      const { from, to } = formData.dateRange || {}
      if (from && to) {
        const totalDays = differenceInDays(to, from)
        const totalPrice = property.price * totalDays

        message += `Check-in: ${format(from, 'dd/MM/yyyy')}
Check-out: ${format(to, 'dd/MM/yyyy')}
Total Hari: ${totalDays} hari
Total Harga: Rp ${totalPrice.toLocaleString()}`
      }
    }

    message += `
Jumlah Penyewa Dewasa: ${formData.adultCount}
Jumlah Penyewa Anak: ${formData.childCount}
Terima kasih!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/6285710003155?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    setShowConfirmation(false)
    onClose()
    onSubmit()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Formulir Pemesanan - {property.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              placeholder="Masukkan nama lengkap Anda"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          {property.type === 'kontrakan' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-month">Bulan Mulai</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, startMonth: value })}>
                  <SelectTrigger id="start-month">
                    <SelectValue placeholder="Pilih bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month) => (
                      <SelectItem key={month} value={month}>{new Date(`2000-${month}-01`).toLocaleString('id-ID', { month: 'long' })}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-year">Tahun Mulai</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, startYear: value })}>
                  <SelectTrigger id="start-year">
                    <SelectValue placeholder="Pilih tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2025].map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="duration">Durasi (bulan)</Label>
                <Select 
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Pilih durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDurationOptions(property.minStay).map((months) => (
                      <SelectItem key={months} value={months.toString()}>{months} bulan</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Tanggal Check-in dan Check-out</Label>
              <Calendar
                mode="range"
                selected={formData.dateRange}
                onSelect={(range) => setFormData({ ...formData, dateRange: range })}
                className="rounded-md border w-full"
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adult-count">Jumlah penyewa Dewasa</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, adultCount: value })}>
                <SelectTrigger id="adult-count" className="w-full">
                  <SelectValue placeholder="Pilih jumlah" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="child-count">Jumlah penyewa Anak</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, childCount: value })}>
                <SelectTrigger id="child-count" className="w-full">
                  <SelectValue placeholder="Pilih jumlah" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">Pesan Sekarang</Button>
        </form>
      </DialogContent>
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Pesanan</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>Properti: {property.name}</p>
              <p>Harga per {property.type === 'kontrakan' ? 'Bulan' : 'Hari'}: Rp {property.price.toLocaleString()}</p>
              {property.type === 'kontrakan' ? (
                <>
                  <p>Tanggal Mulai: {`${formData.startMonth}/${formData.startYear}`}</p>
                  <p>Durasi: {formData.duration} bulan</p>
                </>
              ) : (
                <>
                  <p>Check-in: {formData.dateRange?.from ? format(formData.dateRange.from, 'dd/MM/yyyy') : '-'}</p>
                  <p>Check-out: {formData.dateRange?.to ? format(formData.dateRange.to, 'dd/MM/yyyy') : '-'}</p>
                </>
              )}
              <p>Jumlah Penyewa Dewasa: {formData.adultCount}</p>
              <p>Jumlah Penyewa Anak: {formData.childCount}</p>
              <p>Total Hari: {
                property.type === 'kontrakan'
                  ? parseInt(formData.duration) * 30
                  : formData.dateRange?.from && formData.dateRange?.to
                    ? differenceInDays(formData.dateRange.to, formData.dateRange.from)
                    : '-'
              } hari</p>
              <p className="font-bold">Total Harga: Rp {
                property.type === 'kontrakan'
                  ? (property.price * parseInt(formData.duration)).toLocaleString()
                  : formData.dateRange?.from && formData.dateRange?.to
                    ? (property.price * differenceInDays(formData.dateRange.to, formData.dateRange.from)).toLocaleString()
                    : '-'
              }</p>
            </div>
            <Button onClick={handleConfirm}>Konfirmasi dan Kirim ke WhatsApp</Button>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

export default PropertyBookingForm