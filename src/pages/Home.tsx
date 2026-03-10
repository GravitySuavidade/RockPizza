import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, Flame, Zap, ArrowRight, Guitar } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import { ProductCard } from '../components/ProductCard';
import { motion, useScroll, useTransform } from 'motion/react';

const PROMOS = [
  {
    id: 1,
    badge: "TEMPO LIMITADO",
    title1: "Hellfire",
    title2: "Pepperoni",
    titleColor: "text-rock-red",
    desc: "Duplo pepperoni, jalapeños, fio de malagueta e o nosso molho de tomate picante. Não é para os fracos de coração.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop",
    badgeColor: "border-rock-red bg-rock-red/10 text-rock-red",
    borderColor: "border-rock-red",
    bgAccent: "bg-rock-red/5"
  },
  {
    id: 2,
    badge: "NOVO SABOR",
    title1: "Black Sabbath",
    title2: "BBQ",
    titleColor: "text-rock-orange",
    desc: "Frango fumado, cebola roxa, bacon e o nosso molho BBQ escuro. Uma verdadeira obra-prima do rock pesado.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    badgeColor: "border-rock-orange bg-rock-orange/10 text-rock-orange",
    borderColor: "border-rock-orange",
    bgAccent: "bg-rock-orange/5"
  },
  {
    id: 3,
    badge: "O CLÁSSICO",
    title1: "The Mosh",
    title2: "Pit",
    titleColor: "text-rock-green",
    desc: "Uma mistura caótica de salsicha, bacon, pepperoni, cogumelos e cebola. Prepara-te para a roda punk.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    badgeColor: "border-rock-green bg-rock-green/10 text-rock-green",
    borderColor: "border-rock-green",
    bgAccent: "bg-rock-green/5"
  }
];

export function Home({ onAddProduct }: { onAddProduct: (item: MenuItem) => void }) {
  const bestSellers = MENU_ITEMS.filter(item => item.tags.includes('popular')).slice(0, 3);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2000&auto=format&fit=crop"
            alt="Rock Concert Hero"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.15%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none" />
        </div>

        {/* Decorative Guitars */}
        <motion.div 
          initial={{ x: -100, opacity: 0, rotate: -45 }}
          animate={{ x: 0, opacity: 0.05, rotate: -12 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <Guitar className="w-64 h-64 text-rock-red" />
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0, rotate: 45 }}
          animate={{ x: 0, opacity: 0.05, rotate: 12 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <Guitar className="w-64 h-64 text-rock-green" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="border border-white/20 p-8 md:p-12 backdrop-blur-md bg-black/40 relative rounded-2xl shadow-2xl transition-transform duration-500"
          >
            <div className="absolute -top-6 -left-6 bg-rock-red p-3 rounded-full shadow-lg">
              <Guitar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-display uppercase tracking-tighter text-white leading-[0.85] mb-6 neon-glow mix-blend-screen">
              ROCK<br/><span className="text-rock-red text-outline-red">PIZZA</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono font-medium text-white uppercase tracking-widest bg-rock-red/90 inline-block px-6 py-2 rounded-sm backdrop-blur-sm">
              Fatias Quentes. Sabores Altos.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto"
          >
            <Link to="/menu" className="btn-primary text-xl px-10 py-5">
              COMEÇAR ENCOMENDA
            </Link>
            <Link to="/menu" className="btn-secondary text-xl px-10 py-5 bg-black/50 backdrop-blur-md">
              VER MENU
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights Row */}
      <section className="bg-rock-surface border-b border-white/10 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            <div className="flex flex-col items-center justify-center gap-4 p-8 group hover:bg-white/5 transition-colors">
              <Clock className="w-10 h-10 text-rock-orange group-hover:scale-110 transition-transform" />
              <span className="font-display uppercase tracking-widest text-white text-xl">Entrega 30-45 Min</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-8 group hover:bg-white/5 transition-colors">
              <Truck className="w-10 h-10 text-rock-green group-hover:scale-110 transition-transform" />
              <span className="font-display uppercase tracking-widest text-white text-xl">Entrega Grátis &gt; €25</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-8 group hover:bg-white/5 transition-colors">
              <Flame className="w-10 h-10 text-rock-red group-hover:scale-110 transition-transform" />
              <span className="font-display uppercase tracking-widest text-white text-xl">Fornos a Lenha</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner Horizontal Scroll Section */}
      <section ref={targetRef} className="relative h-[300vh] bg-[#0a0a0a]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Concert Crowd Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          </div>

          <motion.div style={{ x }} className="flex w-[300vw] relative h-full z-10">
            {PROMOS.map((promo) => (
              <div key={promo.id} className="w-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
                <div className="max-w-7xl w-full relative">
                  <div className="relative bg-black/80 backdrop-blur-sm border border-white/20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 rounded-2xl shadow-2xl overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-30 mix-blend-luminosity grayscale bg-cover bg-center" 
                      style={{ backgroundImage: `url('${promo.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                    
                    <div className="relative z-10 flex-1 text-center md:text-left">
                      <span className={`badge-new mb-6 inline-flex text-sm px-4 py-1 border font-display tracking-widest ${promo.badgeColor}`}>
                        {promo.badge}
                      </span>
                      <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-white mb-6 leading-none">
                        {promo.title1}<br/><span className={promo.titleColor}>{promo.title2}</span>
                      </h2>
                      <p className={`text-rock-muted font-mono text-lg max-w-xl leading-relaxed border-l-2 pl-6 ${promo.borderColor}`}>
                        {promo.desc}
                      </p>
                    </div>
                    <div className="relative z-10">
                      <Link to="/menu" className="btn-primary flex items-center gap-4 group">
                        <Zap className="w-6 h-6 group-hover:fill-current" /> PEDIR AGORA
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-rock-surface border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-white flex items-center gap-4">
                Mais Vendidos <Flame className="w-12 h-12 text-rock-red" />
              </h2>
              <p className="text-rock-muted font-mono text-lg mt-4 uppercase tracking-widest">Os favoritos da multidão. Garantidos para derreter caras.</p>
            </div>
            <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-rock-red font-display uppercase tracking-widest text-xl hover:text-white transition-colors group">
              Ver Todo o Menu <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((item) => (
              <ProductCard key={item.id} item={item} onAdd={onAddProduct} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/menu" className="btn-secondary w-full text-xl py-6">
              VER TODO O MENU
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
