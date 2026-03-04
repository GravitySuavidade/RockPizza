import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, MapPin, CreditCard, Clock } from 'lucide-react';
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
        <span className="text-6xl mb-6">🛒</span>
        <h2 className="text-3xl font-display uppercase tracking-wider text-rock-text mb-4">O teu carrinho está vazio</h2>
        <p className="text-rock-muted font-sans mb-8">Precisas de combustível antes de finalizar.</p>
        <Link to="/menu" className="btn-primary">Voltar ao Menu</Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-rock-green/20 rounded-full flex items-center justify-center mb-8 border border-rock-green/30 shadow-[0_0_30px_rgba(166,255,0,0.2)]">
          <CheckCircle2 className="w-12 h-12 text-rock-green" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-rock-text mb-4">
          Pedido Confirmado — Hell Yeah!
        </h1>
        <p className="text-xl text-rock-muted font-sans mb-2">Pedido #ROCK-{Math.floor(Math.random() * 10000)}</p>
        <p className="text-rock-muted font-sans mb-12">Tempo estimado: 25-35 mins. Estamos a aquecer os fornos.</p>
        
        <div className="card-rock p-6 max-w-md w-full text-left mb-8">
          <h3 className="font-display uppercase text-rock-text border-b border-white/10 pb-2 mb-4">Resumo do Pedido</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm font-sans text-rock-muted">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans text-rock-muted">
              <span>Entrega</span>
              <span>€{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-display text-rock-green pt-2 border-t border-white/10">
              <span>Total Pago</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link to="/" className="btn-secondary">Voltar ao Início</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-4xl font-display uppercase tracking-wider text-rock-text mb-8">Finalizar Pedido</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-rock-red transition-all duration-500 -z-10" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        
        {[
          { num: 1, label: 'Detalhes', icon: MapPin },
          { num: 2, label: 'Pagamento', icon: CreditCard },
          { num: 3, label: 'Confirmar', icon: CheckCircle2 }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-rock-bg px-2">
            <div className={clsx(
              'w-10 h-10 rounded-full flex items-center justify-center font-display text-lg transition-colors border-2',
              step >= s.num ? 'bg-rock-red border-rock-red text-white shadow-[0_0_15px_rgba(255,42,42,0.4)]' : 'bg-rock-surface border-white/20 text-rock-muted'
            )}>
              {s.num}
            </div>
            <span className={clsx('text-xs font-bold uppercase tracking-wider', step >= s.num ? 'text-rock-text' : 'text-rock-muted')}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card-rock p-6 md:p-8 mb-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-2">Detalhes de Entrega</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Nome Completo</label>
                <input type="text" placeholder="João Silva" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Telemóvel</label>
                <input type="tel" placeholder="+351 912 345 678" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Morada de Entrega</label>
                <input type="text" placeholder="Rua do Rock, 123, 4º Esq" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                Continuar para Pagamento <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-2">Método de Pagamento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="card-rock p-4 border-rock-red/50 bg-rock-red/10 flex flex-col items-center justify-center gap-2 h-32">
                <CreditCard className="w-8 h-8 text-rock-red" />
                <span className="font-display uppercase tracking-wider text-rock-text">Cartão de Crédito</span>
              </button>
              <button className="card-rock p-4 border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-2 h-32 opacity-50 cursor-not-allowed">
                <span className="text-2xl font-bold">MB</span>
                <span className="font-display uppercase tracking-wider text-rock-text">MB Way</span>
              </button>
              <button className="card-rock p-4 border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-2 h-32 opacity-50 cursor-not-allowed">
                <span className="text-2xl font-bold">💵</span>
                <span className="font-display uppercase tracking-wider text-rock-text">Dinheiro</span>
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">Validade</label>
                  <input type="text" placeholder="MM/AA" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-rock-muted tracking-wider">CVC</label>
                  <input type="text" placeholder="123" className="w-full bg-rock-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-rock-text focus:border-rock-red focus:ring-1 focus:ring-rock-red outline-none font-mono" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary">Voltar</button>
              <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">
                Rever Pedido <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-2">Confirmar Pedido</h2>
            
            <div className="bg-rock-bg rounded-xl p-4 border border-white/5 space-y-4">
              <div className="flex justify-between text-sm font-sans text-rock-text">
                <span className="text-rock-muted">Itens ({items.length})</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-sans text-rock-text">
                <span className="text-rock-muted">Taxa de Entrega</span>
                <span>€{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-display text-rock-green pt-4 border-t border-white/10">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary" disabled={isProcessing}>Voltar</button>
              <button 
                onClick={handleConfirmOrder} 
                className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="animate-pulse">A Processar...</span>
                ) : (
                  <>Fazer Pedido — €{total.toFixed(2)}</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
