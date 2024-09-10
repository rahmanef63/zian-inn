'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Filter, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog"

import { properties, Property } from '../constants/propertyData'
import PropertyCard from '../components/PropertyCard'
import PropertyModal from '../components/PropertyModal'
import Header from '../components/Header'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import { NavbarPhone } from '../components/ui-costum/NavbarPhone'
import LogoZian from '../components/LogoZian'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const { theme } = useTheme()

  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="sm:hidden flex justify-center items-center py-4 px-4">
        <LogoZian />
      </div>
      <main className="pt-20">
        <section className="min-h-screen flex flex-col justify-center py-32">
          <div className="container mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Temukan Kontrakan Syariah Impian Anda</h2>
            <p className="mb-8">Hunian nyaman sesuai syariat Islam</p>
            <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2 ">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Cari lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto sm:flex-grow sm:rounded-r-none"
              />
              {/* Search Button */}
              <Button className="w-full sm:w-auto mt-2 sm:mt-0 items-center">
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
            </div>
          </div>
          
          {/* Property Cards Section */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => setSelectedProperty(property)} // Set selected property correctly
                />
              ))}
              <div className="flex items-center justify-center bg-background rounded-lg card overflow-hidden cursor-pointer">
                <Button 
                  variant="ghost" 
                  className="w-full h-full flex items-center justify-center"
                  onClick={() => scrollToSection(aboutRef)}
                >
                  <ChevronRight className="h-12 w-12" />
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
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="hidden sm:block bg-background text-foreground py-8">
        <Footer />
      </footer>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          isOpen={true}
          property={selectedProperty} // Make sure selectedProperty is fully populated
          onClose={() => setSelectedProperty(null)} // Reset selected property to null when closed
        />
      )}
      <div className="sm:hidden fixed bottom-0 left-0 right-0">
        <NavbarPhone />
      </div>
    </div>
  )
}
