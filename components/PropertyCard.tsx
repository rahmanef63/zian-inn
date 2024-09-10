import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Property } from '../constants/propertyData'

export default function PropertyCard({ property, onClick }: { property: Property, onClick: () => void }) {
  return (
    <motion.div
      className="bg-background text-foreground rounded-lg card overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Image 
      src={property.images[0]} 
      alt={property.name} 
      width={300} 
      height={200} 
      objectFit="cover" 
      className="w-full h-[400px] object-cover rounded-t-lg"
      />
      <div className="w-[80%] p-4 ">
        <h4 className="font-semibold mb-2">{property.name}</h4>
        <p className="text-gray-600 mb-2">{property.price}</p>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span>{property.rating}</span>
        </div>
      </div>
    </motion.div>
  )
}