export interface Property {
  id: string;
  name: string;
  title: string; // Tambahkan title jika dibutuhkan oleh Property
  type: string;
  location: string;
  price: number;
  facilities: string[];
  minStay: string;
  images: string[];
  rating: number;
  description: string;
  imageLocation: string;
  googleMapsLink: string;
  reviewDetails: {
    userName: string;
    userImage: string;
    rating: number;
    review: string;
  }[];
}


export type UnitType = 'kontrakan' | 'penginapan';
export type KontrakanType = 'bulanan' | 'min3bulan' | 'min6bulan';

export const unitTypes = {
  kontrakan: ['rumah', 'apartemen', 'kost'] as const,
  penginapan: ['studio'] as const,
} as const;

export const properties: Property[] = [
  {
    id: 'Tallasacity',
    name: 'Tallasacity, C601',
    title: 'Tallasacity, C601',
    type: 'kontrakan',
    location: 'Tallasacity',
    price: 2500000,
    facilities: ['AC', 'Wi-Fi', 'Parkir'],
    minStay: 'min3bulan',
    images: [
      '/images/tallasacity/C601/1.jpg',
      '/images/tallasacity/C601/2.jpg',
      '/images/tallasacity/C601/3.jpg',
    ],
    imageLocation: '/images/tallasacity/C601/location.jpg', 
    googleMapsLink: 'https://goo.gl/maps/example1',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
    ],
    description: 'Kontrakan Tallasacity, C601 adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'CPI',
    name: 'Apartemen CPI (Studio)',
    title: 'Apartemen CPI (Studio)',
    type: 'kontrakan',
    location: 'CPI',
    price: 3500000,
    facilities: ['Kolam Renang', 'Gym', 'AC'],
    minStay: 'min3bulan',
    images: [
      '/images/cpi/studio/1.jpg',
      '/images/cpi/studio/2.jpg',
      '/images/cpi/studio/3.jpg',
    ],
    imageLocation: '/images/cpi/studio/location.jpg', 
    googleMapsLink: 'https://goo.gl/maps/example2',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
    ],
    description: 'Kontrakan CPI, Studio adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'Salemba',
    name: 'Apartemen Salemba (2 Bedroom)',
    title: 'Apartemen Salemba (2 Bedroom)',
    type: 'kontrakan',
    location: 'Salemba',
    price: 5500000,
    facilities: ['AC', 'Wi-Fi', 'Parkir', 'Security'],
    minStay: 'min6bulan',
    images: [
      '/images/salemba/2bedroom/1.jpg',
      '/images/salemba/2bedroom/2.jpg',
      '/images/salemba/2bedroom/3.jpg',
    ],
    imageLocation: '/images/salemba/2bedroom/location.jpg', 
    googleMapsLink: 'https://goo.gl/maps/example3',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
    ],
    description: 'Kontrakan Salemba, 2 Bedroom adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'Samata-kontrakan',
    name: 'Kontrakan Samata (Studio)',
    title: 'Kontrakan Samata (Studio)',
    type: 'kontrakan',
    location: 'Samata',
    price: 2000000,
    facilities: ['Wi-Fi', 'Parkir'],
    minStay: 'bulanan',
    images: [
      '/images/samata/kontrakan/1.webp',
      '/images/samata/kontrakan/2.webp',
      '/images/samata/kontrakan/3.webp',
      '/images/samata/kontrakan/4.webp',
      '/images/samata/kontrakan/5.webp',
      '/images/samata/kontrakan/6.webp',
    ],
    imageLocation: '/images/samata/kontrakan/location.jpg', 
    googleMapsLink: 'https://goo.gl/maps/example4',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
    ],
    description: 'Kontrakan Samata, Studio adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'samata-penginapan',
    name: 'Penginapan Samata (Studio)',
    title: 'Penginapan Samata (Studio)',
    type: 'penginapan',
    location: 'Samata',
    price: 250000,
    facilities: ['AC', 'Wi-Fi', 'Parkir'],
    minStay: 'harian',
    images: [
      '/images/samata/penginapan/1.webp',
      '/images/samata/penginapan/2.webp',
      '/images/samata/penginapan/3.webp',
      '/images/samata/penginapan/4.webp',
      '/images/samata/penginapan/5.webp',
      '/images/samata/penginapan/6.webp',
    ],
    imageLocation: '/images/samata/penginapan/location.jpg', 
    googleMapsLink: 'https://goo.gl/maps/example5',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
      {
        userName: 'John Doe',
        userImage: '/images/user.jpg',
        rating: 4.5,
        review: 'Kontrakan ini sangat nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
      },
    ],
    description: 'Penginapan Samata, Studio adalah penginapan yang nyaman dan modern. Penginapan ini dilengkapi dengan AC, Wi-Fi, dan Parkir. Penginapan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
];

export const kontrakanTypes: { [key in KontrakanType]: string } = {
  bulanan: 'Bulanan',
  min3bulan: 'Minimal 3 Bulan',
  min6bulan: 'Minimal 6 Bulan',
};
