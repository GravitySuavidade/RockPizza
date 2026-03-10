import { ShoppingCart, Menu, X, Flame, Guitar } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { clsx } from 'clsx';

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const location = useLocation();

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Promoções', path: '/deals' },
    { name: 'Seguir', path: '/track' },
    { name: 'Sobre', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group">
            <Link to="/" className="flex items-center gap-2 relative">
              <div className="relative">
                <Guitar className="w-8 h-8 text-rock-red transform -rotate-12 group-hover:rotate-12 transition-transform duration-300" />
                <Flame className="w-5 h-5 text-rock-orange absolute -bottom-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-display text-white tracking-tighter uppercase group-hover:text-rock-red transition-colors duration-300 ml-1">
                Rock<span className="text-rock-red group-hover:text-white">Pizza</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-rock-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-lg font-display uppercase tracking-widest transition-all duration-200 relative group',
                  location.pathname === link.path ? 'text-rock-red' : 'text-white hover:text-rock-red'
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {location.pathname === link.path && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-rock-red"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-rock-red transition-colors group"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-rock-green rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-white hover:text-rock-red transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10 animate-in slide-in-from-top-10 duration-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'block px-4 py-3 text-xl font-display uppercase tracking-widest border-l-2 transition-all',
                  location.pathname === link.path 
                    ? 'border-rock-red text-rock-red bg-white/5' 
                    : 'border-transparent text-white hover:border-white/50 hover:bg-white/5 hover:pl-6'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
