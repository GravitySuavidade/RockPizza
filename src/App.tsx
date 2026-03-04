import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Track } from './pages/Track';
import { Deals } from './pages/Deals';
import { PizzaBuilder } from './components/PizzaBuilder';
import { CartPanel } from './components/CartPanel';
import { Toast } from './components/Toast';
import { MenuItem } from './data/menu';
import { CartItem } from './store/cartStore';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [builderItem, setBuilderItem] = useState<MenuItem | null>(null);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenBuilder = (item: MenuItem) => {
    setBuilderItem(item);
    setEditingCartItem(null);
  };

  const handleEditCartItem = (cartItem: CartItem) => {
    // Find the corresponding menu item to pass to the builder
    // In a real app, you'd fetch it or have it available. Here we assume it's in MENU_ITEMS.
    import('./data/menu').then(({ MENU_ITEMS }) => {
      const item = MENU_ITEMS.find(m => m.id === cartItem.menuItemId);
      if (item) {
        setBuilderItem(item);
        setEditingCartItem(cartItem);
        setIsCartOpen(false); // Close cart when editing
      }
    });
  };

  const handleCloseBuilder = () => {
    setBuilderItem(null);
    setEditingCartItem(null);
  };

  const handleAddSuccess = () => {
    setToastMessage(editingCartItem ? 'Order updated — Hell yeah.' : 'Added to cart — Hell yeah.');
    setIsCartOpen(true); // Optionally open cart on add
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-rock-bg text-rock-text font-sans selection:bg-rock-red/30 selection:text-white">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home onAddProduct={handleOpenBuilder} />} />
            <Route path="/menu" element={<Menu onAddProduct={handleOpenBuilder} />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/track" element={<Track />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        {/* Global Components */}
        {builderItem && (
          <PizzaBuilder
            item={builderItem}
            onClose={handleCloseBuilder}
            onAddSuccess={handleAddSuccess}
            initialCartItem={editingCartItem || undefined}
          />
        )}

        <CartPanel
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onEditItem={handleEditCartItem}
        />

        <Toast
          message={toastMessage}
          isVisible={!!toastMessage}
          onClose={() => setToastMessage('')}
        />
      </div>
    </Router>
  );
}
