// API Response Types
export interface ApiResponse<T> {
  status: boolean;
  timestamp: number;
  data: T;
}

// Airport Types
export interface AirportPresentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface FlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface HotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface AirportNavigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: FlightParams;
  relevantHotelParams: HotelParams;
}

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: AirportPresentation;
  navigation: AirportNavigation;
}

// Search Form Types
export interface SearchFormData {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  tripType: 'round-trip' | 'one-way' | 'multi-city';
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
}

// Flight Search Types
export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  cabinClass?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
  sortBy?: string;
}

// Destination Card Types
export interface DestinationInfo {
  name: string;
  price: string;
  currency: string;
  dateRange: string;
  duration: string;
  stops: string;
  image: string;
}

// Price Calendar Types
export interface PriceCalendarDay {
  day: string;
  group: 'low' | 'medium' | 'high';
  price: number;
}

export interface PriceCalendarData {
  flights: {
    noPriceLabel: string;
    groups: Array<{
      id: string;
      label: string;
    }>;
    days: PriceCalendarDay[];
    currency: string;
  };
}

// Flight Search Everywhere Types
export interface FlightEverywhereParams {
  originEntityId: string;
  destinationEntityId?: string;
  travelDate?: string;
  returnDate?: string;
  adults?: number;
  childAges?: string;
  cabinClass?: string;
  journeyType?: 'one_way' | 'round_trip';
  currency?: string;
}