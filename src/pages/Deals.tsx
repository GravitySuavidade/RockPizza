import { Tag, Flame, Zap, Guitar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Deals() {
  const deals = [
    {
      id: 'deal-1',
      title: 'Combo Mosh Pit',
      description: '2 Pizzas Grandes + 1 Bebida Grande + 1 Sobremesa',
      price: 29.99,
      originalPrice: 45.00,
      icon: Flame,
      color: 'text-rock-red',
      borderColor: 'border-rock-red/50',
      bgColor: 'bg-rock-red/5',
      shadow: 'shadow-[0_8px_30px_-10px_rgba(255,42,42,0.3)]',
    },
    {
      id: 'deal-2',
      title: 'Dueto Acústico',
      description: '1 Pizza Média + 2 Bebidas',
      price: 15.99,
      originalPrice: 22.00,
      icon: Zap,
      color: 'text-rock-orange',
      borderColor: 'border-rock-orange/50',
      bgColor: 'bg-rock-orange/5',
      shadow: 'shadow-[0_8px_30px_-10px_rgba(255,106,0,0.3)]',
    },
    {
      id: 'deal-3',
      title: 'Especial Headbanger',
      description: 'Qualquer Pizza Grande + Asas de Frango',
      price: 22.99,
      originalPrice: 30.00,
      icon: Tag,
      color: 'text-rock-green',
      borderColor: 'border-rock-green/50',
      bgColor: 'bg-rock-green/5',
      shadow: 'shadow-[0_8px_30px_-10px_rgba(166,255,0,0.3)]',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative">
      <div className="absolute top-20 right-10 opacity-5 hidden lg:block transform rotate-45">
        <Guitar className="w-96 h-96 text-rock-red" />
      </div>
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-white mb-6 neon-glow flex items-center justify-center gap-6">
          <Guitar className="w-12 h-12 md:w-16 md:h-16 text-rock-red transform -rotate-12" />
          Promoções
          <Guitar className="w-12 h-12 md:w-16 md:h-16 text-rock-red transform rotate-12" />
        </h1>
        <p className="text-xl text-rock-muted font-mono max-w-2xl mx-auto leading-relaxed border-b border-rock-red/50 inline-block pb-2">
          Preços que rebentam com a escala. Agarra estas ofertas antes que esgotem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {deals.map((deal) => {
          const Icon = deal.icon;
          return (
            <div key={deal.id} className={`card-rock p-8 border ${deal.borderColor} ${deal.bgColor} flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:${deal.shadow} transition-all duration-300 rounded-2xl`}>
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform rotate-12">
                <Icon className={`w-48 h-48 ${deal.color}`} />
              </div>
              
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 border ${deal.borderColor} bg-black rounded-xl`}>
                    <Icon className={`w-8 h-8 ${deal.color}`} />
                  </div>
                  <h2 className="text-3xl font-display uppercase tracking-tight text-white leading-none">
                    {deal.title}
                  </h2>
                </div>
                <p className="text-rock-muted font-mono text-sm mb-8 border-l border-white/20 pl-4">
                  {deal.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-dashed border-white/10 flex items-end justify-between">
                <div>
                  <span className="text-sm text-rock-muted line-through block mb-1 font-mono">€{deal.originalPrice.toFixed(2)}</span>
                  <span className={`text-4xl font-display ${deal.color}`}>€{deal.price.toFixed(2)}</span>
                </div>
                <Link to="/menu" className="btn-secondary text-sm px-6 py-3 bg-black hover:bg-white hover:text-black border border-white/30 rounded-lg">
                  PEDIR
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
