import axios, { AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  Airport, 
  FlightSearchParams,
  PriceCalendarData,
  FlightEverywhereParams
} from '../types';

// API Configuration - FIXED TO MATCH DOCS
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://sky-scrapper.p.rapidapi.com',
  HEADERS: {
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',  // lowercase like docs
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || 'a1695cada7msha30fdb780de6a8ap1f74d5jsn611ccb20f4a9',  // lowercase + fallback
  }
};

// 🔍 DEBUG LOGGING
console.log('🔍 DEBUG - Environment Variables:', {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_RAPIDAPI_KEY: process.env.REACT_APP_RAPIDAPI_KEY ? 
    `${process.env.REACT_APP_RAPIDAPI_KEY.substring(0, 8)}...` : 'MISSING ❌',
  REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  keyLength: process.env.REACT_APP_RAPIDAPI_KEY?.length || 0
});

console.log('🔧 DEBUG - API Config Headers:', API_CONFIG.HEADERS);

// Default search parameters - FIXED TO MATCH DOCS FORMAT
const DEFAULT_SEARCH_PARAMS = {
  currency: process.env.REACT_APP_DEFAULT_CURRENCY || 'KES',
  market: process.env.REACT_APP_DEFAULT_MARKET || 'en-US',
  countryCode: process.env.REACT_APP_DEFAULT_COUNTRY_CODE || 'KE',
  locale: 'en-US',
  adults: '1',  // String like in docs
  children: '0',  // String like in docs
  infants: '0',  // String like in docs
  cabinClass: 'economy',
  sortBy: 'best'
};

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
  timeout: 30000,
});

// Enhanced request interceptor for debugging
if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use(
    (config) => {
      console.log('🚀 API Request Details:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        params: config.params,
        baseURL: config.baseURL
      });
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

class SkyScrapperAPI {
  /**
   * Get nearby airports based on latitude and longitude
   */
  async getNearByAirports(lat: string, lng: string, locale?: string): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(
      '/api/v1/flights/getNearByAirports',
      {
        params: {
          lat,
          lng,
          locale: locale || DEFAULT_SEARCH_PARAMS.locale
        }
      }
    );
    return response.data;
  }

  /**
   * Search for airports by query (city, airport name, etc.)
   */
  async searchAirport(query: string, locale?: string): Promise<ApiResponse<Airport[]>> {
    const response: AxiosResponse<ApiResponse<Airport[]>> = await apiClient.get(
      '/api/v1/flights/searchAirport',
      {
        params: {
          query,
          locale: locale || DEFAULT_SEARCH_PARAMS.locale
        }
      }
    );
    return response.data;
  }

  /**
   * Search for flights between two destinations - FIXED TO MATCH DOCS
   */
  async searchFlights(params: FlightSearchParams): Promise<ApiResponse<any>> {
    // Convert numbers to strings to match docs format
    const searchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params,
      adults: String(params.adults || 1),  // Convert to string
      children: String(params.children || 0),  // Convert to string  
      infants: String(params.infants || 0)  // Convert to string
    };

    console.log('🔧 Final search params:', searchParams);

    const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(
      '/api/v2/flights/searchFlights',
      { params: searchParams }
    );
    return response.data;
  }

  /**
   * Search for complete flight information
   */
  async searchFlightsComplete(params: FlightSearchParams): Promise<ApiResponse<any>> {
    const searchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params,
      adults: String(params.adults || 1),
      children: String(params.children || 0),
      infants: String(params.infants || 0)
    };

    const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(
      '/api/v2/flights/searchFlightsComplete',
      { params: searchParams }
    );
    return response.data;
  }

  /**
   * Get price calendar for a route
   */
  async getPriceCalendar(
    originSkyId: string,
    destinationSkyId: string,
    fromDate: string,
    toDate?: string,
    currency?: string
  ): Promise<ApiResponse<PriceCalendarData>> {
    const response: AxiosResponse<ApiResponse<PriceCalendarData>> = await apiClient.get(
      '/api/v1/flights/getPriceCalendar',
      {
        params: {
          originSkyId,
          destinationSkyId,
          fromDate,
          toDate,
          currency: currency || DEFAULT_SEARCH_PARAMS.currency
        }
      }
    );
    return response.data;
  }

  /**
   * Search flights to everywhere from a single origin
   */
  async searchFlightEverywhere(params: FlightEverywhereParams): Promise<ApiResponse<any>> {
    const searchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params
    };

    const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(
      '/api/v2/flights/searchFlightEverywhere',
      { params: searchParams }
    );
    return response.data;
  }

  /**
   * Get flight details for a specific itinerary
   */
  async getFlightDetails(
    itineraryId: string,
    legs: any[],
    sessionId: string,
    adults?: number,
    children?: number,
    infants?: number,
    currency?: string,
    locale?: string,
    market?: string,
    cabinClass?: string,
    countryCode?: string
  ): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(
      '/api/v1/flights/getFlightDetails',
      {
        params: {
          itineraryId,
          legs: JSON.stringify(legs),
          sessionId,
          adults: String(adults || 1),
          children: String(children || 0),
          infants: String(infants || 0),
          currency: currency || DEFAULT_SEARCH_PARAMS.currency,
          locale: locale || DEFAULT_SEARCH_PARAMS.locale,
          market: market || DEFAULT_SEARCH_PARAMS.market,
          cabinClass: cabinClass || DEFAULT_SEARCH_PARAMS.cabinClass,
          countryCode: countryCode || DEFAULT_SEARCH_PARAMS.countryCode
        }
      }
    );
    return response.data;
  }
}

// Create and export a singleton instance
export const skyScrapperAPI = new SkyScrapperAPI();
export default skyScrapperAPI;