import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-20 fade-in duration-300">
      <div className="bg-black/95 backdrop-blur-md border border-rock-green/50 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 min-w-[300px]">
        <div className="bg-rock-green/20 text-rock-green rounded-full p-1">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <span className="font-display uppercase text-lg text-white tracking-wider flex-1">{message}</span>
        <button onClick={onClose} className="text-rock-muted hover:text-white transition-colors rounded-full hover:bg-white/10 p-1">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
