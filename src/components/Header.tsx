import React from 'react';
import { Menu, LayoutGrid, User } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-50 to-sky-100 border-b border-blue-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Google logo and navigation */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-100">
            <Menu className="w-5 h-5 text-blue-700" />
          </Button>
                             
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <Button variant="ghost" className="text-blue-700 hover:text-blue-800 bg-blue-100 hover:bg-blue-200">
              Flights
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              Hotels
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              Cars
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              Packages
            </Button>
          </nav>
        </div>

        {/* Right side - Settings and profile */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-100">
            <LayoutGrid className="w-5 h-5 text-blue-700" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-blue-100">
            <User className="w-5 h-5 text-blue-700" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;