
import { Star } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-purple-600 animate-twinkle" />
            <h1 className="text-2xl font-bold gradient-text">StarCopy</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('symbols')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Symbols
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('generator')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Generator
            </button>
            <button 
              onClick={() => scrollToSection('how-to-use')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              How to Use
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
