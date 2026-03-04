import { useState, useMemo, useEffect } from 'react';
import { X, Check, Info } from 'lucide-react';
import { MenuItem, Size, Crust, Sauce, Topping, ToppingScope, SIZES, CRUSTS, SAUCES, TOPPINGS, MENU_ITEMS } from '../data/menu';
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-rock-surface w-full max-w-2xl h-[90vh] sm:h-[85vh] sm:rounded-2xl flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-rock-bg/50">
          <h2 className="text-2xl font-display uppercase tracking-wider text-rock-text">
            {initialCartItem ? 'Editar Pedido' : 'Constrói a tua Pizza'}
          </h2>
          <button onClick={onClose} className="p-2 text-rock-muted hover:text-rock-red transition-colors rounded-full hover:bg-white/5">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {/* Mode Toggle */}
          <div className="bg-rock-bg rounded-xl p-1 flex">
            <button
              className={clsx(
                'flex-1 py-3 px-4 rounded-lg font-display uppercase tracking-wider text-sm transition-all',
                mode === 'whole' ? 'bg-rock-surface text-rock-red shadow-md border border-rock-red/20' : 'text-rock-muted hover:text-rock-text'
              )}
              onClick={() => setMode('whole')}
            >
              Pizza Inteira
            </button>
            <button
              className={clsx(
                'flex-1 py-3 px-4 rounded-lg font-display uppercase tracking-wider text-sm transition-all',
                mode === 'half' ? 'bg-rock-surface text-rock-orange shadow-md border border-rock-orange/20' : 'text-rock-muted hover:text-rock-text'
              )}
              onClick={() => setMode('half')}
            >
              Metade & Metade
            </button>
          </div>

          {/* Flavors */}
          <div className="space-y-4">
            <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2">Sabores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-rock p-4 border-rock-red/30 bg-rock-red/5">
                <span className="text-xs font-bold uppercase text-rock-red mb-1 block">Sabor A</span>
                <p className="font-display text-xl">{item.name}</p>
              </div>
              
              {mode === 'half' && (
                <div className="card-rock p-4 border-rock-orange/30 bg-rock-orange/5">
                  <span className="text-xs font-bold uppercase text-rock-orange mb-1 block">Sabor B</span>
                  <select
                    className="w-full bg-transparent border-none text-rock-text font-display text-xl focus:ring-0 cursor-pointer outline-none"
                    value={flavorBId || ''}
                    onChange={(e) => setFlavorBId(e.target.value)}
                  >
                    <option value="" disabled className="bg-rock-surface text-rock-muted">Escolhe a segunda metade...</option>
                    {MENU_ITEMS.filter((m) => m.category === 'Pizzas' && m.id !== item.id).map((m) => (
                      <option key={m.id} value={m.id} className="bg-rock-surface text-rock-text">
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
            <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2">Tamanho</h3>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={clsx(
                    'py-3 rounded-xl font-sans font-semibold text-sm transition-all border',
                    size === s
                      ? 'bg-rock-red/10 border-rock-red text-rock-red shadow-[0_0_10px_rgba(255,42,42,0.2)]'
                      : 'bg-rock-bg border-white/5 text-rock-muted hover:border-white/20 hover:text-rock-text'
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
              <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2">Massa</h3>
              <div className="space-y-2">
                {(item.availableCrusts || CRUSTS).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrust(c)}
                    className={clsx(
                      'w-full text-left px-4 py-3 rounded-xl font-sans text-sm transition-all border flex justify-between items-center',
                      crust === c
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-rock-bg border-white/5 text-rock-muted hover:border-white/20 hover:text-rock-text'
                    )}
                  >
                    <span>{c}</span>
                    {crust === c && <Check className="w-4 h-4 text-rock-green" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2">Molho</h3>
              <div className="space-y-2">
                {(item.availableSauces || SAUCES).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSauce(s)}
                    className={clsx(
                      'w-full text-left px-4 py-3 rounded-xl font-sans text-sm transition-all border flex justify-between items-center',
                      sauce === s
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-rock-bg border-white/5 text-rock-muted hover:border-white/20 hover:text-rock-text'
                    )}
                  >
                    <span>{s}</span>
                    {sauce === s && <Check className="w-4 h-4 text-rock-green" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toppings */}
          <div className="space-y-4">
            <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2 flex justify-between items-end">
              <span>Ingredientes Extra</span>
              <span className="text-xs font-sans normal-case text-rock-muted/70">Metade = Metade do preço</span>
            </h3>
            <div className="space-y-3">
              {TOPPINGS.map((topping) => {
                const selected = toppings.find((t) => t.toppingId === topping.id);
                return (
                  <div key={topping.id} className="flex items-center justify-between p-3 rounded-xl bg-rock-bg border border-white/5">
                    <div className="flex flex-col">
                      <span className="font-sans font-medium text-rock-text">{topping.name}</span>
                      <span className="text-xs text-rock-green">+€{topping.price.toFixed(2)}</span>
                    </div>
                    <div className="flex bg-rock-surface rounded-lg p-1 border border-white/10">
                      {mode === 'half' && (
                        <button
                          onClick={() => handleToppingToggle(topping.id, 'left')}
                          className={clsx(
                            'px-3 py-1 text-xs font-bold rounded-md transition-colors',
                            selected?.scope === 'left' ? 'bg-rock-red text-white' : 'text-rock-muted hover:text-white'
                          )}
                        >
                          L
                        </button>
                      )}
                      <button
                        onClick={() => handleToppingToggle(topping.id, 'whole')}
                        className={clsx(
                          'px-3 py-1 text-xs font-bold rounded-md transition-colors',
                          selected?.scope === 'whole' ? 'bg-rock-green text-rock-bg' : 'text-rock-muted hover:text-white'
                        )}
                      >
                        W
                      </button>
                      {mode === 'half' && (
                        <button
                          onClick={() => handleToppingToggle(topping.id, 'right')}
                          className={clsx(
                            'px-3 py-1 text-xs font-bold rounded-md transition-colors',
                            selected?.scope === 'right' ? 'bg-rock-orange text-white' : 'text-rock-muted hover:text-white'
                          )}
                        >
                          R
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 pb-8">
            <h3 className="text-lg font-display uppercase text-rock-muted border-b border-white/10 pb-2">Instruções Especiais</h3>
            <textarea
              className="w-full bg-rock-bg border border-white/10 rounded-xl p-4 text-sm text-rock-text placeholder:text-rock-muted focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none resize-none"
              rows={3}
              placeholder="Alergias ou pedidos especiais? Diz-nos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-white/10 bg-rock-surface/95 backdrop-blur-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-rock-muted font-bold uppercase tracking-wider">Total</span>
            <span className="text-2xl font-display text-rock-green">€{pricing.subtotal.toFixed(2)}</span>
          </div>
          <button onClick={handleAddToCart} className="btn-primary">
            {initialCartItem ? 'Atualizar Pedido' : 'Adicionar — Hell Yeah'}
          </button>
        </div>
      </div>
    </div>
  );
}
