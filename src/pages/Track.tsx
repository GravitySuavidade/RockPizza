import React, { useState } from 'react';
import { Search, MapPin, Clock, Truck, CheckCircle2 } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wider text-rock-text mb-4">
          Seguir Pedido
        </h1>
        <p className="text-rock-muted font-sans text-lg">
          Onde está o barulho? Insere o número do teu pedido abaixo.
        </p>
      </div>

      {!isTracking ? (
        <form onSubmit={handleTrack} className="card-rock p-8 max-w-xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Número do Pedido</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rock-muted" />
                <input
                  type="text"
                  placeholder="ex. ROCK-1234"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-rock-bg border border-white/10 rounded-xl pl-12 pr-4 py-4 text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none font-mono text-lg uppercase"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-4 text-lg">
              Seguir
            </button>
          </div>
        </form>
      ) : (
        <div className="card-rock p-8 max-w-xl mx-auto animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl font-display uppercase text-rock-text">Pedido {orderId.toUpperCase()}</h2>
              <p className="text-rock-green font-sans font-bold mt-1">Chegada Estimada: 20:45</p>
            </div>
            <button onClick={() => setIsTracking(false)} className="text-sm text-rock-muted hover:text-rock-red font-sans underline">
              Seguir Outro
            </button>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rock-red before:via-rock-orange before:to-white/10">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-rock-surface bg-rock-red text-white shadow-[0_0_15px_rgba(255,42,42,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-rock p-4 bg-rock-red/5 border-rock-red/30">
                <h3 className="font-display uppercase text-rock-text text-lg">Pedido Confirmado</h3>
                <p className="text-rock-muted text-sm font-sans mt-1">20:15</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-rock-surface bg-rock-orange text-white shadow-[0_0_15px_rgba(255,106,0,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-rock p-4 bg-rock-orange/5 border-rock-orange/30">
                <h3 className="font-display uppercase text-rock-text text-lg">No Forno</h3>
                <p className="text-rock-muted text-sm font-sans mt-1">20:20 - A ficar crocante.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-rock-surface bg-rock-bg text-rock-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Truck className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-rock p-4 opacity-50">
                <h3 className="font-display uppercase text-rock-text text-lg">A Caminho</h3>
                <p className="text-rock-muted text-sm font-sans mt-1">Pendente</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-rock-surface bg-rock-bg text-rock-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-rock p-4 opacity-50">
                <h3 className="font-display uppercase text-rock-text text-lg">Entregue</h3>
                <p className="text-rock-muted text-sm font-sans mt-1">Pendente</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
