import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Email, 
  LocationOn, 
  Favorite,
  LocalShipping,
  Security,
  EmojiEvents,
  People,
  ShoppingBag
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="mt-4 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Favorite className="h-6 w-6 sm:h-8 sm:w-8 text-orange-300 mr-2" />
              <h3 className="text-lg sm:text-2xl font-bold text-orange-100"> Lanka Crafts</h3>
            </div>
            <p className="text-orange-200 mb-4 text-sm sm:text-base leading-relaxed">
              Discover authentic Sri Lankan handicrafts made by skilled rural artisans. 
              Bringing you traditional crafts with modern convenience.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <div key={idx} className="bg-orange-800/50 p-2 rounded-full hover:bg-orange-700/50 transition-colors cursor-pointer">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 text-orange-100 flex items-center">
              <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              Our Crafts
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {[
                'Traditional Masks',
                'Batik Clothing',
                'Wood Carvings',
                'Lacework',
                'Pottery & Ceramics',
                'Handwoven Textiles'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-orange-200 hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 text-orange-100 flex items-center">
              <People className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {[
                'About Our Artisans',
                'How to Order',
                'Shipping Info',
                'Return Policy',
                'Wholesale',
                'Contact Us'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-orange-200 hover:text-white transition-colors hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 text-orange-100">Contact Us</h4>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex items-start">
                <LocationOn className="h-4 sm:h-5 w-4 sm:w-5 text-orange-300 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                <span className="text-orange-200">
                  123 Kandy Street, Kandy 07<br />
                  Sri Lanka
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-orange-300 mr-2 sm:mr-3" />
                <span className="text-orange-200">+94 11 234 5678</span>
              </div>
              <div className="flex items-center">
                <Email className="h-4 sm:h-5 w-4 sm:w-5 text-orange-300 mr-2 sm:mr-3" />
                <span className="text-orange-200">lankacraft@srilankacrafts.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-orange-800/50 mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="flex items-center justify-center sm:justify-start">
              <LocalShipping className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300 mr-2 sm:mr-3" />
              <div>
                <h5 className="font-semibold text-orange-100">Free Shipping</h5>
                <p className="text-orange-300">On orders over Rs. 5,000</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Security className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300 mr-2 sm:mr-3" />
              <div>
                <h5 className="font-semibold text-orange-100">Secure Payment</h5>
                <p className="text-orange-300">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <EmojiEvents className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300 mr-2 sm:mr-3" />
              <div>
                <h5 className="font-semibold text-orange-100">Authentic Crafts</h5>
                <p className="text-orange-300">Directly from artisans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 py-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-orange-200 mb-2 sm:mb-0 text-center sm:text-left">
              © 2024 Sri Lanka Crafts Platform. Supporting rural artisans across Sri Lanka.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 mt-2 sm:mt-0">
              <a href="#" className="text-orange-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-orange-200 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-orange-200 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
