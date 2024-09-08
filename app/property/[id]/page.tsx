'use client'
//app/property/[id]/page.tsx
import React, { useState } from 'react'
import { 
  AirVent, 
  Car, 
  ChevronLeft, 
  ChevronRight, 
  Dumbbell, 
  Lock, 
  SquareUserRound, 
  Share2, 
  MapPin, 
  Star, 
  Wifi} from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { properties } from '../../../constants/propertyData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MapSection from '../../../components/Map'
import SEO from '../../../components/SEO';
import { seoData } from '../../../constants/seoConstants';
import LogoZian from '../../../components/LogoZian'
import PropertyBookingForm from '../../../components/PropertyBookingForm'
import { NavbarPhone } from '../../../components/ui-costum/NavbarPhone'


export default function PropertyPage({ params }: { params: { id: string } }) {
  // Temukan data properti berdasarkan ID
  const property = properties.find((p) => p.id === String(params.id));

  // Jika properti tidak ditemukan, arahkan ke halaman 404
  if (!property) {
    notFound();
  }

  // Ambil data SEO berdasarkan ID properti
  const seo = seoData[property.id] || {
    title: property.name,
    description: property.description,
    imageUrl: property.images[0],
    url: `https://zianinn.com/property/${property.id}`,
    style: "object-fit: cover"
  };

  // Mengatur index gambar saat ini
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images;

  const [isBookingOpen, setIsBookingOpen] = useState(false)




  return (
    <>
    <SEO title={seo.title} description={seo.description} imageUrl={seo.imageUrl} url={seo.url} />
    <div className="min-h-screen max-w-screen-lg mx-auto bg-background text-foreground">
      <div className="container mx-auto px-4 ">
        <header className="flex sticky top-0 z-20 bg-background/50 backdrop-blur-sm py-6 justify-between items-center ">
          <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold sm:text-2xl sm:font-bold md:text-3xl md:font-extrabold">{property.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4 z-30" />
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={images[currentImageIndex]}
                  alt={property.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                  width={300}
                  height={200}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 "
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-2">
                <Link href={property.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </Link>
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{property.rating} ({property.reviewDetails.length} reviews)</span>
                </div>
              </CardFooter>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tentang properti ini</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{property.description}</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Fasilitas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
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

            <Card>
              <CardHeader>
                <CardTitle>Ulasan</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {property.reviewDetails.map((review, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <SquareUserRound className="h-8 w-8" />
                        <div>
                          <h4 className="font-semibold">{review.userName}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p>{review.review}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky z-20 top-4">
              <CardHeader>
                <CardTitle>Rp {property.price.toLocaleString()} / {property.type === 'kontrakan' ? 'bulan' : 'hari'}</CardTitle>
                <CardDescription>Minimum stay: {property.minStay}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsBookingOpen(true)} className="w-full">Pesan Sekarang</Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
          <div className="h-[400px] bg-muted rounded-lg">
            <MapSection propertyId={property.location} />
          </div>
        </section>
        

        <Separator className="my-8" />

        <section className="flex cursor-pointer mt-8 mb-20 justify-center border-b items-center hover:scale-150 transition-all duration-300">
          <LogoZian />
        </section>
      </div>
    </div>
    <PropertyBookingForm
      isOpen={isBookingOpen}
      onClose={() => setIsBookingOpen(false)}
      onSubmit={() => setIsBookingOpen(false)}
      property={property}
    />
            <div className="sm:hidden fixed bottom-0 left-0 right-0">
        <NavbarPhone />
        </div>
    </>
  )
}