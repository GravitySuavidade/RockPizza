import { useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import { MenuItem, Size, Crust, Sauce, ToppingScope, SIZES, CRUSTS, SAUCES, TOPPINGS, MENU_ITEMS } from '../data/menu';
import { useCartStore, CartItem, CartTopping } from '../store/cartStore';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';

interface PizzaBuilderProps {
  item: MenuItem;
  onClose: () => void;
  onAddSuccess: () => void;
  initialCartItem?: CartItem;
}

export function PizzaBuilder({ item, onClose, onAddSuccess, initialCartItem }: PizzaBuilderProps) {
  const [size, setSize] = useState<Size>(initialCartItem?.size || 'M');
  const [crust, setCrust] = useState<Crust>(initialCartItem?.crust || item.availableCrusts?.[0] || 'Classic');
  const [sauce, setSauce] = useState<Sauce>(initialCartItem?.sauce || item.availableSauces?.[0] || 'Tomato');
  const [mode, setMode] = useState<'whole' | 'half'>(initialCartItem?.mode || 'whole');
  const [flavorBId, setFlavorBId] = useState<string | undefined>(initialCartItem?.flavorBId);
  const [toppings, setToppings] = useState<CartTopping[]>(initialCartItem?.toppings || []);
  const [notes, setNotes] = useState(initialCartItem?.notes || '');

  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);

  const flavorB = useMemo(() => MENU_ITEMS.find((m) => m.id === flavorBId), [flavorBId]);

  const pricing = useMemo(() => {
    let base = item.basePrices[size];
    let splitFee = 0;

    if (mode === 'half' && flavorB) {
      base = Math.max(base, flavorB.basePrices[size]);
      splitFee = 1.0; // Fixed split fee
    }

    let toppingsTotal = 0;
    toppings.forEach((t) => {
      const toppingDef = TOPPINGS.find((td) => td.id === t.toppingId);
      if (toppingDef) {
        if (t.scope === 'whole') {
          toppingsTotal += toppingDef.price;
        } else {
          toppingsTotal += Math.round((toppingDef.price / 2) * 10) / 10; // Half price rounded
        }
      }
    });

    const subtotal = base + splitFee + toppingsTotal;

    return { base, splitFee, toppings: toppingsTotal, subtotal };
  }, [item, size, mode, flavorB, toppings]);

  const handleToppingToggle = (toppingId: string, scope: ToppingScope) => {
    setToppings((prev) => {
      const existingIndex = prev.findIndex((t) => t.toppingId === toppingId);
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        if (existing.scope === scope) {
          // Remove if clicking same scope
          return prev.filter((_, i) => i !== existingIndex);
        } else {
          // Update scope
          const newToppings = [...prev];
          newToppings[existingIndex] = { ...existing, scope };
          return newToppings;
        }
      } else {
        // Add new
        return [...prev, { toppingId, scope, amount: 'normal' }];
      }
    });
  };

  const handleAddToCart = () => {
    if (mode === 'half' && !flavorBId) {
      alert('Quase lá — escolhe a tua segunda metade!');
      return;
    }

    const cartItem: CartItem = {
      id: initialCartItem?.id || uuidv4(),
      type: 'pizza',
      menuItemId: item.id,
      flavorBId: mode === 'half' ? flavorBId : undefined,
      size,
      crust,
      sauce,
      mode,
      toppings,
      notes,
      quantity: initialCartItem?.quantity || 1,
      pricingSnapshot: pricing,
    };

    if (initialCartItem) {
      updateItem(cartItem.id, cartItem);
    } else {
      addItem(cartItem);
    }
    onAddSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
      <div className="bg-black/95 backdrop-blur-md w-full max-w-2xl h-[90vh] sm:h-[85vh] flex flex-col shadow-2xl border border-white/20 sm:rounded-3xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
          <h2 className="text-3xl font-display uppercase tracking-tighter text-white">
            {initialCartItem ? 'Editar Pedido' : 'Constrói a tua Pizza'}
          </h2>
          <button onClick={onClose} className="p-2 text-rock-muted hover:text-white transition-colors rounded-full hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* Mode Toggle */}
          <div className="bg-black/50 p-1.5 flex border border-white/10 rounded-2xl backdrop-blur-sm">
            <button
              className={clsx(
                'flex-1 py-3 px-4 font-display uppercase tracking-wider text-sm sm:text-base transition-all rounded-xl',
                mode === 'whole' ? 'bg-white text-black shadow-md' : 'text-rock-muted hover:text-white'
              )}
              onClick={() => {
                setMode('whole');
                // Reset toppings that are not 'whole'
                setToppings(prev => prev.filter(t => t.scope === 'whole'));
              }}
            >
              Pizza Inteira
            </button>
            <button
              className={clsx(
                'flex-1 py-3 px-4 font-display uppercase tracking-wider text-sm sm:text-base transition-all rounded-xl',
                mode === 'half' ? 'bg-white text-black shadow-md' : 'text-rock-muted hover:text-white'
              )}
              onClick={() => setMode('half')}
            >
              Metade & Metade
            </button>
          </div>

          {/* Flavors */}
          <div className="space-y-4">
            <h3 className="text-xl font-display uppercase text-white/80">Sabores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-white/5 rounded-2xl flex flex-col justify-center">
                <span className="text-xs font-bold uppercase text-rock-muted mb-1 tracking-widest">Metade 1</span>
                <p className="font-display text-xl text-white uppercase">{item.name}</p>
              </div>
              
              {mode === 'half' && (
                <div className="p-4 border border-white/10 bg-white/5 rounded-2xl flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase text-rock-muted mb-1 tracking-widest">Metade 2</span>
                  <select
                    className="w-full bg-transparent text-white font-display text-xl focus:ring-0 cursor-pointer outline-none uppercase appearance-none"
                    value={flavorBId || ''}
                    onChange={(e) => setFlavorBId(e.target.value)}
                  >
                    <option value="" disabled className="bg-black text-rock-muted">Escolher sabor...</option>
                    {MENU_ITEMS.filter((m) => m.category === 'Pizzas' && m.id !== item.id).map((m) => (
                      <option key={m.id} value={m.id} className="bg-black text-white">
                        {m.name} (+€{Math.max(0, (m.basePrices[size] || 0) - (item.basePrices[size] || 0)).toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <h3 className="text-xl font-display uppercase text-white/80">Tamanho</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={clsx(
                    'flex-1 min-w-[80px] py-3 px-4 font-mono font-bold text-sm sm:text-base transition-all border rounded-2xl whitespace-nowrap',
                    size === s
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-black/50 border-white/10 text-rock-muted hover:border-white/50 hover:text-white'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Crust & Sauce */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-display uppercase text-white/80">Massa</h3>
              <div className="space-y-2">
                {(item.availableCrusts || CRUSTS).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrust(c)}
                    className={clsx(
                      'w-full text-left px-5 py-3 font-mono text-sm transition-all border rounded-2xl flex justify-between items-center uppercase tracking-wider',
                      crust === c
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-black/50 border-white/10 text-rock-muted hover:border-white/50 hover:text-white'
                    )}
                  >
                    <span>{c}</span>
                    {crust === c && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-display uppercase text-white/80">Molho</h3>
              <div className="space-y-2">
                {(item.availableSauces || SAUCES).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSauce(s)}
                    className={clsx(
                      'w-full text-left px-5 py-3 font-mono text-sm transition-all border rounded-2xl flex justify-between items-center uppercase tracking-wider',
                      sauce === s
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-black/50 border-white/10 text-rock-muted hover:border-white/50 hover:text-white'
                    )}
                  >
                    <span>{s}</span>
                    {sauce === s && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toppings */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-xl font-display uppercase text-white/80">Ingredientes Extra</h3>
              {mode === 'half' && <span className="text-xs font-mono text-rock-muted">Metade = Metade do preço</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPPINGS.map((topping) => {
                const selected = toppings.find((t) => t.toppingId === topping.id);
                return (
                  <div key={topping.id} className="flex items-center justify-between p-3 bg-black/50 border border-white/10 rounded-2xl hover:border-white/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-display uppercase text-base text-white tracking-wide">{topping.name}</span>
                      <span className="text-xs text-rock-green font-mono">+€{topping.price.toFixed(2)}</span>
                    </div>
                    
                    {mode === 'whole' ? (
                      <button
                        onClick={() => handleToppingToggle(topping.id, 'whole')}
                        className={clsx(
                          'w-8 h-8 flex items-center justify-center rounded-full transition-all',
                          selected?.scope === 'whole' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                        )}
                      >
                        {selected?.scope === 'whole' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4 rotate-45" />}
                      </button>
                    ) : (
                      <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        <button
                          onClick={() => handleToppingToggle(topping.id, 'left')}
                          className={clsx(
                            'px-2 py-1 text-xs font-bold rounded transition-all',
                            selected?.scope === 'left' ? 'bg-white text-black' : 'text-rock-muted hover:text-white'
                          )}
                        >
                          M1
                        </button>
                        <button
                          onClick={() => handleToppingToggle(topping.id, 'whole')}
                          className={clsx(
                            'px-2 py-1 text-xs font-bold rounded transition-all',
                            selected?.scope === 'whole' ? 'bg-white text-black' : 'text-rock-muted hover:text-white'
                          )}
                        >
                          Toda
                        </button>
                        <button
                          onClick={() => handleToppingToggle(topping.id, 'right')}
                          className={clsx(
                            'px-2 py-1 text-xs font-bold rounded transition-all',
                            selected?.scope === 'right' ? 'bg-white text-black' : 'text-rock-muted hover:text-white'
                          )}
                        >
                          M2
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 pb-8">
            <h3 className="text-xl font-display uppercase text-white/80">Instruções Especiais</h3>
            <textarea
              className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-base text-white placeholder:text-rock-muted focus:border-white/50 focus:ring-0 outline-none resize-none font-mono transition-all"
              rows={2}
              placeholder="Alergias ou pedidos especiais? Diz-nos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

        </div>

        {/* Sticky Footer */}
        <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-rock-muted font-bold uppercase tracking-widest">Total</span>
            <span className="text-4xl font-display text-rock-green">€{pricing.subtotal.toFixed(2)}</span>
          </div>
          <button onClick={handleAddToCart} className="btn-primary text-xl px-8 py-4 rounded-xl">
            {initialCartItem ? 'ATUALIZAR' : 'ADICIONAR — HELL YEAH'}
          </button>
        </div>
      </div>
    </div>
  );
}
