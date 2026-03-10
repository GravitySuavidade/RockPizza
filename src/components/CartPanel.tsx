import { X, Trash2, Edit2, Plus, Minus } from 'lucide-react';
import { useCartStore, CartItem } from '../store/cartStore';
import { MENU_ITEMS, TOPPINGS } from '../data/menu';
import { Link } from 'react-router-dom';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onEditItem: (item: CartItem) => void;
}

export function CartPanel({ isOpen, onClose, onEditItem }: CartPanelProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-black/95 backdrop-blur-md shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right-full duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
          <h2 className="text-3xl font-display uppercase tracking-tighter flex items-center gap-4 text-white">
            O Teu Carrinho
            <span className="bg-rock-red text-white text-lg px-3 py-1 rounded-full">{items.length}</span>
          </h2>
          <button onClick={onClose} className="p-2 text-rock-muted hover:text-white transition-colors rounded-full hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50">
              <span className="text-8xl animate-pulse">🤘</span>
              <p className="text-3xl font-display uppercase text-rock-muted">O teu carrinho está vazio.<br/>Vamos fazer barulho.</p>
              <button onClick={onClose} className="btn-secondary mt-4 text-xl px-8 py-4 rounded-xl">VER MENU</button>
            </div>
          ) : (
            items.map((item) => {
              const menuItem = MENU_ITEMS.find((m) => m.id === item.menuItemId);
              const flavorB = item.flavorBId ? MENU_ITEMS.find((m) => m.id === item.flavorBId) : null;
              
              if (!menuItem) return null;

              return (
                <div key={item.id} className="card-rock p-5 flex flex-col gap-4 border border-white/10 rounded-2xl bg-white/5 hover:border-white/30 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-display uppercase text-white tracking-wide">
                        {item.mode === 'half' ? `${menuItem.name} / ${flavorB?.name}` : menuItem.name}
                      </h3>
                      <p className="text-sm text-rock-muted font-mono mt-2 uppercase tracking-wider">
                        {item.size} • {item.crust} • {item.sauce}
                      </p>
                      {item.toppings.length > 0 && (
                        <p className="text-xs text-rock-muted/70 font-mono mt-2 border-l border-white/20 pl-2">
                          + {item.toppings.map(t => {
                            const td = TOPPINGS.find(d => d.id === t.toppingId);
                            return td ? `${td.name} (${t.scope})` : '';
                          }).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-display text-rock-green text-2xl">
                      €{(item.pricingSnapshot.subtotal * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-white/20 rounded-lg bg-black/50 overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                          className="p-2 text-rock-muted hover:text-white hover:bg-white/10 transition-colors border-r border-white/20"
                        >
                          {item.quantity > 1 ? <Minus className="w-4 h-4" /> : <Trash2 className="w-4 h-4 text-rock-red" />}
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-lg text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-rock-muted hover:text-white hover:bg-white/10 transition-colors border-l border-white/20"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditItem(item)}
                        className="p-2 text-rock-muted hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        aria-label="Edit item"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/50 space-y-4 backdrop-blur-md">
            <div className="flex justify-between items-center text-sm font-mono text-rock-muted uppercase tracking-wider">
              <span>Subtotal</span>
              <span>€{getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono text-rock-muted uppercase tracking-wider">
              <span>Taxa de Entrega</span>
              <span>€2.50</span>
            </div>
            <div className="flex justify-between items-center text-3xl font-display text-white pt-4 border-t border-white/10">
              <span>Total</span>
              <span className="text-rock-green">€{(getTotal() + 2.50).toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn-primary w-full flex justify-center items-center gap-2 mt-6 text-xl py-4 rounded-xl"
            >
              FINALIZAR PEDIDO
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
