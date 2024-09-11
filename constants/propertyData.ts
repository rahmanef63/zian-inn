export interface Property {
  id: string;
  name: string;
  title: string; // Tambahkan title jika dibutuhkan oleh Property
  type: 'kontrakan' | 'penginapan';
  location: string;
  price: number;
  facilities: string[];
  minStay: 'bulanan' | 'min3bulan' | 'min6bulan' | 'harian';
  images: string[];
  rating: number;
  description: string;
  imageLocation: string;
  googleMapsLink: string;
  contact: string;
  reviewDetails: {
    userName: string;
    userImage?: string;
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
    id: 'CitraLand-Tallasa-City-Makassar',
    name: 'CitraLand Tallasa City Makassar',
    title: 'CitraLand-Tallasa-City-Makassar',
    type: 'kontrakan',
    location: 'CitraLand-Tallasa-City-Makassar',
    price: 4590000,
    facilities: ['AC', 'Wifi', 'Parkir'],
    minStay: 'min3bulan',
    images: [
      '/images/tallasacity/C601/1.webp',
      '/images/tallasacity/C601/2.webp',
      '/images/tallasacity/C601/3.webp',
      '/images/tallasacity/C601/4.webp',
      '/images/tallasacity/C601/5.webp',
      '/images/tallasacity/C601/6.webp',
      '/images/tallasacity/C601/7.webp',
      '/images/tallasacity/C601/8.webp',
      '/images/tallasacity/C601/9.webp',
      '/images/tallasacity/C601/10.webp',
      '/images/tallasacity/C601/11.webp',
      '/images/tallasacity/C601/12.webp',
      '/images/tallasacity/C601/13.webp',
    ],
    imageLocation: '/images/tallasacity/C601/location.webp', 
    googleMapsLink: 'https://maps.app.goo.gl/BoLusUqJTr5EPNqq8',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'Samy',
        userImage: '/images/samy.webp',
        rating: 4.8,
        review: 'Tinggal di Tallasa City seru banget, suasananya sejuk! Aku bisa main sepeda di lingkungan hijau yang luas. Dekat mall juga jadi gampang belanja.'
      },
      {
        userName: 'Hilda',
        userImage: '/images/hilda.webp',
        rating: 4.8,
        review: 'Tallasa City suasananya hijau banget! Aku seneng karena bisa main sepuasnya, terus abi seneng karena dekat tol jadi gampang kemana-mana.'
      },
    ],
    contact: '6285342057065',
    description: 'Kontrakan Tallasacity, C601 adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wifi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'CPI',
    name: 'Apartemen CPI (Studio)',
    title: 'ApartemenCPI-Studio',
    type: 'kontrakan',
    location: 'CPI',
    price: 7000000,
    facilities: ['Kolam Renang', 'Gym', 'AC'],
    minStay: 'min3bulan',
    images: [
      '/images/cpi/studio/1.webp',
      '/images/cpi/studio/2.webp',
      '/images/cpi/studio/3.webp',
      '/images/cpi/studio/4.webp',
      '/images/cpi/studio/5.webp',
      '/images/cpi/studio/6.webp',
      '/images/cpi/studio/7.webp',
      '/images/cpi/studio/8.webp',
      '/images/cpi/studio/9.webp',
      '/images/cpi/studio/10.webp',
    ],
    imageLocation: '/images/cpi/studio/location.webp', 
    googleMapsLink: 'https://maps.app.goo.gl/GwJoEbJEyyHgbbEw5',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'Raihan',
        userImage: '',
        rating: 4.8,
        review: 'Penginapan di CPI keren! Lautnya indah banget. Aku bisa liat sunset dari balkon. Kamarnya juga nyaman dan ada laundry express 567plus, jadi gak ribet.'
      },
      {
        userName: 'Sabin',
        userImage: '',
        rating: 4.9,
        review: 'Penginapan di CPI tuh yang paling aku suka! Lautnya keren, terus aku bisa liat kapal-kapal di kejauhan. Abi bilang tempat ini strategis banget.'
      },
      {
        userName: 'Yusuf',
        userImage: '',
        rating: 4.6,
        review: 'CPI tuh keren banget, pemandangan lautnya bikin aku betah. Abi suka konsep minimalisnya, jadi aku sama abi sering jalan-jalan sore.'
      },
    ],
    contact: '6285342057065',
    description: 'Kontrakan CPI, Studio adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wifi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'Salemba',
    name: 'Apartemen Salemba (2 Bedroom)',
    title: 'ApartemenSalemba-2Br',
    type: 'kontrakan',
    location: 'Salemba',
    price: 6000000,
    facilities: ['AC', 'Wifi', 'Parkir', 'Security'],
    minStay: 'min6bulan',
    images: [
      '/images/salemba/2br/1.webp',
      '/images/salemba/2br/2.webp',
      '/images/salemba/2br/3.webp',
      '/images/salemba/2br/4.webp',
      '/images/salemba/2br/5.webp',
      '/images/salemba/2br/6.webp',
      '/images/salemba/2br/7.webp',
      '/images/salemba/2br/8.webp',
      '/images/salemba/2br/9.webp',
      '/images/salemba/2br/10.webp',
      '/images/salemba/2br/11.webp',
    ],
    imageLocation: '/images/salemba/2br/location.webp', 
    googleMapsLink: 'https://maps.app.goo.gl/co75jTEn28nMkyep8',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'Roziq',
        userImage: '',
        rating: 4.5,
        review: 'Salemba Apartment nyaman banget. Abi bilang konsepnya modern, aku suka karena ada ruang main buatku juga!'
      },
      {
        userName: 'Zahwa',
        userImage: '',
        rating: 4.7,
        review: 'Salemba Apartment kamarnya gede banget! Abi suka karena dekat tol, aku suka karena kamarnya kayak di Jepang!'
      },
      {
        userName: 'Musa',
        userImage: '',
        rating: 4.5,
        review: 'Salemba 2 Bedroom enak banget buat tinggal sementara. Dekat mall, jadi gampang banget kalau mau jalan-jalan sama keluarga!'
      },
    ],
    contact: '6285710003155',
    description: 'Apartemen Salemba, 2 Bedroom adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan AC, Wifi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'Samata-kontrakan',
    name: 'Kontrakan Samata (Studio)',
    title: 'Kontrakan Samata (Studio)',
    type: 'kontrakan',
    location: 'Samata-kontrakan',
    price: 1350000,
    facilities: ['Wifi', 'Parkir', 'Elevator', 'AC'],
    minStay: 'bulanan',
    images: [
      '/images/samata/kontrakan/1.webp',
      '/images/samata/kontrakan/2.webp',
      '/images/samata/kontrakan/3.webp',
      '/images/samata/kontrakan/4.webp',
      '/images/samata/kontrakan/5.webp',
      '/images/samata/kontrakan/6.webp',
    ],
    imageLocation: '/images/samata/kontrakan/location.webp', 
    googleMapsLink: 'https://maps.app.goo.gl/HVj1vmJpZYJmZJvQ9',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'Nabilah',
        userImage: '',
        rating: 4.7,
        review: 'Aku suka banget tinggal di Samata Kontrakan! Tempatnya adem, ummi jadi betah banget, aku juga bisa belajar dengan tenang. Wifi-nya kenceng, cocok buat tugas online.'
      },
      {
        userName: 'Aira',
        userImage: '',
        rating: 4.6,
        review: 'Aku seneng banget di Samata Kontrakan. Kamarnya lucu dan ada minimarket di bawah! Aku sama ummi sering belanja di BinZian buat cemilan.'
      },
      {
        userName: 'Hilya',
        userImage: '',
        rating: 4.7,
        review: 'Samata Kontrakan nyaman buat aku belajar, ummi suka tempatnya bersih, abi seneng karena ada laundry express jadi ga repot nyuci baju!'
      },
    ],
    contact: '6282393766221',
    description: 'Kontrakan Samata, Studio adalah kontrakan yang nyaman dan modern. Kontrakan ini dilengkapi dengan Wifi, dan Parkir. Kontrakan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
  {
    id: 'samata-penginapan',
    name: 'Penginapan Samata (Studio)',
    title: 'Penginapan Samata (Studio)',
    type: 'penginapan',
    location: 'samata-penginapan',
    price: 275000,
    facilities: ['AC', 'Wifi', 'Parkir', 'Elevator'],
    minStay: 'harian',
    images: [
      '/images/samata/penginapan/1.webp',
      '/images/samata/penginapan/2.webp',
      '/images/samata/penginapan/3.webp',
      '/images/samata/penginapan/4.webp',
      '/images/samata/penginapan/5.webp',
      '/images/samata/penginapan/6.webp',
    ],
    imageLocation: '/images/samata/kontrakan/location.webp', 
    googleMapsLink: 'https://maps.app.goo.gl/HVj1vmJpZYJmZJvQ9',
    rating: 4.5,
    reviewDetails: [
      {
        userName: 'Nada',
        userImage: '',
        rating: 4.6,
        review: 'Samata Penginapan enak banget buat liburan. Aku sama keluarga bisa jalan-jalan ke laut dekat sini. Ummi sama abi seneng banget!'
      },
      {
        userName: 'Nahla',
        userImage: '',
        rating: 4.7,
        review: 'Samata Penginapan nyaman dan bersih. Abi suka karena dekat kampus, jadi bisa liburan sambil kerja. Aku bisa nonton TV di kamar, seru!'
      },
      {
        userName: 'Umair',
        userImage: '',
        rating: 4.9,
        review: 'Samata Penginapan tempatnya nyaman dan ada AC! Abi seneng bisa kerja sambil liburan, aku seneng bisa main di tempat yang adem.'
      },
    ],
    contact: '6282393766221',
    description: 'Penginapan Samata, Studio adalah penginapan yang nyaman dan modern. Penginapan ini dilengkapi dengan AC, Wifi, dan Parkir. Penginapan ini cocok untuk kamu yang ingin menikmati kehidupan sehari-hari yang nyaman dan menyenangkan.',
  },
];
