import React from 'react';
import { Heart, Play, Pause, MapPin } from 'lucide-react';
import { RadioStation } from '../types/station';
import { useRadio } from '../contexts/RadioContext';

interface StationCardProps {
  station: RadioStation;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  const { 
    currentStation, 
    setCurrentStation, 
    isPlaying, 
    togglePlay,
    toggleFavorite,
    isFavorite
  } = useRadio();
  
  const isCurrentStation = currentStation?.stationuuid === station.stationuuid;
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentStation) {
      togglePlay();
    } else {
      setCurrentStation(station);
    }
  };
  
  const getStationImage = () => {
    if (station.favicon && station.favicon !== '') {
      return (
        <img 
          src={station.favicon} 
          alt={station.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/300/3b82f6/ffffff?text=${station.name.charAt(0)}`;
          }}
        />
      );
    }
    
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {station.name.charAt(0)}
      </div>
    );
  };
  
  return (
    <div 
      className={`
        station-card group relative flex flex-col w-full overflow-hidden rounded-lg transition-all duration-300
        ${isCurrentStation ? 'ring-2 ring-blue-500 shadow-md' : 'bg-white shadow-sm hover:shadow-md'}
      `}
      title={station.name} // Mostra o nome completo ao passar o mouse
    >
      {/* --- Área da Imagem (Sempre Quadrada) --- */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {getStationImage()}
        
        {/* Overlay Escuro (Aparece no hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Botão Favorito (Canto superior direito) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(station);
          }}
          className="absolute top-1 right-1 z-10 p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <Heart 
            size={12} 
            className={`${isFavorite(station.stationuuid) ? 'fill-red-500 text-red-500' : 'text-white drop-shadow-md'}`} 
          />
        </button>

        {/* Botão Play (Centro - condicional) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
           isCurrentStation ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <button 
            onClick={handlePlay}
            className={`
              p-1.5 rounded-full shadow-lg transform hover:scale-110 flex items-center justify-center
              ${isCurrentStation && isPlaying 
                ? 'bg-white text-red-500' 
                : 'bg-white text-blue-600'
              }
            `}
          >
            {isCurrentStation && isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        </div>

        {/* Equalizador Animado (Canto inferior - apenas se tocando) */}
        {isCurrentStation && isPlaying && (
          <div className="absolute bottom-1 right-1 flex gap-0.5 items-end h-2">
            <div className="w-0.5 bg-white animate-[bounce_1s_infinite] h-full"></div>
            <div className="w-0.5 bg-white animate-[bounce_1.2s_infinite] h-1.5"></div>
            <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite] h-2"></div>
          </div>
        )}
      </div>
      
      {/* --- Área de Texto (Ultra Compacta) --- */}
      <div className="p-1.5 bg-white text-center">
        <h3 className="font-bold text-gray-900 truncate text-[10px] sm:text-xs leading-tight">
          {station.name}
        </h3>
        
        <div className="flex items-center justify-center gap-0.5 text-[9px] text-gray-400 mt-0.5">
          <MapPin size={8} className="shrink-0" />
          <span className="truncate max-w-[80%]">{station.country}</span>
        </div>
      </div>
    </div>
  );
};

export default StationCard;