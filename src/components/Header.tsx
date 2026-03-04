import { ShoppingCart, Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-rock-bg/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-display text-rock-red tracking-wider uppercase">Rock Pizza</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm font-semibold uppercase tracking-wider transition-colors hover:text-rock-red',
                  location.pathname === link.path ? 'text-rock-red' : 'text-rock-text'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-rock-text hover:text-rock-red transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rock-red rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-rock-text hover:text-rock-red"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-rock-surface border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-wider',
                  location.pathname === link.path ? 'text-rock-red bg-white/5' : 'text-rock-text hover:bg-white/5 hover:text-rock-red'
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
