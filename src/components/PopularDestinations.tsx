import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { POPULAR_DESTINATIONS } from '../utils/constants';

const PopularDestinations: React.FC = () => {
  const scrollLeft = () => {
    const container = document.getElementById('destinations-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('destinations-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDestinationClick = (destination: string) => {
    console.log(`Selected destination: ${destination}`);
    // TODO: Navigate to search results for this destination
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-normal text-white">
          Popular destinations from Nairobi
        </h2>
        
        {/* Scroll Controls */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollLeft}
            className="p-2 border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollRight}
            className="p-2 border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Destinations Scroll Container */}
      <div
        id="destinations-scroll"
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {POPULAR_DESTINATIONS.map((destination, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 cursor-pointer group"
            onClick={() => handleDestinationClick(destination.name)}
          >
            {/* Destination Image */}
            <div className="relative h-32 rounded-lg overflow-hidden mb-2">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to a gradient placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    // Create a gradient based on the destination name
                    const colors = [
                      'from-blue-400 to-purple-500',
                      'from-green-400 to-blue-500',
                      'from-purple-400 to-pink-500',
                      'from-yellow-400 to-orange-500',
                      'from-red-400 to-purple-500',
                      'from-indigo-400 to-purple-500',
                      'from-pink-400 to-red-500'
                    ];
                    const colorIndex = index % colors.length;
                    parent.className += ` bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center`;
                    parent.innerHTML = `<span class="text-white text-sm font-medium text-center px-2">${destination.name}</span>`;
                  }
                }}
              />
              
              {/* Overlay with destination name */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">{destination.name}</span>
              </div>
            </div>

            {/* Destination Name and Price */}
            <div className="text-center">
              <h3 className="font-medium text-white mb-1">{destination.name}</h3>
              <p className="text-sm text-gray-300">{destination.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;