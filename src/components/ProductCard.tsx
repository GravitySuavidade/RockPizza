import { MenuItem } from '../data/menu';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';
import React from 'react';

interface ProductCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onAdd }) => {
  const minPrice = Math.min(...Object.values(item.basePrices).filter(p => p !== undefined) as number[]);

  return (
    <div className="card-rock flex flex-col overflow-hidden group relative rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-[20%] group-hover:contrast-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        <div className="absolute top-0 left-0 p-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                tag === 'picante' && 'badge-spicy',
                tag === 'veg' && 'badge-veg',
                tag === 'novo' && 'badge-new',
                tag === 'popular' && 'badge-rock border-white text-white'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-rock-surface relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-display uppercase tracking-tight text-white group-hover:text-rock-red transition-colors leading-none">
            {item.name}
          </h3>
          <span className="font-mono font-bold text-rock-green whitespace-nowrap ml-4 text-lg">
            €{minPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-rock-muted text-sm font-sans leading-relaxed mb-6 flex-grow border-l border-white/10 pl-3">
          {item.description}
        </p>
        <button
          onClick={() => onAdd(item)}
          className="w-full btn-secondary flex items-center justify-center gap-2 group-hover:bg-rock-red group-hover:text-white group-hover:border-rock-red transition-all duration-200 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>ADICIONAR</span>
        </button>
      </div>
    </div>
  );
};
