import React from 'react'
import { useState  } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import { useTheme } from 'next-themes'
import LogoZian from './LogoZian'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <header className="bg-background shadow-sm max-w-screen-xl mx-auto fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4  flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LogoZian />
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" onClick={() => scrollToSection({ current: document.body })}>Beranda</Button>
          <Button variant="ghost" onClick={() => scrollToSection({ current: document.getElementById('about') })}>Tentang Kami</Button>
          <Button variant="ghost" onClick={() => scrollToSection({ current: document.getElementById('contact') })}>Hubungi</Button>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>

        </div>
      </div>
      {isMenuOpen && (
        <motion.nav 
          className="md:hidden bg-background text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container flex  px-4 py-2 flex-col justify-center mx-auto space-y-2">
            <Button variant="ghost" onClick={() => { scrollToSection({ current: document.body }); setIsMenuOpen(false); }}>Beranda</Button>
            <Button variant="ghost" onClick={() => { scrollToSection({ current: document.getElementById('about') }); setIsMenuOpen(false); }}>Tentang Kami</Button>
            <Button variant="ghost" onClick={() => { scrollToSection({ current: document.getElementById('contact') }); setIsMenuOpen(false); }}>Hubungi</Button>
            <div className="flex justify-center items-center mx-auto space-x-2 mt-4">
              <Sun className="h-4 w-4" />
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </motion.nav>
      )}

    </header>
  )
}