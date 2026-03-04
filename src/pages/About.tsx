import { MapPin, Phone, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-rock-text mb-6">
          A Nossa História
        </h1>
        <p className="text-xl text-rock-muted font-sans max-w-2xl mx-auto leading-relaxed">
          Nascida no mosh pit, aperfeiçoada no forno. Acreditamos que a pizza deve ser barulhenta, confusa e inesquecível. Sem regras, apenas puro sabor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="card-rock p-8">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-rock-red" /> Localização
            </h2>
            <p className="text-rock-muted font-sans text-lg">
              Avenida da Distorção, 666<br />
              Bairro Underground,<br />
              Cidade do Barulho, 90210
            </p>
          </div>

          <div className="card-rock p-8">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-rock-orange" /> Contacto
            </h2>
            <p className="text-rock-muted font-sans text-lg mb-2">
              +351 912 345 678
            </p>
            <p className="text-rock-muted font-sans text-lg">
              hell@rockpizza.pt
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card-rock p-8">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-rock-green" /> Horário
            </h2>
            <ul className="space-y-4 text-rock-muted font-sans text-lg">
              <li className="flex justify-between">
                <span>Seg - Qua</span>
                <span>16:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Qui - Sáb</span>
                <span>16:00 - 03:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span>Recuperação (Fechado)</span>
              </li>
            </ul>
          </div>

          <div className="card-rock p-8">
            <h2 className="text-2xl font-display uppercase text-rock-text border-b border-white/10 pb-4 mb-6">
              Segue o Barulho
            </h2>
            <div className="flex gap-6">
              <a href="#" className="p-3 bg-rock-bg rounded-full text-rock-muted hover:text-rock-red hover:bg-white/5 transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-rock-bg rounded-full text-rock-muted hover:text-rock-orange hover:bg-white/5 transition-all">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-rock-bg rounded-full text-rock-muted hover:text-rock-green hover:bg-white/5 transition-all">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
