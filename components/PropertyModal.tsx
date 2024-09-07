'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Property } from '../constants/propertyData'
import Image from 'next/image'

interface PropertyModalProps {
  property: Property 
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Use images from property
  const images = property.images

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{property.name}</DialogTitle>
        </DialogHeader>
        {/* Image Slider */}
        <div className="relative">
          <Image
            src={images[currentImageIndex]}
            alt={property.name}
            className="w-full h-[500px] object-cover rounded-lg"
            width={300}
            height={200}
          />
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Property Details */}
        <div className="mt-4">
          <p className="text-lg font-semibold">Rp {property.price.toLocaleString()}/bulan</p>
          <p className="mt-2">{property.location}</p>
          <h4 className="font-semibold mt-4 mb-2">Fasilitas:</h4>
          <ul className="list-disc list-inside">
            {property.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>

        {/* Link to Full Property */}
        <div className="mt-6 flex justify-end">
          <Link href={`/property/${property.id}`} passHref>
            <Button asChild>
              <a>Lihat Lengkap</a>
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
