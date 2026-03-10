import React, { useState } from 'react';
import { Search, MapPin, Clock, Truck, CheckCircle2, Guitar } from 'lucide-react';
import { clsx } from 'clsx';

export function Track() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      setIsTracking(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[70vh] relative">
      <div className="absolute top-40 left-0 opacity-5 hidden lg:block transform -rotate-45">
        <Guitar className="w-96 h-96 text-rock-red" />
      </div>
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-white mb-6 neon-glow flex items-center justify-center gap-6">
          <Guitar className="w-10 h-10 md:w-14 md:h-14 text-rock-red transform -rotate-12" />
          Seguir Pedido
          <Guitar className="w-10 h-10 md:w-14 md:h-14 text-rock-red transform rotate-12" />
        </h1>
        <p className="text-rock-muted font-mono text-lg uppercase tracking-widest">
          Onde está o barulho? Insere o número do teu pedido abaixo.
        </p>
      </div>

      {!isTracking ? (
        <form onSubmit={handleTrack} className="card-rock p-8 max-w-xl mx-auto border border-white/20 rounded-2xl bg-black/80 backdrop-blur-md shadow-2xl relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase text-white tracking-widest font-display">Número do Pedido</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-rock-muted" />
                <input
                  type="text"
                  placeholder="EX. ROCK-1234"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="input-rock pl-14 text-xl"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-4 text-xl rounded-xl">
              SEGUIR
            </button>
          </div>
        </form>
      ) : (
        <div className="card-rock p-8 max-w-2xl mx-auto animate-in fade-in duration-500 border border-white/20 rounded-2xl bg-black/80 backdrop-blur-md shadow-2xl relative z-10">
          <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-display uppercase text-white tracking-tight">Pedido <span className="text-rock-red">{orderId.toUpperCase()}</span></h2>
              <p className="text-rock-green font-mono font-bold mt-2 text-lg">CHEGADA ESTIMADA: 20:45</p>
            </div>
            <button onClick={() => setIsTracking(false)} className="text-sm text-rock-muted hover:text-white font-mono uppercase tracking-widest border-b border-rock-muted hover:border-white pb-1 transition-colors">
              Seguir Outro
            </button>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-white/10 before:border-l before:border-dashed before:border-white/20">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-black bg-rock-red text-white shadow-[0_0_20px_rgba(255,42,42,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 rounded-full">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] card-rock p-6 bg-rock-red/5 border border-rock-red/30 rounded-xl hover:bg-rock-red/10 transition-colors">
                <h3 className="font-display uppercase text-white text-xl tracking-wide">Pedido Confirmado</h3>
                <p className="text-rock-muted text-sm font-mono mt-2">20:15</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-black bg-rock-orange text-white shadow-[0_0_20px_rgba(255,106,0,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] card-rock p-6 bg-rock-orange/5 border border-rock-orange/30 rounded-xl hover:bg-rock-orange/10 transition-colors">
                <h3 className="font-display uppercase text-white text-xl tracking-wide">No Forno</h3>
                <p className="text-rock-muted text-sm font-mono mt-2">20:20 - A ficar crocante.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-white/20 bg-black text-rock-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 rounded-full">
                <Truck className="w-6 h-6" />
              </div>
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] card-rock p-6 opacity-50 border border-white/10 rounded-xl bg-black">
                <h3 className="font-display uppercase text-white text-xl tracking-wide">A Caminho</h3>
                <p className="text-rock-muted text-sm font-mono mt-2">PENDENTE</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-white/20 bg-black text-rock-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] card-rock p-6 opacity-50 border border-white/10 rounded-xl bg-black">
                <h3 className="font-display uppercase text-white text-xl tracking-wide">Entregue</h3>
                <p className="text-rock-muted text-sm font-mono mt-2">PENDENTE</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
