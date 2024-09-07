'use client'
//app/property/[id]/page.tsx
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MapPin, Star, Heart, Share2, Home, ArrowLeft } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { properties } from '../../../constants/propertyData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MapSection from '../../../components/Map'



export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === String(params.id))
  
  if (!property) {
    notFound()
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = property.images
  return (
    <div className="min-h-screen max-w-screen-lg mx-auto bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
            </Link>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
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
                  className="absolute top-1/2 left-2 transform -translate-y-1/2"
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
                  <MapPin className="h-4 w-4" />
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
                      <Home className="h-4 w-4" />
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
                        <Image
                          src={review.userImage || `/placeholder.svg?height=40&width=40&text=User${index + 1}`}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full"
                          width={40}
                          height={40}
                        />
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
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Rp {property.price.toLocaleString()} / bulan</CardTitle>
                <CardDescription>Minimum stay: {property.minStay}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="dates">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dates">Tanggal</TabsTrigger>
                    <TabsTrigger value="tenants">Penyewa</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dates">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="start-month">Bulan Mulai</Label>
                      <Select>
                        <SelectTrigger id="start-month">
                          <SelectValue placeholder="Pilih bulan" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month) => (
                            <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Label htmlFor="start-year">Tahun Mulai</Label>
                      <Select>
                        <SelectTrigger id="start-year">
                          <SelectValue placeholder="Pilih tahun" />
                        </SelectTrigger>
                        <SelectContent>
                          {[2023, 2024, 2025].map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Label htmlFor="duration">Durasi (bulan)</Label>
                      <Select>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Pilih durasi" />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 6, 12, 24].map((months) => (
                            <SelectItem key={months} value={months.toString()}>{months} bulan</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="tenants">
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
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Pesan Sekarang</Button>
              </CardFooter>
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
      </div>
    </div>
  )
}