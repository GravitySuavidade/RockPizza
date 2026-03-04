import { Link } from 'react-router-dom';
import { Clock, Truck, Flame, Zap } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import { ProductCard } from '../components/ProductCard';

export function Home({ onAddProduct }: { onAddProduct: (item: MenuItem) => void }) {
  const bestSellers = MENU_ITEMS.filter(item => item.tags.includes('popular')).slice(0, 3);

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop"
            alt="Rock Pizza Hero"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-150 grayscale-[30%] mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rock-bg via-rock-bg/90 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0F_100%)] opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.15%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-display uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-rock-muted to-rock-surface drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-2 transform -skew-x-6 leading-none">
            Rock Pizza
          </h1>
          <p className="text-2xl md:text-4xl font-sans font-black text-rock-red uppercase tracking-[0.3em] mb-12 drop-shadow-[0_0_15px_rgba(255,42,42,0.9)]">
            Fatias Quentes. Sabores Altos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link to="/menu" className="btn-primary text-xl px-10 py-5 shadow-[0_0_40px_rgba(255,42,42,0.5)] border border-rock-red/50 hover:scale-105">
              Começar Encomenda
            </Link>
            <Link to="/menu" className="btn-secondary text-xl px-10 py-5 bg-black/60 backdrop-blur-md border-white/20 hover:border-white/50 hover:bg-white/10">
              Ver Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Row */}
      <section className="bg-rock-surface border-y border-white/10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rock-red/5 via-transparent to-rock-red/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            <div className="flex flex-col items-center justify-center gap-3 pt-6 md:pt-0 group">
              <Clock className="w-10 h-10 text-rock-orange group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]" />
              <span className="font-display uppercase tracking-widest text-rock-text text-lg">Entrega 30-45 Min</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-6 md:pt-0 group">
              <Truck className="w-10 h-10 text-rock-green group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(166,255,0,0.5)]" />
              <span className="font-display uppercase tracking-widest text-rock-text text-lg">Entrega Grátis &gt; €25</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-6 md:pt-0 group">
              <Flame className="w-10 h-10 text-rock-red group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,42,42,0.5)]" />
              <span className="font-display uppercase tracking-widest text-rock-text text-lg">Fornos a Lenha</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-rock-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rock-surface to-rock-bg border-2 border-rock-red/40 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 group shadow-[0_0_50px_rgba(255,42,42,0.15)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop')] opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-rock-red/20 to-transparent mix-blend-overlay" />
            
            <div className="relative z-10 flex-1 text-center md:text-left">
              <span className="badge-new mb-6 inline-flex text-sm px-4 py-1 border-rock-red bg-rock-red/20 shadow-[0_0_15px_rgba(255,42,42,0.5)]">Tempo Limitado</span>
              <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-white mb-6 drop-shadow-lg">
                Hellfire Pepperoni
              </h2>
              <p className="text-rock-muted font-sans text-xl max-w-2xl leading-relaxed">
                Duplo pepperoni, jalapeños, fio de malagueta e o nosso molho de tomate picante. Não é para os fracos de coração.
              </p>
            </div>
            <div className="relative z-10">
              <Link to="/menu" className="btn-primary bg-rock-red text-xl px-8 py-4 shadow-[0_0_30px_rgba(255,42,42,0.6)] flex items-center gap-3 group-hover:scale-105">
                <Zap className="w-6 h-6" /> Pedir Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-rock-surface/80 border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-rock-red/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-rock-text flex items-center gap-4">
                Mais Vendidos <Flame className="w-10 h-10 text-rock-red drop-shadow-[0_0_15px_rgba(255,42,42,0.6)]" />
              </h2>
              <p className="text-rock-muted font-sans text-lg mt-3">Os favoritos da multidão. Garantidos para derreter caras.</p>
            </div>
            <Link to="/menu" className="hidden sm:inline-flex text-rock-red font-display uppercase tracking-widest text-lg hover:text-white transition-colors hover:drop-shadow-[0_0_10px_rgba(255,42,42,0.8)] border-b border-rock-red/30 hover:border-white pb-1">
              Ver Todo o Menu →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((item) => (
              <ProductCard key={item.id} item={item} onAdd={onAddProduct} />
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/menu" className="btn-secondary w-full text-lg py-4">
              Ver Todo o Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
