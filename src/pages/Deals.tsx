import { Tag, Flame, Zap } from 'lucide-react';
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
      borderColor: 'border-rock-red/30',
      bgColor: 'bg-rock-red/5',
    },
    {
      id: 'deal-2',
      title: 'Dueto Acústico',
      description: '1 Pizza Média + 2 Bebidas',
      price: 15.99,
      originalPrice: 22.00,
      icon: Zap,
      color: 'text-rock-orange',
      borderColor: 'border-rock-orange/30',
      bgColor: 'bg-rock-orange/5',
    },
    {
      id: 'deal-3',
      title: 'Especial Headbanger',
      description: 'Qualquer Pizza Grande + Asas de Frango',
      price: 22.99,
      originalPrice: 30.00,
      icon: Tag,
      color: 'text-rock-green',
      borderColor: 'border-rock-green/30',
      bgColor: 'bg-rock-green/5',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-rock-text mb-6">
          Promoções
        </h1>
        <p className="text-xl text-rock-muted font-sans max-w-2xl mx-auto leading-relaxed">
          Preços que rebentam com a escala. Agarra estas ofertas antes que esgotem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {deals.map((deal) => {
          const Icon = deal.icon;
          return (
            <div key={deal.id} className={`card-rock p-8 border ${deal.borderColor} ${deal.bgColor} flex flex-col relative overflow-hidden group`}>
              <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Icon className={`w-32 h-32 ${deal.color}`} />
              </div>
              
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-8 h-8 ${deal.color}`} />
                  <h2 className="text-2xl font-display uppercase tracking-wider text-rock-text">
                    {deal.title}
                  </h2>
                </div>
                <p className="text-rock-muted font-sans text-lg mb-6">
                  {deal.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-end justify-between">
                <div>
                  <span className="text-sm text-rock-muted line-through block mb-1">€{deal.originalPrice.toFixed(2)}</span>
                  <span className={`text-3xl font-display ${deal.color}`}>€{deal.price.toFixed(2)}</span>
                </div>
                <Link to="/menu" className="btn-primary text-sm px-6 py-2">
                  Pedir
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
