import { MapPin, Phone, Clock, Instagram, Twitter, Facebook, Guitar } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <Guitar className="w-[800px] h-[800px] text-rock-red" />
      </div>
      <div className="text-center mb-20 relative z-10">
        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-white mb-8 neon-glow flex items-center justify-center gap-6">
          <Guitar className="w-12 h-12 md:w-16 md:h-16 text-rock-red transform -rotate-12" />
          A Nossa História
          <Guitar className="w-12 h-12 md:w-16 md:h-16 text-rock-red transform rotate-12" />
        </h1>
        <div className="relative inline-block w-full max-w-3xl mx-auto">
          <p className="text-xl text-white font-mono bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-8 leading-relaxed uppercase tracking-wide shadow-2xl">
            Nascida no mosh pit, aperfeiçoada no forno. Acreditamos que a pizza deve ser barulhenta, confusa e inesquecível. Sem regras, apenas puro sabor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-8">
          <div className="card-rock p-8 border border-white/20 rounded-2xl hover:border-rock-red/50 transition-colors group">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 group-hover:border-rock-red/50 pb-4 mb-6 flex items-center gap-4 transition-colors">
              <MapPin className="w-8 h-8 text-rock-red" /> Localização
            </h2>
            <p className="text-rock-muted font-mono text-lg uppercase tracking-widest">
              Avenida da Distorção, 666<br />
              Bairro Underground,<br />
              Cidade do Barulho, 90210
            </p>
          </div>

          <div className="card-rock p-8 border border-white/20 rounded-2xl hover:border-rock-orange/50 transition-colors group">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 group-hover:border-rock-orange/50 pb-4 mb-6 flex items-center gap-4 transition-colors">
              <Phone className="w-8 h-8 text-rock-orange" /> Contacto
            </h2>
            <p className="text-rock-muted font-mono text-lg mb-2">
              +351 912 345 678
            </p>
            <p className="text-rock-muted font-mono text-lg">
              HELL@ROCKPIZZA.PT
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card-rock p-8 border border-white/20 rounded-2xl hover:border-rock-green/50 transition-colors group">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 group-hover:border-rock-green/50 pb-4 mb-6 flex items-center gap-4 transition-colors">
              <Clock className="w-8 h-8 text-rock-green" /> Horário
            </h2>
            <ul className="space-y-4 text-rock-muted font-mono text-lg uppercase tracking-wider">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Seg - Qua</span>
                <span className="text-white">16:00 - 00:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Qui - Sáb</span>
                <span className="text-white">16:00 - 03:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="text-rock-red">Recuperação (Fechado)</span>
              </li>
            </ul>
          </div>

          <div className="card-rock p-8 border border-white/20 rounded-2xl hover:border-white/50 transition-colors">
            <h2 className="text-3xl font-display uppercase text-white border-b border-white/10 pb-4 mb-6">
              Segue o Barulho
            </h2>
            <div className="flex gap-6">
              <a href="#" className="p-4 bg-black border border-white/20 rounded-xl text-white hover:bg-rock-red hover:border-rock-red transition-all transform hover:-translate-y-1">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-black border border-white/20 rounded-xl text-white hover:bg-rock-orange hover:border-rock-orange transition-all transform hover:-translate-y-1">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-black border border-white/20 rounded-xl text-white hover:bg-rock-green hover:border-rock-green transition-all transform hover:-translate-y-1">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
