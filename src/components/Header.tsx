import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Radio, Heart, Clock, Globe, Menu, X, Search, 
  Sparkles, Smartphone, ExternalLink, ChevronDown,
  Instagram, Facebook, Youtube, MessageCircle
} from 'lucide-react';
import { useRadio } from '../contexts/RadioContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { applyFilters } = useRadio();
  const location = useLocation();
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;

  // Definição de links externos para fácil manutenção
  const externalLinks = [
    { label: 'Notícias Music', url: 'https://g1.globo.com/musica/', icon: ExternalLink },
    { label: 'Top Paradas', url: 'https://www.billboard.com/charts/hot-100/', icon: Sparkles },
    { label: 'Podcast Parceiro', url: 'https://spotify.com', icon: Radio },
  ];

  return (
    <>
      <header className="relative z-40 bg-[#0f172a] shadow-xl border-b border-white/5">
        <div className="hero-gradient">
          <div className="container mx-auto px-4 lg:px-6 py-4">
            {/* Container relativo para permitir posicionamento absoluto do menu */}
            <div className="flex items-center justify-between relative">
              
              {/* --- ESQUERDA: Logo --- */}
              <Link to="/" className="flex items-center space-x-4 group min-w-fit">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-100 p-3 rounded-2xl shadow-xl">
                    <Radio className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-2xl font-black text-white tracking-tighter">Rádio</span>
                    <span className="text-2xl font-black text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ml-1 tracking-tighter">Jobs</span>
                  </div>
                  <div className="text-[10px] uppercase text-blue-300 font-bold tracking-[0.2em] leading-none mt-1">Sua música, seu mundo</div>
                </div>
              </Link>
              
              {/* --- CENTRO: Navegação Principal Desktop --- */}
              {/* ALTERAÇÃO REALIZADA AQUI:
                  Mudado de 'left-1/2' para 'left-[42%]'
                  Isso move o menu do centro exato (50%) um pouco para a esquerda.
                  Para mover MAIS para a esquerda, diminua o número (ex: 40%).
                  Para mover MENOS (mais para o centro), aumente o número (ex: 45%).
              */}
              <nav className="hidden xl:flex items-center bg-white/5 rounded-2xl px-2 p-1 border border-white/10 backdrop-blur-sm absolute left-[42%] -translate-x-1/2">
                {[
                  { to: '/', label: 'Início', icon: Radio },
                  { to: '/browse', label: 'Explorar', icon: Globe },
                  { to: '/favorites', label: 'Favoritos', icon: Heart },
                  { to: '/countries', label: 'Países', icon: Globe },
                ].map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                      isActive(to)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                ))}

                {/* Dropdown de Links Externos */}
                <div className="relative group">
                  <button 
                    onMouseEnter={() => setDropdownOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    <span>Mais</span>
                    <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div 
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2"
                    >
                      {externalLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <link.icon size={14} />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* --- DIREITA: Ações e Apps (Desktop) --- */}
              <div className="hidden lg:flex items-center space-x-3 ml-auto">
                <div className="flex items-center space-x-2 mr-4 text-gray-400">
                  <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="hover:text-red-500 transition-colors"><Youtube size={18} /></a>
                </div>

                <div className="h-8 w-px bg-white/10 mx-2"></div>
                
                <a
                  href="https://apps.apple.com/us/app/triode-internet-radio/id1446513724" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all text-xs"
                >
                  <Smartphone size={14} />
                  <span>iOS</span>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.paqapaqa.radiomobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all text-xs"
                >
                  <Sparkles size={14} />
                  <span>Android</span>
                </a>
                
                <a
                  href="https://wa.me/5531982845056?text=Quero%20adicionar%20minha%20R%C3%A1dio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-xs whitespace-nowrap flex items-center space-x-2"
                >
                  <MessageCircle size={14} />
                  <span>Anuncie sua Rádio</span>
                </a>
              </div>

              {/* --- MOBILE: Botão Menu --- */}
              <button 
                className="lg:hidden bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20 text-white ml-auto"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE: Menu Dropdown --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-lg overflow-y-auto">
          <div className="min-h-screen p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-xl font-bold text-white">Menu Principal</span>
              <button onClick={toggleMobileMenu} className="text-white bg-white/10 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <nav className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-gray-500 ml-4 mb-2 tracking-widest">Navegação</p>
              {[
                { to: '/', label: 'Início', icon: Radio },
                { to: '/browse', label: 'Explorar', icon: Globe },
                { to: '/favorites', label: 'Favoritos', icon: Heart },
                { to: '/countries', label: 'Países', icon: Globe },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-4 p-4 rounded-2xl ${isActive(to) ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-semibold">{label}</span>
                </Link>
              ))}
              
              <p className="text-[10px] uppercase font-bold text-gray-500 ml-4 mt-6 mb-2 tracking-widest">Links Externos</p>
              <div className="grid grid-cols-1 gap-2">
                {externalLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 text-gray-300 border border-white/5"
                  >
                    <link.icon size={20} className="text-blue-400" />
                    <span className="font-semibold">{link.label}</span>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                 <a
                  href="https://wa.me/5531982845056"
                  target="_blank"
                  className="flex items-center justify-center p-4 rounded-2xl bg-green-500 text-white font-bold w-full mb-4"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Cadastrar Rádio
                </a>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* --- ATUALIZADO: Link iOS Mobile --- */}
                  <a 
                    href="https://apps.apple.com/us/app/triode-internet-radio/id1446513724"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white text-black font-bold"
                  >
                    <Smartphone size={18} />
                    <span>App iOS</span>
                  </a>

                  {/* --- ATUALIZADO: Link Android Mobile --- */}
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.paqapaqa.radiomobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/10 text-white font-bold border border-white/10"
                  >
                    <Sparkles size={18} />
                    <span>Android</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;