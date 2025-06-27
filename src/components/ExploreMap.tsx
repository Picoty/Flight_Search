import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MapPin, Clock, DollarSign, Plane } from 'lucide-react';
import { cn } from '../lib/utils';
import DestinationCard from './DestinationCard';

interface Destination {
  name: string;
  price: string;
  dateRange: string;
  duration: string;
  stops: string;
  image: string;
  coordinates: { x: number; y: number };
  priceValue: number;
  popular?: boolean;
}

const ExploreMap: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Nairobi');
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const tabs = ['Nairobi', 'Nanyuki', 'Kecorok'];

  const destinations: Destination[] = [
    {
      name: 'London',
      price: 'KES 95,923',
      dateRange: 'Oct 9 – Oct 15',
      duration: '13 hr 30 min',
      stops: '2 stops',
      image: '/images/london.jpg',
      coordinates: { x: 42, y: 30 }, // UK position
      priceValue: 95923,
      popular: true
    },
    {
      name: 'New York',
      price: 'KES 123,473',
      dateRange: 'Sep 12 – Sep 21',
      duration: '19 hr 30 min',
      stops: '1 stop',
      image: '/images/new-york.jpg',
      coordinates: { x: 22, y: 40 }, // East Coast North America
      priceValue: 123473
    },
    {
      name: 'Singapore',
      price: 'KES 110,000',
      dateRange: 'Jul 7 – Jul 13',
      duration: '15 hr 45 min',
      stops: '1 stop',
      image: '/images/singapore.jpg',
      coordinates: { x: 68, y: 52 }, // Southeast Asia
      priceValue: 110000,
      popular: true
    },
    {
      name: 'Cape Town',
      price: 'KES 92,070',
      dateRange: 'Jul 10 – Jul 17',
      duration: '10 hr 15 min',
      stops: '1 stop',
      image: '/images/cape-town.jpg',
      coordinates: { x: 48, y: 74 }, // Southern Africa
      priceValue: 92070
    },
    // {
    //   name: 'Dubai',
    //   price: 'KES 67,500',
    //   dateRange: 'Aug 15 – Aug 22',
    //   duration: '8 hr 45 min',
    //   stops: 'Direct',
    //   image: '/images/dubai.jpg',
    //   coordinates: { x: 56, y: 48 },
    //   priceValue: 67500,
    //   popular: true
    // }
  ];

  const originCoordinates = { x: 52, y: 56 }; // Nairobi, Kenya (East Africa)
  const sortedDestinations = [...destinations].sort((a, b) => a.priceValue - b.priceValue);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination.name);
    console.log(`Selected destination: ${destination.name} from ${selectedTab}`);
  };

  const getPriceCategory = (price: number) => {
    if (price < 80000) return 'low';
    if (price < 120000) return 'medium';
    return 'high';
  };

  return (
    <div className="w-full space-y-6">
      {/* Add floating animation keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-10px) rotate(180deg); opacity: 0.6; }
          }
        `
      }} />

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-light text-white">
          Find cheap flights from Kenya to anywhere
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Discover amazing destinations with the best prices
        </p>
      </div>

      {/* Tab Selection */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "default" : "ghost"}
              onClick={() => setSelectedTab(tab)}
              className={cn(
                "px-4 py-2 text-sm transition-all",
                selectedTab === tab 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              )}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Responsive container with aspect ratio */}
            <div 
              className="relative w-full bg-gradient-to-br from-blue-900/20 to-gray-900/40"
              style={{ paddingBottom: '50%' }} // 2:1 aspect ratio
            >
              {/* Modern Abstract World Representation */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Global network visualization */}
                    <svg viewBox="0 0 1000 500" className="w-full h-full">
                      <defs>
                        <radialGradient id="nodeGradient" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                        </radialGradient>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                        </linearGradient>
                      </defs>
                      
                      {/* Global network nodes representing major regions */}
                      <g opacity="0.6">
                        {/* North America cluster */}
                        <circle cx="150" cy="140" r="25" fill="url(#nodeGradient)" />
                        <circle cx="120" cy="120" r="8" fill="rgba(59, 130, 246, 0.4)" />
                        <circle cx="180" cy="160" r="12" fill="rgba(59, 130, 246, 0.3)" />
                        
                        {/* Europe cluster */}
                        <circle cx="480" cy="120" r="20" fill="url(#nodeGradient)" />
                        <circle cx="460" cy="100" r="6" fill="rgba(59, 130, 246, 0.4)" />
                        <circle cx="500" cy="140" r="8" fill="rgba(59, 130, 246, 0.3)" />
                        
                        {/* Asia cluster */}
                        <circle cx="700" cy="150" r="30" fill="url(#nodeGradient)" />
                        <circle cx="650" cy="130" r="10" fill="rgba(59, 130, 246, 0.4)" />
                        <circle cx="750" cy="170" r="15" fill="rgba(59, 130, 246, 0.3)" />
                        <circle cx="720" cy="120" r="7" fill="rgba(59, 130, 246, 0.3)" />
                        
                        {/* Africa cluster */}
                        <circle cx="500" cy="280" r="22" fill="url(#nodeGradient)" />
                        <circle cx="480" cy="260" r="8" fill="rgba(59, 130, 246, 0.4)" />
                        <circle cx="520" cy="300" r="10" fill="rgba(59, 130, 246, 0.3)" />
                        
                        {/* Oceania cluster */}
                        <circle cx="780" cy="350" r="18" fill="url(#nodeGradient)" />
                        <circle cx="800" cy="370" r="6" fill="rgba(59, 130, 246, 0.3)" />
                        
                        {/* South America cluster */}
                        <circle cx="230" cy="320" r="20" fill="url(#nodeGradient)" />
                        <circle cx="210" cy="340" r="8" fill="rgba(59, 130, 246, 0.3)" />
                      </g>
                      
                      {/* Connection lines between regions */}
                      <g opacity="0.3">
                        {/* Transatlantic connections */}
                        <path d="M 180 140 Q 300 100 460 120" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" strokeDasharray="3,3">
                          <animate attributeName="stroke-dashoffset" values="0;6;0" dur="3s" repeatCount="indefinite" />
                        </path>
                        
                        {/* Transpacific connections */}
                        <path d="M 180 160 Q 400 200 700 170" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" strokeDasharray="4,4">
                          <animate attributeName="stroke-dashoffset" values="0;8;0" dur="4s" repeatCount="indefinite" />
                        </path>
                        
                        {/* Europe-Asia connections */}
                        <path d="M 500 120 Q 600 110 700 150" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" strokeDasharray="2,2">
                          <animate attributeName="stroke-dashoffset" values="0;4;0" dur="2s" repeatCount="indefinite" />
                        </path>
                        
                        {/* Africa connections */}
                        <path d="M 500 120 Q 500 200 500 280" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" strokeDasharray="3,3">
                          <animate attributeName="stroke-dashoffset" values="0;6;0" dur="3.5s" repeatCount="indefinite" />
                        </path>
                        
                        {/* Asia-Oceania connections */}
                        <path d="M 720 170 Q 750 260 780 350" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" strokeDasharray="2,2">
                          <animate attributeName="stroke-dashoffset" values="0;4;0" dur="2.5s" repeatCount="indefinite" />
                        </path>
                      </g>
                      
                      {/* Subtle grid overlay */}
                      <defs>
                        <pattern id="modernGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="0.5"/>
                          <circle cx="40" cy="40" r="1" fill="rgba(59, 130, 246, 0.15)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#modernGrid)" />
                      
                      {/* Latitude lines */}
                      <g opacity="0.2">
                        <line x1="0" y1="125" x2="1000" y2="125" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
                        <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" strokeDasharray="8,4" />
                        <line x1="0" y1="375" x2="1000" y2="375" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Floating particles for atmosphere */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30" style={{ left: '10%', top: '20%', animation: 'float 4s ease-in-out infinite' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20" style={{ left: '25%', top: '60%', animation: 'float 3s ease-in-out infinite 0.5s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40" style={{ left: '60%', top: '30%', animation: 'float 5s ease-in-out infinite 1s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-25" style={{ left: '80%', top: '70%', animation: 'float 3.5s ease-in-out infinite 1.5s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-35" style={{ left: '40%', top: '80%', animation: 'float 4.5s ease-in-out infinite 2s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30" style={{ left: '70%', top: '15%', animation: 'float 3.8s ease-in-out infinite 0.8s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20" style={{ left: '90%', top: '45%', animation: 'float 4.2s ease-in-out infinite 2.5s' }} />
                    <div className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40" style={{ left: '15%', top: '90%', animation: 'float 3.2s ease-in-out infinite 1.8s' }} />
                  </div>
                </div>
              </div>

              {/* Flight paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {destinations.map((destination, index) => (
                  <line
                    key={`path-${index}`}
                    x1={`${originCoordinates.x}%`}
                    y1={`${originCoordinates.y}%`}
                    x2={`${destination.coordinates.x}%`}
                    y2={`${destination.coordinates.y}%`}
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    className={cn(
                      "transition-all duration-300",
                      (hoveredDestination === destination.name || selectedDestination === destination.name) && 
                      "stroke-blue-400 opacity-100 stroke-2"
                    )}
                  />
                ))}
              </svg>

              {/* Origin marker */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ 
                  left: `${originCoordinates.x}%`, 
                  top: `${originCoordinates.y}%` 
                }}
              >
                <div className="relative group">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full animate-ping opacity-75" />
                  
                  {/* Origin tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap shadow-lg">
                      <p className="font-medium">{selectedTab}</p>
                      <p className="text-xs text-gray-300">Your departure city</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination markers */}
              {destinations.map((destination, index) => {
                const priceCategory = getPriceCategory(destination.priceValue);
                const isHovered = hoveredDestination === destination.name;
                const isSelected = selectedDestination === destination.name;
                
                return (
                  <div
                    key={destination.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ 
                      left: `${destination.coordinates.x}%`, 
                      top: `${destination.coordinates.y}%` 
                    }}
                    onMouseEnter={() => setHoveredDestination(destination.name)}
                    onMouseLeave={() => setHoveredDestination(null)}
                    onClick={() => handleDestinationClick(destination)}
                  >
                    <div className="relative group">
                      <div className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200",
                        priceCategory === 'low' && "bg-green-500",
                        priceCategory === 'medium' && "bg-yellow-500",
                        priceCategory === 'high' && "bg-orange-500",
                        (isHovered || isSelected) && "scale-125 ring-2 ring-white ring-opacity-50"
                      )} />
                      
                      {/* Popular indicator */}
                      {destination.popular && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}

                      {/* Destination tooltip */}
                      <div className={cn(
                        "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-opacity pointer-events-none",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}>
                        <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap shadow-lg max-w-xs">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{destination.name}</p>
                              {destination.popular && (
                                <span className="text-xs bg-blue-600 text-white px-1 py-0.5 rounded">Popular</span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center text-green-400">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {destination.price}
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Clock className="w-3 h-3 mr-1" />
                                {destination.duration}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">{destination.dateRange}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Controls overlay */}
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-gray-800">
                  <Plane className="w-4 h-4 mr-2" />
                  Explore
                </Button>
              </div>

              {/* Price legend */}
              <div className="absolute bottom-4 left-4 bg-black/60 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-4 text-xs text-white">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Under 80k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>80k-120k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>120k+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destination Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Top Destinations</h3>
          <span className="text-sm text-gray-400 border border-gray-600 px-2 py-1 rounded">
            {destinations.length} destinations
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedDestinations.map((destination, index) => (
            <Card 
              key={destination.name}
              className={cn(
                "group cursor-pointer transition-all duration-200 hover:shadow-lg border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-blue-500 overflow-hidden",
                selectedDestination === destination.name && "ring-2 ring-blue-500 border-blue-500"
              )}
              onClick={() => handleDestinationClick(destination)}
              onMouseEnter={() => setHoveredDestination(destination.name)}
              onMouseLeave={() => setHoveredDestination(null)}
            >
              {/* Destination Image */}
              <div className="relative h-40 sm:h-48 bg-gray-700 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const gradients = [
                        'from-blue-500 to-purple-600',
                        'from-green-500 to-teal-600',
                        'from-purple-500 to-pink-600',
                        'from-yellow-500 to-orange-600',
                        'from-red-500 to-pink-600',
                        'from-indigo-500 to-blue-600'
                      ];
                      const gradientIndex = index % gradients.length;
                      parent.className += ` bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center`;
                      parent.innerHTML = `<div class="text-center text-white">
                        <h3 class="text-lg font-bold">${destination.name}</h3>
                        <p class="text-sm opacity-80">Discover this destination</p>
                      </div>`;
                    }
                  }}
                />
                
                {/* Image Overlay with badges */}
                <div className="absolute top-3 right-3 flex flex-col space-y-1">
                  {destination.popular && (
                    <span className="text-xs bg-blue-600/90 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                      Popular
                    </span>
                  )}
                  {index < 3 && (
                    <span className="text-xs bg-green-600/90 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                      Best Price
                    </span>
                  )}
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-lg font-bold text-green-400">{destination.price}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Destination Info */}
                  <div>
                    <h4 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors mb-1">
                      {destination.name}
                    </h4>
                    <p className="text-sm text-gray-400">{destination.dateRange}</p>
                  </div>

                  {/* Flight Details */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                    <div className="text-gray-400">
                      {destination.stops}
                    </div>
                  </div>

                  {/* Action button */}
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDestinationClick(destination);
                    }}
                  >
                    <Plane className="w-4 h-4 mr-2" />
                    View Flights
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMap;