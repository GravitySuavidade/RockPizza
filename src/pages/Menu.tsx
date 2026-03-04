import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import { ProductCard } from '../components/ProductCard';
import { clsx } from 'clsx';

const CATEGORIES = ['Tudo', 'Pizzas', 'Massas', 'Lasanhas', 'Bebidas', 'Sobremesas'];
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
    <div className="flex flex-col flex-grow bg-rock-bg min-h-screen">
      {/* Header / Search */}
      <div className="bg-rock-surface border-b border-white/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-rock-text">
              O Menu
            </h1>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rock-muted" />
              <input
                type="text"
                placeholder="Procura por uma fatia do paraíso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-rock-bg border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-rock-text placeholder:text-rock-muted focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-white/5 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  'whitespace-nowrap font-display uppercase tracking-wider text-sm transition-colors pb-1 border-b-2',
                  activeCategory === cat
                    ? 'text-rock-red border-rock-red'
                    : 'text-rock-muted border-transparent hover:text-rock-text hover:border-white/20'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-rock-muted font-sans text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros:
          </span>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all',
                activeFilters.includes(filter)
                  ? 'bg-rock-red text-white border-rock-red shadow-[0_0_10px_rgba(255,42,42,0.3)]'
                  : 'bg-rock-surface text-rock-muted border-white/10 hover:border-white/30 hover:text-rock-text'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-display uppercase text-rock-muted">Nenhum item encontrado.</p>
            <p className="text-rock-muted/70 font-sans mt-2">Tenta ajustar os teus filtros ou pesquisa.</p>
            <button
              onClick={() => {
                setActiveCategory('Tudo');
                setActiveFilters([]);
                setSearchQuery('');
              }}
              className="mt-6 btn-secondary"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} onAdd={onAddProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
