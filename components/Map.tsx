import { useState } from "react";
import { properties } from "../constants/propertyData"; // Ambil data dari constant
import Link from "next/link";
import Image from "next/image";

interface MapSectionProps {
  propertyId: string;
}

export default function MapSection({ propertyId }: MapSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  
  const property = properties.find((prop) => prop.id === propertyId);

  if (!property) {
    return null;
  }

  return (
    <section
      className="mb-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
        <Image
          src={property.imageLocation}
          alt={`Lokasi ${property.name}`}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            filter: isHovered ? 'brightness(60%)' : 'brightness(100%)',
          }}
          priority
        />
        {isHovered && (
          <Link
          href={property.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center"
        >
          <button className="bg-background text-foreground py-2 px-4 rounded-lg shadow-lg font-semibold z-20">
            Lihat Lokasi
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
