import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Heart, Clock, Globe, Menu, X, Search, Sparkles, Smartphone } from 'lucide-react';
import { useRadio } from '../contexts/RadioContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { filters, setFilters, applyFilters } = useRadio();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Header Principal unificado */}
      <header className="relative z-40 bg-[#0f172a] shadow-xl border-b border-white/5">
        <div className="hero-gradient">
          <div className="container mx-auto px-6 py-4"> {/* Padding ajustado para ficar mais compacto */}
            <div className="flex items-center justify-between">
              
              {/* --- ESQUERDA: Logo e Dizeres --- */}
              <Link to="/" className="flex items-center space-x-4 group min-w-fit mr-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-100 p-3 rounded-2xl shadow-xl">
                    <Radio className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-3xl font-black text-white tracking-tighter">Rádio</span>
                    <span className="text-3xl font-black text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ml-1 tracking-tighter">Jobs</span>
                  </div>
                  <div className="text-sm text-blue-200 font-medium tracking-wide">Sua música, seu mundo</div>
                </div>
              </Link>
              
              {/* --- CENTRO/DIREITA: Navegação Desktop e Botões (Movido para cima) --- */}
              <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
                
                {/* Links de Navegação */}
                <nav className="flex items-center bg-white/5 rounded-2xl px-2 p-1 border border-white/10 backdrop-blur-sm">
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
                </nav>

                {/* Separador Vertical Sutil */}
                <div className="h-8 w-px bg-white/10"></div>
                
                {/* Botões de Ação */}
                <div className="flex items-center space-x-3">
                  <a
                    href="https://apps.apple.com/us/app/triode-internet-radio/id1446513724" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all duration-300 text-sm"
                  >
                    <Smartphone size={16} />
                    <span>iPhone</span>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=fm.radio.sanity.radiofm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm"
                  >
                    <Sparkles size={16} />
                    <span>Android</span>
                  </a>
                  
                  <a
                    href="https://wa.me/5531982845056?text=Quero%20adicionar%20minha%20R%C3%A1dio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2 rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm whitespace-nowrap"
                  >
                    + Adicionar Rádio
                  </a>
                </div>
              </div>

              {/* --- MOBILE: Botão Menu (Hambúrguer) --- */}
              <button 
                className="lg:hidden bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 ml-4"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE: Menu Dropdown (Mantido igual) --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="m-4 p-6 bg-[#1e293b] rounded-3xl border border-white/10 animate-slide-up">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Navegação</h3>
              <button onClick={toggleMobileMenu} className="text-white p-2">
                <X size={28} />
              </button>
            </div>
            
            <nav className="space-y-3">
              {[
                { to: '/', label: 'Início', icon: Radio },
                { to: '/browse', label: 'Explorar', icon: Globe },
                { to: '/favorites', label: 'Favoritos', icon: Heart },
                { to: '/countries', label: 'Países', icon: Globe },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={22} />
                  <span className="font-semibold">{label}</span>
                </Link>
              ))}
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a href="#" className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white text-black font-bold">
                  <Smartphone size={20} />
                  <span>iPhone</span>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/10 text-white font-bold border border-white/10">
                  <Sparkles size={20} />
                  <span>Android</span>
                </a>
              </div>
              
              <a
                href="https://wa.me/5531982845056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-2xl bg-green-500 text-white font-bold w-full mt-4"
              >
                + Adicionar Rádio
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;