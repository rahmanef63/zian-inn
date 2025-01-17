'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

import { properties, Property } from '../constants/propertyData'
import PropertyCard from '../components/PropertyCard'
import PropertyModal from '../components/PropertyModal'
import Header from '../components/Header'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import { NavbarPhone } from '../components/ui-costum/NavbarPhone'
import LogoZian from '../components/LogoZian'
import SEO from '../components/SEO'
import { seoData } from '../constants/seoConstants'

export default function HomePage() {
  // State untuk pencarian dan properti yang dipilih
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  // Mendapatkan tema dari next-themes
  const { theme } = useTheme()

  // SEO dinamis berdasarkan properti yang dipilih
  const seo = selectedProperty
    ? seoData[selectedProperty.id] || {
        title: selectedProperty.name,
        description: selectedProperty.description,
        imageUrl: selectedProperty.images[0],
        url: `https://zianinn.com/property/${selectedProperty.id}`,
        style: "object-fit: cover"
      }
    : {
        title: "Zian Inn - Kontrakan Syariah",
        description: "Temukan kontrakan syariah impian Anda di Zian Inn",
        imageUrl: "/default-image.jpg",
        url: "https://zianinn.com",
        style: "object-fit: cover"
      }

  // Referensi untuk scrolling ke bagian tertentu
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Fungsi untuk scroll ke section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Efek untuk mengatur tema
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Fungsi untuk booking
  const [openBooking] = useState(() => () => {})
  const handleOpenBooking = useCallback(() => {
    openBooking()
  }, [openBooking])

  return (
    <>
      {/* SEO Komponen */}
      <SEO
        title={seo.title}
        description={seo.description}
        imageUrl={seo.imageUrl}
        url={seo.url}
      />

      <div className="min-h-screen bg-background text-foreground">
        <div className="hidden sm:block">
          <Header />
        </div>
        
        <section className="sm:hidden flex cursor-pointer mt-16 justify-center scale-150 items-center hover:scale-[2] transition-all duration-300">
          <LogoZian />
        </section>

        <main className="pt-20">
          <section className="min-h-screen flex flex-col justify-center py-16 sm:py-32">
            <div className="container mx-auto px-4 text-center mb-12 sm:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Temukan Kontrakan Syariah Impian Anda</h2>
              <p className="mb-8">Hunian nyaman sesuai syariat Islam</p>
              <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2">
                {/* Input pencarian */}
                <Input
                  type="text"
                  placeholder="Cari lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto sm:flex-grow sm:rounded-r-none"
                />
                {/* Tombol pencarian */}
                <Button className="w-full sm:w-auto mt-2 sm:mt-0 items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>

            {/* Kartu properti */}
            <div className="container mx-auto px-4 sm:px-8 overflow-y-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-screen-lg mx-auto">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
                <div className="flex items-center justify-center bg-background rounded-lg card overflow-hidden cursor-pointer">
                  <Button 
                    variant="ghost" 
                    className="w-full h-full flex items-center justify-center"
                    onClick={() => scrollToSection(aboutRef)}
                  >
                    <ChevronRight className="h-8 w-8 sm:h-12 sm:w-12" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section ref={aboutRef} className="min-h-screen flex justify-center items-center py-16">
            <AboutSection />
          </section>

          {/* Contact Section */}
          <section ref={contactRef} className="min-h-screen bg-background text-foreground flex justify-center items-center py-16">
            <ContactSection onOpenBooking={handleOpenBooking} />
          </section>
        </main>

        {/* Footer */}
        <footer className="hidden sm:block bg-background text-foreground py-8">
          <Footer />
        </footer>

        {/* Modal properti */}
        {selectedProperty && (
          <PropertyModal
            isOpen={true}
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
        <div className="sm:hidden fixed bottom-0 left-0 right-0">
          <NavbarPhone onOpenBooking={handleOpenBooking} />
        </div>
      </div>
    </>
  )
}
