import { useState, useMemo } from 'react';
import { Search, Filter, X, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

const CATEGORIES = ['Tudo', 'Pizzas', 'Bebidas', 'Sobremesas'];
const FILTERS = ['picante', 'veg', 'novo', 'popular'];

export function Menu({ onAddProduct }: { onAddProduct: (item: MenuItem) => void }) {
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'Tudo' && item.category !== activeCategory) return false;

      // Tags filter
      if (activeFilters.length > 0) {
        const hasAllFilters = activeFilters.every((f) => item.tags.includes(f as any));
        if (!hasAllFilters) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeCategory, activeFilters, searchQuery]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col flex-grow bg-rock-bg min-h-screen relative overflow-hidden">
      {/* Background atmospheric elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rock-red/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rock-orange/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Floating Header / Controls */}
      <div className="sticky top-24 z-40 px-4 sm:px-6 lg:px-8 pt-4 pb-8 pointer-events-none flex flex-col items-center">
        <div className="pointer-events-auto w-full max-w-5xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rock-muted" />
            <input
              type="text"
              placeholder="Procurar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-none text-white placeholder:text-rock-muted focus:ring-0 pl-12 py-3 rounded-2xl outline-none font-mono text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  'whitespace-nowrap font-display uppercase tracking-widest text-sm px-6 py-3 transition-all rounded-xl',
                  activeCategory === cat
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-transparent text-rock-muted hover:bg-white/10 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="pointer-events-auto mt-4 flex flex-wrap justify-center gap-2 max-w-3xl">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={clsx(
                'px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all font-mono rounded-full border backdrop-blur-md',
                activeFilters.includes(filter)
                  ? 'bg-rock-red text-white border-rock-red shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                  : 'bg-black/40 text-rock-muted border-white/10 hover:border-white/30 hover:text-white'
              )}
            >
              {filter}
            </button>
          ))}
          {activeFilters.length > 0 && (
             <button
              onClick={() => setActiveFilters([])}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-full transition-all flex items-center gap-1 backdrop-blur-md"
            >
              <X className="w-3 h-3" /> Limpar
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        {filteredItems.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-4xl font-display uppercase text-white mb-4">Nenhum item encontrado.</p>
            <p className="text-rock-muted font-mono text-lg">Tenta ajustar os teus filtros ou pesquisa.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-32 md:gap-48 py-12">
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={item.id} 
                  className={clsx(
                    "flex flex-col items-center gap-8 md:gap-16 relative group",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Massive Image */}
                  <div 
                    className="relative w-72 h-72 md:w-[500px] md:h-[500px] shrink-0 cursor-pointer" 
                    onClick={() => onAddProduct(item)}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-rock-red/20 rounded-full blur-[80px] group-hover:bg-rock-red/40 transition-colors duration-700 opacity-50 group-hover:opacity-100" />
                    
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="relative z-10 w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:rotate-12 transition-all duration-700 ease-out" 
                    />
                    
                    {/* Price Tag */}
                    <div className={clsx(
                      "absolute z-20 bg-white text-black font-display text-2xl md:text-4xl px-6 py-4 rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-110",
                      isEven ? "-bottom-4 -right-4 md:bottom-12 md:-right-8 rotate-12 group-hover:rotate-0" : "-bottom-4 -left-4 md:bottom-12 md:-left-8 -rotate-12 group-hover:rotate-0"
                    )}>
                      €{item.basePrices.M?.toFixed(2) || item.basePrices.L?.toFixed(2) || item.basePrices.S?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={clsx(
                    "flex-1 flex flex-col z-10 w-full",
                    isEven ? "items-center md:items-start text-center md:text-left" : "items-center md:items-end text-center md:text-right"
                  )}>
                    <div className={clsx(
                      "flex flex-wrap gap-2 mb-6",
                      isEven ? "justify-center md:justify-start" : "justify-center md:justify-end"
                    )}>
                      {item.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest border border-white/20 text-white rounded-full backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 
                      className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter text-white mb-6 group-hover:text-rock-red transition-colors cursor-pointer leading-[0.85]"
                      onClick={() => onAddProduct(item)}
                    >
                      {item.name}
                    </h3>
                    
                    <p className="text-rock-muted font-mono text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <button 
                      onClick={() => onAddProduct(item)}
                      className="group/btn relative overflow-hidden rounded-full bg-white/5 border border-white/20 px-8 py-4 flex items-center gap-4 hover:border-rock-red transition-colors"
                    >
                      <div className="absolute inset-0 bg-rock-red translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 font-display uppercase tracking-widest text-lg text-white">Adicionar ao Pedido</span>
                      <ShoppingBag className="relative z-10 w-5 h-5 text-white" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
