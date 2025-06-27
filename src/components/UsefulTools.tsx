import React from 'react';
import { Calendar, TrendingUp, Bell, Star, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const UsefulTools: React.FC = () => {
  // Sample calendar data for visualization
  const calendarDays = [
    { day: 1, status: 'normal' },
    { day: 2, status: 'normal' },
    { day: 3, status: 'good' },
    { day: 4, status: 'normal' },
    { day: 5, status: 'expensive' },
    { day: 6, status: 'expensive' },
    { day: 7, status: 'normal' },
    { day: 8, status: 'normal' },
    { day: 9, status: 'normal' },
    { day: 10, status: 'good' },
    { day: 11, status: 'normal' },
    { day: 12, status: 'normal' },
    { day: 13, status: 'normal' },
    { day: 14, status: 'normal' },
    { day: 15, status: 'good' },
    { day: 16, status: 'normal' },
    { day: 17, status: 'normal' },
    { day: 18, status: 'normal' },
    { day: 19, status: 'normal' },
    { day: 20, status: 'normal' },
    { day: 21, status: 'normal' },
    { day: 22, status: 'normal' },
    { day: 23, status: 'normal' },
    { day: 24, status: 'normal' },
    { day: 25, status: 'normal' },
    { day: 26, status: 'normal' },
    { day: 27, status: 'normal' },
    { day: 28, status: 'normal' },
    { day: 29, status: 'normal' },
    { day: 30, status: 'normal' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <Star className="w-4 h-4 text-green-500 fill-current" />;
      case 'expensive':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 border-green-200';
      case 'expensive':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-normal text-white mb-8">
        Useful tools to help you find the best deals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Tool Cards */}
        <div className="space-y-6">
          {/* Find cheapest days to fly */}
          <Card className="bg-gray-700 text-white p-6 hover:bg-gray-600 transition-colors cursor-pointer border-gray-600">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Find the cheapest days to fly</h3>
                  <p className="text-gray-300 text-sm">
                    The Date grid and Price graph make it easy to see the best flight deals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* See the whole picture with price insights */}
          <Card className="bg-gray-700 text-white p-6 hover:bg-gray-600 transition-colors cursor-pointer border-gray-600">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">See the whole picture with price insights</h3>
                  <p className="text-gray-300 text-sm">
                    Price history and trend data show you when to book to get the best price on your flight
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Track prices for a trip */}
          <Card className="bg-gray-700 text-white p-6 hover:bg-gray-600 transition-colors cursor-pointer border-gray-600">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Track prices for a trip</h3>
                  <p className="text-gray-300 text-sm">
                    Not ready to book yet? Observe price changes for a route or flight and get 
                    notified when prices drop.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar Insights */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Insightful tools help you choose your trip dates
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              If your travel plans are flexible, use the form above to start searching for a specific trip. 
              Then, play around with the <strong>Date grid</strong> and <strong>Price graph</strong> options 
              on the Search page to find the cheapest days to get to your destination — and back again for round trips.
            </p>
          </div>

          {/* Calendar Visualization */}
          <Card className="bg-gray-800 p-6 border-gray-600">
            <CardContent className="p-0">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4 text-white">
                <Calendar className="w-5 h-5" />
                <div className="flex space-x-4 text-sm">
                  <span>Month view</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Calendar headers */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-xs text-gray-400 p-2 font-medium">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((dayData, index) => (
                  <div
                    key={index}
                    className={`
                      relative h-10 border rounded flex items-center justify-center text-sm
                      ${getStatusColor(dayData.status)}
                      ${dayData.status === 'normal' ? 'text-gray-600' : 'text-gray-800'}
                    `}
                  >
                    <span className="text-xs">{dayData.day}</span>
                    {getStatusIcon(dayData.status) && (
                      <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                        {getStatusIcon(dayData.status)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-green-400 fill-current" />
                  <span>Best prices</span>
                </div>
                <div className="flex items-center space-x-1">
                  <X className="w-3 h-3 text-red-400" />
                  <span>Higher prices</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsefulTools;