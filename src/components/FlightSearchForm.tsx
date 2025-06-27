import React, { useState, useEffect } from 'react';
import { Calendar, Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { SearchFormData, Airport } from '../types';
import { TRIP_TYPES, CABIN_CLASSES } from '../utils/constants';
import skyScrapperAPI from '../services/skyScrapperApi';

const FlightSearchForm: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    origin: null,
    destination: null,
    departureDate: null,
    returnDate: null,
    tripType: 'round-trip',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'economy'
  });

  const [originQuery, setOriginQuery] = useState('Nairobi');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Airport[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departureCalendarOpen, setDepartureCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);

  // Default Nairobi airport for easier testing
  useEffect(() => {
    if (originQuery === 'Nairobi' && originSuggestions.length > 0 && !formData.origin) {
      // Auto-select first Nairobi airport
      const nairobiAirport = originSuggestions.find(airport => 
        airport.presentation.title.toLowerCase().includes('nairobi')
      );
      if (nairobiAirport) {
        handleOriginSelect(nairobiAirport);
      }
    }
  }, [originSuggestions, originQuery, formData.origin]);

  // Search for airports
  const searchAirports = async (query: string, type: 'origin' | 'destination') => {
    if (query.length < 2) return;
    
    try {
      setIsLoading(true);
      const response = await skyScrapperAPI.searchAirport(query);
      if (response.status && response.data) {
        if (type === 'origin') {
          setOriginSuggestions(response.data);
          setShowOriginSuggestions(true);
        } else {
          setDestinationSuggestions(response.data);
          setShowDestinationSuggestions(true);
        }
      }
    } catch (error) {
      console.error('Error searching airports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (originQuery && originQuery.length >= 2) {
        searchAirports(originQuery, 'origin');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [originQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (destinationQuery && destinationQuery.length >= 2) {
        searchAirports(destinationQuery, 'destination');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [destinationQuery]);

  const handleOriginSelect = (airport: Airport) => {
    setFormData(prev => ({ ...prev, origin: airport }));
    setOriginQuery(airport.presentation.title);
    setShowOriginSuggestions(false);
  };

  const handleDestinationSelect = (airport: Airport) => {
    setFormData(prev => ({ ...prev, destination: airport }));
    setDestinationQuery(airport.presentation.title);
    setShowDestinationSuggestions(false);
  };

  const isFormValid = formData.origin && formData.destination && formData.departureDate;
  const disabledReason = !formData.origin ? 'Select origin' : 
                        !formData.destination ? 'Select destination' : 
                        !formData.departureDate ? 'Select departure date' : '';

  const handleSearch = async () => {
    if (!isFormValid) {
      alert(`Please complete: ${disabledReason}`);
      return;
    }

    setIsLoading(true);
    try {
      // Safe type checking
      if (!formData.origin || !formData.destination || !formData.departureDate) {
        alert('Please complete all required fields');
        setIsLoading(false);
        return;
      }
      
      const searchParams = {
        originSkyId: formData.origin.navigation.relevantFlightParams.skyId,
        destinationSkyId: formData.destination.navigation.relevantFlightParams.skyId,
        originEntityId: formData.origin.navigation.relevantFlightParams.entityId,
        destinationEntityId: formData.destination.navigation.relevantFlightParams.entityId,
        date: format(formData.departureDate, 'yyyy-MM-dd'),
        returnDate: formData.returnDate ? format(formData.returnDate, 'yyyy-MM-dd') : undefined,
        adults: formData.passengers.adults,
        children: formData.passengers.children,
        infants: formData.passengers.infants,
        cabinClass: formData.cabinClass,
        currency: 'KES'
      };

      console.log('Searching flights with params:', searchParams);
      const response = await skyScrapperAPI.searchFlights(searchParams);
      console.log('Flight search results:', response);
      
      if (response.status && response.data) {
        alert(`Found ${response.data.itineraries?.length || 0} flights!`);
        // TODO: Navigate to results page or show results
      } else {
        alert('No flights found. Please try different dates or destinations.');
      }
    } catch (error: any) {
      console.error('Flight search error:', error);
      alert(`Error searching flights: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-sky-100 border-blue-200 p-6 rounded-lg shadow-lg max-w-5xl mx-auto backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative">
              <select
                value={formData.tripType}
                onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value as any }))}
                className="appearance-none bg-white/80 border border-blue-300 rounded-md px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer backdrop-blur-sm"
              >
                {TRIP_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-blue-800 font-medium">Passengers:</label>
              <select
                value={`${formData.passengers.adults}-${formData.passengers.children}-${formData.passengers.infants}`}
                onChange={(e) => {
                  const [adults, children, infants] = e.target.value.split('-').map(Number);
                  setFormData(prev => ({
                    ...prev,
                    passengers: { adults, children, infants }
                  }));
                }}
                className="px-3 py-2 border border-blue-300 rounded-md text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              >
                <option value="1-0-0">1 Adult</option>
                <option value="2-0-0">2 Adults</option>
                <option value="3-0-0">3 Adults</option>
                <option value="4-0-0">4 Adults</option>
                <option value="1-1-0">1 Adult, 1 Child</option>
                <option value="2-1-0">2 Adults, 1 Child</option>
                <option value="2-2-0">2 Adults, 2 Children</option>
                <option value="1-0-1">1 Adult, 1 Infant</option>
                <option value="2-0-1">2 Adults, 1 Infant</option>
                <option value="2-1-1">2 Adults, 1 Child, 1 Infant</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-blue-800 font-medium">Class:</label>
              <select
                value={formData.cabinClass}
                onChange={(e) => setFormData(prev => ({ ...prev, cabinClass: e.target.value as any }))}
                className="px-3 py-2 border border-blue-300 rounded-md text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              >
                {CABIN_CLASSES.map((cabin) => (
                  <option key={cabin.value} value={cabin.value}>
                    {cabin.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-600" />
                <Input
                  type="text"
                  placeholder="From (e.g., Nairobi)"
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  className="pl-10 bg-white/80 border-blue-300 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                />
              </div>
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white/95 border-blue-200 backdrop-blur-sm">
                  {originSuggestions.map((airport, index) => (
                    <div
                      key={index}
                      className="p-3 cursor-pointer hover:bg-blue-50 border-b border-blue-100 last:border-b-0"
                      onClick={() => handleOriginSelect(airport)}
                    >
                      <div className="font-medium text-blue-900">{airport.presentation.title}</div>
                      <div className="text-sm text-blue-600">{airport.presentation.subtitle}</div>
                    </div>
                  ))}
                </Card>
              )}
              {formData.origin && (
                <div className="text-xs text-green-700 mt-1 font-medium">
                   Selected: {formData.origin.presentation.title}
                </div>
              )}
            </div>
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-600" />
                <Input
                  type="text"
                  placeholder="To (e.g., London)"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className="pl-10 bg-white/80 border-blue-300 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                />
              </div>
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white/95 border-blue-200 backdrop-blur-sm">
                  {destinationSuggestions.map((airport, index) => (
                    <div
                      key={index}
                      className="p-3 cursor-pointer hover:bg-blue-50 border-b border-blue-100 last:border-b-0"
                      onClick={() => handleDestinationSelect(airport)}
                    >
                      <div className="font-medium text-blue-900">{airport.presentation.title}</div>
                      <div className="text-sm text-blue-600">{airport.presentation.subtitle}</div>
                    </div>
                  ))}
                </Card>
              )}
              {formData.destination && (
                <div className="text-xs text-green-700 mt-1 font-medium">
                   Selected: {formData.destination.presentation.title}
                </div>
              )}
            </div>
            <Popover open={departureCalendarOpen} onOpenChange={setDepartureCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/80 border-blue-300 hover:bg-blue-50 text-blue-800">
                  <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                  {formData.departureDate ? format(formData.departureDate, "MMM dd") : "Departure"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/95 border-blue-200 backdrop-blur-sm">
                <CalendarComponent
                  mode="single"
                  selected={formData.departureDate || undefined}
                  onSelect={(date) => {
                    setFormData(prev => ({ ...prev, departureDate: date || null }));
                    setDepartureCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {formData.tripType === 'round-trip' && (
              <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/80 border-blue-300 hover:bg-blue-50 text-blue-800">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    {formData.returnDate ? format(formData.returnDate, "MMM dd") : "Return"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/95 border-blue-200 backdrop-blur-sm">
                  <CalendarComponent
                    mode="single"
                    selected={formData.returnDate || undefined}
                    onSelect={(date) => {
                      setFormData(prev => ({ ...prev, returnDate: date || null }));
                      setReturnCalendarOpen(false);
                    }}
                    disabled={(date) => date < (formData.departureDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="mt-6 flex flex-col items-center space-y-4">
            <Button 
              onClick={handleSearch} 
              size="lg" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold shadow-lg transition-all duration-200"
              disabled={!isFormValid || isLoading}
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? 'Searching...' : 'Search flights'}
            </Button>
          </div>
        </Card>
  );
};

export default FlightSearchForm;