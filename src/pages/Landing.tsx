import React from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import ExploreMap from '../components/ExploreMap';
import UsefulTools from '../components/UsefulTools';
import PopularDestinations from '../components/PopularDestinations';

const Landing: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Flights Title and Search Form */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 min-h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/airplane-sky-background.jpg"
            alt="Airplane in sky"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        {/* Background Illustration */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full relative overflow-hidden">
            {/* Mountain silhouettes */}
            <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1200 200" fill="none">
              <path d="M0 200L200 100L400 80L600 120L800 60L1000 100L1200 80V200H0Z" fill="currentColor" opacity="0.6"/>
              <path d="M0 200L150 120L350 100L550 140L750 80L950 120L1200 100V200H0Z" fill="currentColor" opacity="0.4"/>
              <path d="M0 200L100 140L300 120L500 160L700 100L900 140L1200 120V200H0Z" fill="currentColor" opacity="0.2"/>
            </svg>
            
            {/* Airplane icon */}
            <div className="absolute top-20 right-40 text-orange-400 opacity-60">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            
            {/* Backpacker figure */}
            <div className="absolute top-32 right-60 text-orange-500 opacity-50">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7.5L21 9ZM14 9.5V16.5C14 17.3 13.3 18 12.5 18S11 17.3 11 16.5V16.3L7.9 17.5C7.5 17.7 7 17.5 6.8 17.1L6.3 16.1C6.1 15.7 6.3 15.2 6.7 15L9.5 13.7V9.5C9.5 8.7 10.2 8 11 8H13C13.8 8 14.5 8.7 14.5 9.5H14Z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-white text-6xl font-light mb-16 text-center">Flights</h1>
          <FlightSearchForm />
        </div>
      </section>

      {/* Explore Destinations Section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-normal text-white mb-8">
            Find cheap flights from Nairobi to anywhere
          </h2>
          <ExploreMap />
        </div>
      </section>

      {/* Useful Tools Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <UsefulTools />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <PopularDestinations />
        </div>
      </section>
    </div>
  );
};

export default Landing;