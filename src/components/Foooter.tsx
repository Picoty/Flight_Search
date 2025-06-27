import React, { useState } from 'react';
import { Globe, MapPin, DollarSign, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      {/* Language, Location, Currency Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {/* Language */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-transparent border-gray-600 text-blue-400 hover:bg-gray-700 hover:text-blue-300"
          >
            <Globe className="w-4 h-4" />
            <span>Language • English (United States)</span>
          </Button>

          {/* Location */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-transparent border-gray-600 text-blue-400 hover:bg-gray-700 hover:text-blue-300"
          >
            <MapPin className="w-4 h-4" />
            <span>Location • Kenya</span>
          </Button>

          {/* Currency */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-transparent border-gray-600 text-blue-400 hover:bg-gray-700 hover:text-blue-300"
          >
            <DollarSign className="w-4 h-4" />
            <span>Currency • KES</span>
          </Button>
        </div>

        {/* Current Settings Info */}
        <div className="text-center text-gray-400 text-sm mb-4">
          <p>Current language and currency options applied: English (United States) - Kenya - KES</p>
          <p>
            Displayed currencies may differ from the currencies used to purchase flights.{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Learn more
            </button>
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 py-4 border-y border-gray-700">
          <button className="text-blue-400 hover:text-blue-300 text-sm">About</button>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Privacy</button>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Terms</button>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Join user studies</button>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Feedback</button>
          <button className="text-blue-400 hover:text-blue-300 text-sm">Help Center</button>
        </div>

        {/* Expandable Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div>
            <button
              onClick={() => setIsInternationalOpen(!isInternationalOpen)}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-lg font-medium mb-4"
            >
              <span>International sites</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${isInternationalOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {isInternationalOpen && (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button className="text-gray-400 hover:text-white text-left py-1">Argentina</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Australia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Belgium</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Brasil</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Canada</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Chile</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Colombia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Deutschland</button>
                <button className="text-gray-400 hover:text-white text-left py-1">España</button>
                <button className="text-gray-400 hover:text-white text-left py-1">France</button>
                <button className="text-gray-400 hover:text-white text-left py-1">India</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Indonesia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Italia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">日本</button>
                <button className="text-gray-400 hover:text-white text-left py-1">대한민국</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Malaysia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">México</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Nederland</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Nigeria</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Perú</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Philippines</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Polska</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Portugal</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Singapore</button>
                <button className="text-gray-400 hover:text-white text-left py-1">South Africa</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Sverige</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Thailand</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Türkiye</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Ukraine</button>
                <button className="text-gray-400 hover:text-white text-left py-1">United Kingdom</button>
                <button className="text-gray-400 hover:text-white text-left py-1">United States</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Việt Nam</button>
                <button className="text-gray-400 hover:text-white text-left py-1">中国</button>
              </div>
            )}
          </div>

          {/* Explore Flights */}
          <div>
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-lg font-medium mb-4"
            >
              <span>Explore flights</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {isExploreOpen && (
              <div className="grid grid-cols-1 gap-2 text-sm">
                <button className="text-gray-400 hover:text-white text-left py-1">Cheap flights</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flight deals</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to Europe</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to Asia</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to North America</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to Dubai</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to London</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to New York</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to Paris</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Flights to Tokyo</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Last minute flights</button>
                <button className="text-gray-400 hover:text-white text-left py-1">Weekend getaways</button>
              </div>
            )}
          </div>
        </div>

        
        <div className="text-center text-gray-500 text-sm pt-4 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} FlightSearch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;