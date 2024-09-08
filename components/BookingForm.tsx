'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { format, differenceInDays } from "date-fns"
import { properties, Property } from '../constants/propertyData'
import { DateRange } from 'react-day-picker'

interface BookingFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const BookingForm = ({ isOpen, onClose, onSubmit }: BookingFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState("cekUnit")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    unitType: "",
    checkDate: undefined as Date | undefined,
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
    if (!selectedProperty) return;

    let message = ""
    if (activeTab === "cekUnit") {
      message = `Halo, saya ingin mengecek ketersediaan unit:
Nama: ${formData.name}
Properti: ${selectedProperty.name}
Tipe Unit: ${formData.unitType}
Tanggal Cek: ${formData.checkDate ? format(formData.checkDate, 'dd/MM/yyyy') : '-'}
Terima kasih!`
    } else {
      const startDate = selectedProperty.type === 'kontrakan' 
        ? new Date(`${formData.startYear}-${formData.startMonth}-01`)
        : formData.dateRange?.from
      const endDate = selectedProperty.type === 'kontrakan'
        ? new Date(startDate!)
        : formData.dateRange?.to
      
      if (selectedProperty.type === 'kontrakan' && startDate) {
        endDate!.setMonth(endDate!.getMonth() + parseInt(formData.duration))
      }
      
      const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) : 0
      const totalPrice = selectedProperty.type === 'kontrakan'
        ? selectedProperty.price * parseInt(formData.duration)
        : selectedProperty.price * totalDays

      message = `Halo, saya ${formData.name} ingin memesan properti ${selectedProperty.name}:
Tipe Unit: ${selectedProperty.type}
${selectedProperty.type === 'kontrakan' 
  ? `Tanggal Mulai: ${startDate ? format(startDate, 'dd/MM/yyyy') : '-'}
Durasi: ${formData.duration} bulan`
  : `Check-in: ${startDate ? format(startDate, 'dd/MM/yyyy') : '-'}
Check-out: ${endDate ? format(endDate, 'dd/MM/yyyy') : '-'}`
}
Total Hari: ${totalDays} hari
Jumlah Penyewa Dewasa: ${formData.adultCount}
Jumlah Penyewa Anak: ${formData.childCount}
Total Harga: Rp ${totalPrice.toLocaleString()}
Terima kasih!`
    }

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/6285710003155?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    setShowConfirmation(false)
    onClose()
    onSubmit()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Formulir Pemesanan</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="cekUnit" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cekUnit">Cek Unit</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>
          <TabsContent value="cekUnit">
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
              <div className="space-y-2">
                <Label htmlFor="property">Pilih Properti</Label>
                <Select onValueChange={(value) => {
                  const property = properties.find(p => p.id === value)
                  setSelectedProperty(property || null)
                }}>
                  <SelectTrigger id="property">
                    <SelectValue placeholder="Pilih properti" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tanggal Cek</Label>
                <Calendar
                  mode="single"
                  selected={formData.checkDate}
                  onSelect={(date) => setFormData({ ...formData, checkDate: date })}
                  className="rounded-md border"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </TabsContent>
          <TabsContent value="booking">
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
              <div className="space-y-2">
                <Label htmlFor="property">Pilih Properti</Label>
                <Select onValueChange={(value) => {
                  const property = properties.find(p => p.id === value)
                  setSelectedProperty(property || null)
                }}>
                  <SelectTrigger id="property">
                    <SelectValue placeholder="Pilih properti" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedProperty?.type === 'kontrakan' ? (
                <>
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
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi (bulan)</Label>
                    <Select 
                      value={formData.duration}
                      onValueChange={(value) => setFormData({ ...formData, duration: value })}
                    >
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDurationOptions(selectedProperty?.minStay || '').map((months) => (
                          <SelectItem key={months} value={months.toString()}>{months} bulan</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label>Tanggal Check-in dan Check-out</Label>
                  <Calendar
                    mode="range"
                    selected={formData.dateRange}
                    onSelect={(range) => setFormData({ ...formData, dateRange: range })}
                    className="rounded-md border"
                  />
                </div>
              )}
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
              <Button type="submit" className="w-full mt-4">Pesan Sekarang</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
      {showConfirmation && selectedProperty && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Pesanan</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>Properti: {selectedProperty.name}</p>
              <p>Harga per {selectedProperty.type === 'kontrakan' ? 'Bulan' : 'Hari'}: Rp {selectedProperty.price.toLocaleString()}</p>
              {selectedProperty.type === 'kontrakan' ? (
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
                selectedProperty.type === 'kontrakan'
                  ? parseInt(formData.duration) * 30
                  : formData.dateRange?.from && formData.dateRange?.to
                    ? differenceInDays(formData.dateRange.to, formData.dateRange.from)
                    : '-'
              } hari</p>
              <p className="font-bold">Total Harga: Rp {
                selectedProperty.type === 'kontrakan'
                  ? (selectedProperty.price * parseInt(formData.duration)).toLocaleString()
                  : formData.dateRange?.from && formData.dateRange?.to
                    ? (selectedProperty.price * differenceInDays(formData.dateRange.to, formData.dateRange.from)).toLocaleString()
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

export default BookingForm