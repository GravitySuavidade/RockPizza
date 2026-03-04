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
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-rock-surface shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right-full duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-rock-bg/50">
          <h2 className="text-2xl font-display uppercase tracking-wider text-rock-text flex items-center gap-3">
            O Teu Carrinho
            <span className="bg-rock-red text-white text-xs px-2 py-1 rounded-full">{items.length}</span>
          </h2>
          <button onClick={onClose} className="p-2 text-rock-muted hover:text-rock-red transition-colors rounded-full hover:bg-white/5">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <span className="text-6xl">🤘</span>
              <p className="text-xl font-display uppercase text-rock-muted">O teu carrinho está vazio.<br/>Vamos fazer barulho.</p>
              <button onClick={onClose} className="btn-secondary mt-4">Ver Menu</button>
            </div>
          ) : (
            items.map((item) => {
              const menuItem = MENU_ITEMS.find((m) => m.id === item.menuItemId);
              const flavorB = item.flavorBId ? MENU_ITEMS.find((m) => m.id === item.flavorBId) : null;
              
              if (!menuItem) return null;

              return (
                <div key={item.id} className="card-rock p-4 flex flex-col gap-3 border-white/10 bg-rock-bg/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-display uppercase text-rock-text">
                        {item.mode === 'half' ? `${menuItem.name} / ${flavorB?.name}` : menuItem.name}
                      </h3>
                      <p className="text-xs text-rock-muted font-sans mt-1">
                        {item.size} • {item.crust} • {item.sauce}
                      </p>
                      {item.toppings.length > 0 && (
                        <p className="text-xs text-rock-muted/70 font-sans mt-1">
                          + {item.toppings.map(t => {
                            const td = TOPPINGS.find(d => d.id === t.toppingId);
                            return td ? `${td.name} (${t.scope})` : '';
                          }).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-display text-rock-green text-lg">
                      €{(item.pricingSnapshot.subtotal * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-rock-surface rounded-lg border border-white/10 p-1">
                      <button
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                        className="p-1 text-rock-muted hover:text-white transition-colors"
                      >
                        {item.quantity > 1 ? <Minus className="w-4 h-4" /> : <Trash2 className="w-4 h-4 text-rock-red" />}
                      </button>
                      <span className="w-6 text-center font-sans font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-rock-muted hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditItem(item)}
                        className="p-2 text-rock-muted hover:text-rock-orange transition-colors rounded-lg hover:bg-white/5"
                        aria-label="Edit item"
                      >
                        <Edit2 className="w-4 h-4" />
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
          <div className="p-6 border-t border-white/10 bg-rock-surface/95 backdrop-blur-md space-y-4">
            <div className="flex justify-between items-center text-sm font-sans text-rock-muted">
              <span>Subtotal</span>
              <span>€{getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-sans text-rock-muted">
              <span>Taxa de Entrega</span>
              <span>€2.50</span>
            </div>
            <div className="flex justify-between items-center text-xl font-display text-rock-text pt-2 border-t border-white/10">
              <span>Total</span>
              <span className="text-rock-green">€{(getTotal() + 2.50).toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
            >
              Finalizar Pedido
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
