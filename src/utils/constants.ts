// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://sky-scrapper.p.rapidapi.com',
  HEADERS: {
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY || '', // Add your RapidAPI key to .env file
  }
};

// Default search parameters
export const DEFAULT_SEARCH_PARAMS = {
  currency: 'USD',
  market: 'en-US',
  countryCode: 'US',
  locale: 'en-US',
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: 'economy',
  sortBy: 'best'
};

// Trip type options
export const TRIP_TYPES = [
  { value: 'round-trip', label: 'Round trip' },
  { value: 'one-way', label: 'One way' },
  { value: 'multi-city', label: 'Multi-city' }
];

// Cabin class options
export const CABIN_CLASSES = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' }
];

// Popular destinations from Nairobi (static data for demo)
export const POPULAR_DESTINATIONS = [
  {
    name: 'London',
    image: '/images/london.jpg',
    price: 'KES 95,923',
    currency: 'KES'
  },
  {
    name: 'Tokyo',
    image: '/images/tokyo.jpg',
    price: 'KES 120,000',
    currency: 'KES'
  },
  {
    name: 'Milan',
    image: '/images/milan.jpg',
    price: 'KES 85,000',
    currency: 'KES'
  },
  {
    name: 'New York',
    image: '/images/new-york.jpg',
    price: 'KES 123,473',
    currency: 'KES'
  },
  {
    name: 'Paris',
    image: '/images/paris.jpg',
    price: 'KES 98,000',
    currency: 'KES'
  },
  {
    name: 'Washington',
    image: '/images/washington.jpg',
    price: 'KES 115,000',
    currency: 'KES'
  },
  {
    name: 'Istanbul',
    image: '/images/istanbul.jpg',
    price: 'KES 75,000',
    currency: 'KES'
  },
  {
      name: 'Dubai',
      image: '/images/dubai.jpg',
      price: 'KES 67,500',
      currency: 'KES'
  }
];

// Nairobi coordinates for nearby airports
export const NAIROBI_COORDINATES = {
  lat: '-1.2921',
  lng: '36.8219'
};