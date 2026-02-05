import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Heart, SkipBack, 
  Music2, Radio, Check, Link as LinkIcon 
} from 'lucide-react';
import { useRadio } from '../contexts/RadioContext';
import CommercialPlayer from './CommercialPlayer';

// Componente de Ícone Social
const SocialIcon = ({ type }: { type: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' }) => {
  const commonClass = "transition-transform group-hover:scale-110 group-active:scale-95";
  
  if (type === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className={`text-green-400 ${commonClass}`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className={`text-blue-500 ${commonClass}`}>
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.428l-.581 3.667h-2.847v7.98c3.072-.789 5.245-3.57 5.245-6.837 0-3.923-3.179-7.102-7.102-7.102-3.923 0-7.102 3.179-7.102 7.102 0 3.267 2.173 6.048 5.245 6.837z"/>
      </svg>
    );
  }
  if (type === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={`text-white ${commonClass}`}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className={`text-blue-400 ${commonClass}`}>
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
      </svg>
    );
  }
  return null;
};

const Player: React.FC = () => {
  const {
    currentStation,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    toggleFavorite,
    isFavorite,
    recentlyPlayed,
    setCurrentStation
  } = useRadio();

  // URL da imagem que aparecerá no compartilhamento
  const SITE_THUMBNAIL = "https://static-kbo-site.knbcdn.com.br/kboingfm/img-radios/radios-online.jpg"; // Substitua pelo link real da sua imagem
  const SITE_URL = "https://radiojobs.com.br";

  const commercialUrls = [
    'https://projetoradios.vercel.app/claroprezao.mp3',
    'https://projetoradios.vercel.app/mercadolivre19reais.mp3',
    'https://projetoradios.vercel.app/caixa.mp3',
    'https://projetoradios.vercel.app/timblack.mp3',
    'https://projetoradios.vercel.app/mercadolivre.mp3',
    'https://projetoradios.vercel.app/vacina.mp3',
    'https://projetoradios.vercel.app/trivago.mp3',
    'https://projetoradios.vercel.app/pagbank.mp3',
    'https://projetoradios.vercel.app/bradesco.mp3',
    'https://projetoradios.vercel.app/claro.mp3',
    'https://projetoradios.vercel.app/sky.mp3',
    'https://projetoradios.vercel.app/itau.mp3',
    'https://projetoradios.vercel.app/google.mp3',
    'https://projetoradios.vercel.app/google2.mp3',
    'https://projetoradios.vercel.app/google3.mp3'
  ];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isPlayingCommercial, setIsPlayingCommercial] = useState(false);
  const [pendingStation, setPendingStation] = useState<any>(null);
  const [userRequestedPlay, setUserRequestedPlay] = useState(false);
  const [currentTrackTitle, setCurrentTrackTitle] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  const [commercialTimeLeft, setCommercialTimeLeft] = useState(0);
  const [canSkipCommercial, setCanSkipCommercial] = useState(false);
  const [currentCommercial, setCurrentCommercial] = useState<{
    title: string;
    advertiser: string;
    image: string;
  } | null>(null);
  const [commercialProgress, setCommercialProgress] = useState(0);
  const [commercialDuration, setCommercialDuration] = useState(0);

  const marqueeStyle = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 15s linear infinite;
    }
    .text-scroll-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
  `;

  const commercialData: { [key: string]: { title: string; advertiser: string; image: string } } = {
    'https://www.radiojobs.com.br/claroprezao.mp3': { title: 'Claro Prezão', advertiser: 'Claro', image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
  };

  const getRandomCommercial = (): string => commercialUrls[Math.floor(Math.random() * commercialUrls.length)];

  const getCommercialInfo = (url: string) => {
    const fileName = url.split('/').pop() || '';
    return commercialData[fileName] || {
      title: 'Publicidade',
      advertiser: 'Parceiro',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    };
  };

  // --- LÓGICA DE COMPARTILHAMENTO ATUALIZADA COM IMAGEM ---
  const shareToSocial = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin') => {
    const stationName = currentStation?.name || "Rádio Online";
    const message = `Estou ouvindo a rádio ${stationName} no site ${SITE_URL} 🎵`;
    
    const encodedText = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(SITE_URL);
    const encodedImage = encodeURIComponent(SITE_THUMBNAIL);
    
    let shareUrl = '';
    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodedText}`;
    }
    if (platform === 'facebook') {
      // Facebook usa o link para buscar as tags OG do site
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    }
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    }
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if ('mediaSession' in navigator && currentStation) {
      const title = isPlayingCommercial && currentCommercial 
        ? currentCommercial.title 
        : (currentTrackTitle || currentStation.name);
      
      const artist = isPlayingCommercial && currentCommercial 
        ? currentCommercial.advertiser 
        : (currentTrackTitle ? currentStation.name : 'Rádio Online');

      const artwork = isPlayingCommercial && currentCommercial
        ? currentCommercial.image
        : (currentStation.favicon || SITE_THUMBNAIL);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: currentStation.country || 'Ao Vivo',
        artwork: [
          { src: artwork, sizes: '96x96', type: 'image/png' },
          { src: artwork, sizes: '512x512', type: 'image/png' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', handlePlay);
      navigator.mediaSession.setActionHandler('pause', handlePlay);
      navigator.mediaSession.setActionHandler('previoustrack', recentlyPlayed.length > 1 ? playPreviousStation : null);
    }
  }, [currentStation, currentTrackTitle, isPlayingCommercial, currentCommercial, isPlaying]);

  useEffect(() => {
    if (!currentStation) return;
    if (!userRequestedPlay || isPlayingCommercial) {
      setPendingStation(currentStation);
      return;
    }
    playCommercialBeforeStation(currentStation);
  }, [currentStation]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isPlayingCommercial && pendingStation) {
        playRadioStation(pendingStation);
      } else {
        setUserRequestedPlay(false);
      }
    };

    const handleTimeUpdate = () => {
      if (isPlayingCommercial && audio.duration) {
        setCommercialProgress((audio.currentTime / audio.duration) * 100);
        setCommercialTimeLeft(Math.max(0, Math.ceil(audio.duration - audio.currentTime)));
        if (audio.currentTime >= 5 && !canSkipCommercial) setCanSkipCommercial(true);
      }
    };

    const handleLoadedMetadata = () => {
      if (isPlayingCommercial && audio.duration) setCommercialDuration(audio.duration);
    };

    const handleError = () => {
      if (isPlayingCommercial && pendingStation) playRadioStation(pendingStation);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
    };
  }, [isPlayingCommercial, pendingStation, canSkipCommercial]);

  const playCommercialBeforeStation = async (station: any) => {
    if (!audioRef.current || !station) return;
    const randomCommercialUrl = getRandomCommercial();
    const commercialInfo = getCommercialInfo(randomCommercialUrl);
    
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = randomCommercialUrl;
      setIsPlayingCommercial(true);
      setPendingStation(station);
      setCurrentCommercial(commercialInfo);
      setCommercialProgress(0);
      setCommercialDuration(0);
      setCanSkipCommercial(false);
      setCommercialTimeLeft(0);
      audioRef.current.load();
      await audioRef.current.play();
    } catch (error) {
      playRadioStation(station);
    }
  };

  const playRadioStation = async (station: any) => {
    if (!audioRef.current || !station) return;
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingCommercial(false);
      setCanSkipCommercial(false);
      setCurrentCommercial(null);
      const url = station.url_resolved || station.url;
      audioRef.current.src = url;
      audioRef.current.volume = volume;
      audioRef.current.load();
      await audioRef.current.play();
      if (Math.random() > 0.5) setCurrentTrackTitle("Transmissão Ao Vivo - " + station.name);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const skipCommercial = async () => {
    if (!canSkipCommercial || !pendingStation) return;
    playRadioStation(pendingStation);
  };

  const handlePlay = () => {
    if (!currentStation || !audioRef.current) return;
    if (isPlaying || isPlayingCommercial) {
      audioRef.current.pause();
      setUserRequestedPlay(false);
      togglePlay();
      return;
    }
    setUserRequestedPlay(true);
    playCommercialBeforeStation(currentStation);
    togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume || 0.5);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const playPreviousStation = () => {
    if (recentlyPlayed.length > 1) setCurrentStation(recentlyPlayed[1]);
  };

  const StationLogo = () => {
    if (!currentStation) return null;
    const baseClass = "h-12 w-12 rounded-xl object-cover border-2 border-white/20 shadow-md flex-shrink-0";
    if (currentStation.favicon) {
      return <img src={currentStation.favicon} alt={currentStation.name} className={baseClass} onError={(e) => {(e.target as HTMLImageElement).src = `https://via.placeholder.com/64/3b82f6/ffffff?text=${currentStation.name.charAt(0)}`;}} />;
    }
    return <div className={`${baseClass} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg`}>{currentStation.name.charAt(0)}</div>;
  };

  if (!currentStation) return null;

  const DisplayText = () => {
    if (isPlayingCommercial && currentCommercial) {
      return (
        <span className="text-yellow-400 font-medium flex items-center gap-1">
           <span className="text-[10px] bg-yellow-500/20 px-1 rounded border border-yellow-500/30">AD</span>
           {currentCommercial.title}
        </span>
      );
    }
    if (currentTrackTitle) {
      return (
        <div className="text-scroll-container w-full max-w-[140px] md:max-w-[250px]">
          <div className={currentTrackTitle.length > 30 ? "animate-marquee" : ""}>
            <span className="text-cyan-300 font-medium flex items-center gap-1.5">
              <Music2 size={12} className="animate-bounce" />
              {currentTrackTitle}
              {currentTrackTitle.length > 30 && <span className="mx-4">{currentTrackTitle}</span>}
            </span>
          </div>
        </div>
      );
    }
    return (
      <span className="text-blue-200 text-xs flex items-center gap-1">
        <Radio size={12} />
        {currentStation.country} • {currentStation.tags ? currentStation.tags.split(',')[0] : 'Ao Vivo'}
      </span>
    );
  };

  return (
    <div>
      <style>{marqueeStyle}</style>
      <audio ref={audioRef} />
      
      {isPlayingCommercial && currentCommercial ? (
        <CommercialPlayer
          commercial={currentCommercial}
          isPlaying={isPlaying}
          currentTime={commercialProgress}
          duration={commercialDuration}
          canSkip={canSkipCommercial}
          onPlayPause={handlePlay}
          onSkip={skipCommercial}
        />
      ) : (
        <div className="glass-card-dark p-3 w-full max-w-5xl mx-auto shadow-2xl backdrop-blur-xl border border-white/10 rounded-2xl relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 min-w-0">
              <StationLogo />
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="text-base font-bold truncate text-white leading-tight mb-0.5">
                  {currentStation.name}
                </h3>
                <div className="h-5 flex items-center">
                  <DisplayText />
                </div>
              </div>
              
              <div className="md:hidden flex items-center gap-0.5">
                <button onClick={() => shareToSocial('whatsapp')} className="p-1.5 rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all group">
                  <SocialIcon type="whatsapp" />
                </button>
                <button onClick={copyToClipboard} className="p-1.5 rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all">
                  {copied ? <Check size={18} className="text-green-400" /> : <LinkIcon size={18} />}
                </button>
                
                <div className="w-px h-6 bg-white/10 mx-0.5"></div>

                <button
                  onClick={() => toggleFavorite(currentStation)}
                  className={`p-1.5 rounded-xl transition-all active:scale-95 ${
                    isFavorite(currentStation.stationuuid) ? 'text-red-500' : 'text-white/60'
                  }`}
                >
                  <Heart size={20} fill={isFavorite(currentStation.stationuuid) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-3 md:gap-5 bg-black/10 md:bg-transparent p-2 md:p-0 rounded-xl">
              
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden md:flex items-center gap-1.5 mr-4 border-r border-white/10 pr-4">
                  <button onClick={() => shareToSocial('whatsapp')} className="p-1.5 rounded-full hover:bg-white/10 transition-colors group" title="WhatsApp">
                    <SocialIcon type="whatsapp" />
                  </button>
                  <button onClick={() => shareToSocial('facebook')} className="p-1.5 rounded-full hover:bg-white/10 transition-colors group" title="Facebook">
                    <SocialIcon type="facebook" />
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className="p-1.5 rounded-full hover:bg-white/10 transition-colors group" title="X / Twitter">
                    <SocialIcon type="twitter" />
                  </button>
                  <button onClick={copyToClipboard} className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70" title="Copiar Link">
                    {copied ? <Check size={18} className="text-green-400" /> : <LinkIcon size={18} />}
                  </button>
                </div>

                <button
                  onClick={playPreviousStation}
                  disabled={recentlyPlayed.length <= 1}
                  className={`p-2 rounded-full transition-all ${
                    recentlyPlayed.length <= 1 ? 'opacity-30' : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <SkipBack size={20} />
                </button>

                <button
                  onClick={handlePlay}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                >
                  {(isPlaying || isPlayingCommercial) ? (
                    <Pause size={22} fill="currentColor" />
                  ) : (
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => toggleFavorite(currentStation)}
                  className={`hidden md:block p-2 rounded-full transition-all hover:bg-white/10 ${
                    isFavorite(currentStation.stationuuid) ? 'text-red-500' : 'text-white/60'
                  }`}
                >
                  <Heart size={20} fill={isFavorite(currentStation.stationuuid) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="w-px h-8 bg-white/10 md:hidden mx-1"></div>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer slider accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Player;