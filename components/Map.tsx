import { useState } from "react";
import { properties } from "../constants/propertyData"; // Ambil data dari constant

interface MapSectionProps {
  propertyId: string;
}

export default function MapSection({ propertyId }: MapSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Cari properti berdasarkan id
  const property = properties.find((prop) => prop.id === propertyId);

  if (!property) return null;

  return (
    <section
      className="mb-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-[400px] bg-muted rounded-lg flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${property.imageLocation})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isHovered ? "brightness(60%)" : "brightness(100%)",
        }}
      >
        {isHovered && (
          <a
            href={property.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
          >
            <button className="bg-background text-foreground py-2 px-4 rounded-lg shadow-lg font-semibold z-20">
              Lihat Lokasi
            </button>
          </a>
        )}
      </div>
    </section>
  );
}
