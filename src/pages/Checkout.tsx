import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, MapPin, CreditCard, Clock, Guitar } from 'lucide-react';
import { clsx } from 'clsx';

export function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = getTotal();
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <span className="text-8xl mb-6 animate-pulse">🛒</span>
        <h2 className="text-4xl font-display uppercase tracking-tighter text-white mb-4">O teu carrinho está vazio</h2>
        <p className="text-rock-muted font-mono mb-8 text-lg uppercase">Precisas de combustível antes de finalizar.</p>
        <Link to="/menu" className="btn-primary text-xl px-8 py-4 rounded-xl">VOLTAR AO MENU</Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh] animate-in fade-in duration-500 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
          <Guitar className="w-[600px] h-[600px] text-rock-green transform rotate-45" />
        </div>
        <div className="w-32 h-32 bg-rock-green/10 flex items-center justify-center mb-8 border border-rock-green/50 rounded-full shadow-[0_0_30px_rgba(166,255,0,0.2)] relative z-10">
          <CheckCircle2 className="w-16 h-16 text-rock-green" />
        </div>
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-white mb-4 glitch-hover relative z-10">
          Pedido Confirmado — Hell Yeah!
        </h1>
        <p className="text-2xl text-rock-muted font-mono mb-2 uppercase relative z-10">Pedido #ROCK-{Math.floor(Math.random() * 10000)}</p>
        <p className="text-rock-muted font-mono mb-12 uppercase tracking-wider relative z-10">Tempo estimado: 25-35 mins. Estamos a aquecer os fornos.</p>
        
        <div className="card-rock p-8 max-w-md w-full text-left mb-8 border border-white/20 rounded-2xl bg-black/80 backdrop-blur-md relative z-10 shadow-2xl">
          <h3 className="font-display uppercase text-white border-b border-white/10 pb-4 mb-6 text-2xl tracking-wide">Resumo do Pedido</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-lg font-mono text-rock-muted uppercase">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-mono text-rock-muted uppercase">
              <span>Entrega</span>
              <span>€{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl font-display text-rock-green pt-4 border-t border-white/10">
              <span>Total Pago</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link to="/" className="btn-secondary text-xl px-8 py-4 rounded-xl">VOLTAR AO INÍCIO</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-white mb-12 text-center md:text-left">Finalizar Pedido</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-16 relative px-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rock-red transition-all duration-500 -z-10 rounded-full" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        
        {[
          { num: 1, label: 'Detalhes', icon: MapPin },
          { num: 2, label: 'Pagamento', icon: CreditCard },
          { num: 3, label: 'Confirmar', icon: CheckCircle2 }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-4 bg-black px-4">
            <div className={clsx(
              'w-16 h-16 flex items-center justify-center font-display text-2xl transition-all border-2 rounded-full',
              step >= s.num ? 'bg-rock-red border-rock-red text-white shadow-[0_0_20px_rgba(255,42,42,0.4)]' : 'bg-black border-white/20 text-rock-muted'
            )}>
              <span>{s.num}</span>
            </div>
            <span className={clsx('text-sm font-bold uppercase tracking-widest mt-2', step >= s.num ? 'text-white' : 'text-rock-muted')}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card-rock p-8 md:p-10 mb-8 border border-white/20 rounded-3xl bg-black/80 backdrop-blur-md shadow-2xl">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 pb-4 tracking-wide">Detalhes de Entrega</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">Nome Completo</label>
                <input type="text" placeholder="JOÃO SILVA" className="input-rock w-full uppercase" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">Telemóvel</label>
                <input type="tel" placeholder="+351 912 345 678" className="input-rock w-full uppercase" />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">Morada de Entrega</label>
                <input type="text" placeholder="RUA DO ROCK, 123, 4º ESQ" className="input-rock w-full uppercase" />
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-3 text-lg px-8 py-4 rounded-xl">
                CONTINUAR PARA PAGAMENTO <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 pb-4 tracking-wide">Método de Pagamento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="card-rock p-6 border-2 border-rock-red bg-rock-red/10 flex flex-col items-center justify-center gap-4 h-40 shadow-[0_0_20px_rgba(255,42,42,0.2)] rounded-xl">
                <CreditCard className="w-10 h-10 text-rock-red" />
                <span className="font-display uppercase tracking-wider text-white text-xl">Cartão de Crédito</span>
              </button>
              <button className="card-rock p-6 border border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-4 h-40 opacity-50 cursor-not-allowed bg-white/5 rounded-xl">
                <span className="text-3xl font-bold">MB</span>
                <span className="font-display uppercase tracking-wider text-rock-muted text-xl">MB Way</span>
              </button>
              <button className="card-rock p-6 border border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-4 h-40 opacity-50 cursor-not-allowed bg-white/5 rounded-xl">
                <span className="text-3xl font-bold">💵</span>
                <span className="font-display uppercase tracking-wider text-rock-muted text-xl">Dinheiro</span>
              </button>
            </div>

            <div className="space-y-6 mt-8 p-6 border border-white/10 bg-white/5 rounded-xl">
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="input-rock w-full font-mono text-lg tracking-widest" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">Validade</label>
                  <input type="text" placeholder="MM/AA" className="input-rock w-full font-mono text-lg text-center" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase text-rock-muted tracking-widest">CVC</label>
                  <input type="text" placeholder="123" className="input-rock w-full font-mono text-lg text-center" />
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary text-lg px-8 py-4 rounded-xl">VOLTAR</button>
              <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-3 text-lg px-8 py-4 rounded-xl">
                REVER PEDIDO <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 pb-4 tracking-wide">Confirmar Pedido</h2>
            
            <div className="bg-white/5 p-6 border border-white/10 rounded-xl space-y-6">
              <div className="flex justify-between text-lg font-mono text-white uppercase">
                <span className="text-rock-muted">Itens ({items.length})</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-mono text-white uppercase">
                <span className="text-rock-muted">Taxa de Entrega</span>
                <span>€{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-4xl font-display text-rock-green pt-6 border-t border-white/10">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary text-lg px-8 py-4 rounded-xl" disabled={isProcessing}>VOLTAR</button>
              <button 
                onClick={handleConfirmOrder} 
                className="btn-primary flex items-center gap-3 min-w-[240px] justify-center text-xl px-8 py-4 rounded-xl"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="animate-pulse">A PROCESSAR...</span>
                ) : (
                  <>FAZER PEDIDO — €{total.toFixed(2)}</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
