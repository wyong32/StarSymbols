
import { Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-8 w-8 text-purple-400" />
              <h3 className="text-2xl font-bold">StarCopy</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              The ultimate destination for star symbols and aesthetic text generation. 
              Make your content sparkle with our extensive collection of Unicode stars.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 StarCopy. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#symbols" className="hover:text-purple-400 transition-colors">Star Symbols</a></li>
              <li><a href="#gallery" className="hover:text-purple-400 transition-colors">Gallery</a></li>
              <li><a href="#generator" className="hover:text-purple-400 transition-colors">Text Generator</a></li>
              <li><a href="#how-to-use" className="hover:text-purple-400 transition-colors">How to Use</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><span className="hover:text-purple-400 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-purple-400 transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            Made with ⭐ for creators everywhere. Spread the sparkle! ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
