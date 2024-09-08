'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import Image from 'next/image'
import { Property } from '../constants/propertyData'
import PropertyBookingForm from './PropertyBookingForm'
import { ChevronLeft, ChevronRight, Wifi, AirVent, Dumbbell, Lock, Car, MapPin, ArrowUpDown, LifeBuoy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface PropertyModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

const PropertyModal = ({ isOpen, onClose, property }: PropertyModalProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleBookingSubmit = () => {
    setShowBookingForm(false)
    onClose()
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between relative">
          <DialogTitle className="text-lg sm:text-xl text-center w-full">
            {property.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 relative">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-120">
            <Image
              src={property.images[currentImageIndex]}
              alt={`${property.name} - Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-4 ">
            <div className="flex justify-between items-center">
              {/* button lokasi mapping dari google maps */}
              <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => window.open(`https://maps.google.com/?q=${property.location}`, '_blank')}>
                <MapPin className="h-4 w-4 text-blue-500 "  />
              </Button>
              <p><strong>Harga:</strong> Rp {property.price.toLocaleString()} / {property.type === 'kontrakan' ? 'bulan' : 'hari'}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
          <Card >
              <CardHeader>
                <CardTitle>Fasilitas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className=" w-full mx-auto grid grid-cols-2 gap-2">
                  {property.facilities.map((facility, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      {(() => {
                        switch (facility) {
                          case "Wifi":
                            return <Wifi className="h-4 w-4" />;
                          case "AC":
                            return <AirVent className="h-4 w-4" />;
                          case "Gym":
                            return <Dumbbell className="h-4 w-4" />;
                          case "Security":
                            return <Lock className="h-4 w-4" />;
                          case "Parkir":
                            return <Car className="h-4 w-4" />;
                          case "Elevator":
                            return <ArrowUpDown className="h-4 w-4" />;
                          case "Pool":
                            return <LifeBuoy className="h-4 w-4" />;
                          default:
                            return null;
                        }
                      })()}
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-2 justify-center" >
            <Button onClick={() => window.open(`/property/${property.id}`, '_blank')} className="w-full sm:w-auto">
              Lihat Lebih Lengkap
            </Button>
            <Button onClick={() => setShowBookingForm(true)} className="w-full sm:w-auto">
              Pesan Sekarang
            </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <PropertyBookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        onSubmit={handleBookingSubmit}
        property={property}
      />
    </Dialog>
  )
}

export default PropertyModal