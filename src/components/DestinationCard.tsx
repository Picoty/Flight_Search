import React from 'react';
import { Card, CardContent } from './ui/card';

interface Destination {
  name: string;
  price: string;
  dateRange: string;
  duration: string;
  stops: string;
  image: string;
}

interface DestinationCardProps {
  destination: Destination;
  onClick: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.className += ' bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center';
              parent.innerHTML = `<span class="text-white text-lg font-medium">${destination.name}</span>`;
            }
          }}
        />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900">{destination.name}</h3>
          <span className="text-lg font-semibold text-gray-900">{destination.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{destination.dateRange}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{destination.stops}</span>
          <span>•</span>
          <span>{destination.duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;