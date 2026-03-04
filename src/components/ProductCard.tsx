import { MenuItem } from '../data/menu';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';

interface ProductCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function ProductCard({ item, onAdd }: ProductCardProps) {
  const minPrice = Math.min(...Object.values(item.basePrices).filter(p => p !== undefined) as number[]);

  return (
    <div className="card-rock flex flex-col overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rock-surface via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                tag === 'picante' && 'badge-spicy',
                tag === 'veg' && 'badge-veg',
                tag === 'novo' && 'badge-new',
                tag === 'popular' && 'badge-rock bg-white/20 text-white border border-white/30'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display uppercase tracking-wide text-rock-text group-hover:text-rock-red transition-colors">
            {item.name}
          </h3>
          <span className="font-sans font-bold text-rock-green whitespace-nowrap ml-4">
            desde €{minPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-rock-muted text-sm font-sans leading-relaxed mb-6 flex-grow">
          {item.description}
        </p>
        <button
          onClick={() => onAdd(item)}
          className="w-full btn-secondary flex items-center justify-center gap-2 group-hover:border-rock-red/50 group-hover:text-rock-red"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
}
