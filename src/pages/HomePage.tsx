import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Heart, Globe, Headphones, TrendingUp, Star } from 'lucide-react';
import StationList from '../components/StationList';
import { useRadio } from '../contexts/RadioContext';
import { fetchStations } from '../services/api';
import { RadioStation } from '../types/station';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Lista estática de dados das rádios (movida para fora para organizar)
const STORIES_DATA = [
  { name: 'Jovem Pan', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Jovem_Pan_FM_logo_2018_%282%29.png', url: 'https://jovempan.com.br' },
  { name: 'CBN', logo: 'https://s3.glbimg.com/v1/AUTH_3ec28e89a5754c7b937cbc7ade6b1ace/assets/common/cbn-1024x1024.svg', url: 'https://cbn.globoradio.globo.com' },
  { name: 'BandNews', logo: 'https://img.band.com.br/image/2025/03/28/lofo-ao-vivo-bandnews-91316_300x300.png', url: 'https://bandnewsfm.band.uol.com.br' },
  { name: 'Antena 1', logo: 'https://img.radios.com.br/radio/xl/radio9505_1574106966.jpg', url: 'https://antena1.com.br' },
  { name: 'Transamérica', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Rede_Transam%C3%A9rica_logo.png', url: 'https://transamerica.com.br' },
  { name: 'Massa FM', logo: 'https://radioamantes.com/wp-content/uploads/2019/09/massa-fm.jpg', url: 'https://massafm.com.br' },
  { name: 'Rádio Globo', logo: 'https://thumbnail.anii.io/br/radio-globo-98-1-fm-rio-de-janeiro-brazil.webp', url: 'https://radioglobo.globo.com' },
  { name: 'Kiss FM', logo: 'https://kissfm.com.br/wp-content/uploads/2024/08/Madrugada_Kiss.png', url: 'https://kissfm.com.br' },
  { name: 'Kiis FM', logo: 'https://img.radios.com.br/radio/xl/radio72023_1702994214.jpeg', url: 'https://kiisfm.iheart.com/' },
  { name: 'Band FM', logo: 'https://upload.wikimedia.org/wikipedia/pt/1/1f/Logotipo_da_BandNews_FM.png', url: 'https://bandfm.band.uol.com.br' },
  { name: 'Clube FM', logo: 'https://yt3.googleusercontent.com/gAgCvOpnliRNhl7zfEVESJTnHt6ucQjxJDG7R-OAE78R6wz1IGbTEiln6gp4HpBdVU1S8EIAduc=s900-c-k-c0x00ffffff-no-rj', url: 'https://clubefm.com.br' },
  { name: 'Feliz FM', logo: 'https://tudoradio.com/img/uploads/radios/63ad97b8191c6.png', url: 'https://felizfm.fm' },
  { name: 'Nativa FM', logo: 'https://play-lh.googleusercontent.com/wjb4ogU4G9GC-ckpP0FwH-g8djFPPM1yCHedYBBIPruY3MmpAsR2xVa-kTZXLb4BmQ', url: 'https://nativa.fm' },
  { name: 'BH FM', logo: 'https://play-lh.googleusercontent.com/NtWriUQSnawi2s9DD9wvujyeFgYbVsn9buq_8VomcBSgIDR0iP2XPT-SuM7JynSW-c0', url: 'https://bhfm.com.br' },
  { name: 'Top FM', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/1/10/Logotipo_da_Top_FM.png/250px-Logotipo_da_Top_FM.png', url: 'https://topfm.com.br' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { stations, isLoading, error, recentlyPlayed } = useRadio();
  
  // States
  const [popularStations, setPopularStations] = useState<RadioStation[]>([]);
  const [featuredStations, setFeaturedStations] = useState<RadioStation[]>([]);
  const [brazilStations, setBrazilStations] = useState<RadioStation[]>([]);
  
  // Novo State para os Stories aleatórios
  const [stories, setStories] = useState(STORIES_DATA);

  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingBrazil, setLoadingBrazil] = useState(false);

  useEffect(() => {
    document.title = 'Rádio BR - Ouça rádios brasileiras';

    // LÓGICA DE ALEATORIEDADE DOS STORIES
    // Embaralha a lista ao carregar a página
    const shuffledStories = [...STORIES_DATA].sort(() => Math.random() - 0.5);
    setStories(shuffledStories);

    const CACHE_TTL = 1000 * 60 * 10; // 10 minutos

    const getFromCache = (key: string) => {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      const isValid = Date.now() - parsed.timestamp < CACHE_TTL;
      return isValid ? parsed.data : null;
    };

    const saveToCache = (key: string, data: any) => {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    };

    const loadStations = async () => {
      setLoadingPopular(true);
      try {
        const cached = getFromCache('popularStations');
        if (cached) {
          setPopularStations(cached.slice(0, 48));
          setFeaturedStations(cached.slice(12, 48));
        } else {
          const data = await fetchStations({}, 50);
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setPopularStations(shuffled.slice(0, 48));
          setFeaturedStations(shuffled.slice(12, 48));
          saveToCache('popularStations', shuffled);
        }
      } catch (err) {
        console.error('Erro ao carregar estações:', err);
      } finally {
        setLoadingPopular(false);
      }
    };

    const loadBrazilStations = async () => {
      setLoadingBrazil(true);
      try {
        const cached = getFromCache('brazilStations');
        if (cached) {
          setBrazilStations(cached.slice(0, 24));
        } else {
          const data = await fetchStations({ country: 'Brazil' }, 50);
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setBrazilStations(shuffled.slice(0, 24));
          saveToCache('brazilStations', shuffled);
        }
      } catch (err) {
        console.error('Erro ao carregar rádios do Brasil:', err);
      } finally {
        setLoadingBrazil(false);
      }
    };

    loadStations();
    loadBrazilStations();
  }, []);

  return (
    <div className="space-y-10 md:space-y-16 pb-20">

      {/* STORIES DE RÁDIOS - ESTILO INSTAGRAM (ADAPTADO MOBILE + ALEATÓRIO) */}
      <section className="px-2 -mt-13 md:-mt-10 relative z-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 hidden md:block"></h2>
        
        {/* Container Scrollável */}
        <div className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x">
          {stories.map((station, idx) => (
            <a
              key={idx}
              href={station.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 snap-start"
            >
              {/* Círculo Responsivo: w-14 (mobile) vs w-20 (desktop) */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-[3px] md:border-4 border-yellow-400 overflow-hidden shadow-md flex-shrink-0">
                <img
                  src={station.logo}
                  alt={station.name}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Texto Responsivo: text-xs (mobile) vs text-sm (desktop) */}
              <span className="text-xs md:text-sm text-gray-700 mt-1.5 md:mt-2 text-center w-[60px] md:w-[80px] truncate block">
                {station.name}
              </span>
            </a>
          ))}
        </div>
      </section>

       {/* HERO BRASILEIRO */}
 
  <section className="w-full max-w-[1515px] mx-auto relative rounded-3xl overflow-hidden shadow-xl text-white aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5]">

  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 5000 }}
    loop={true}
    className="h-full w-full"
  >
    {[
      {
        href: "https://radiojobs.com.br",
        img: "https://97fmnatal.com.br/images/vitrine.png",
        alt: "Rádio antiga",
        title: "Sintonize Emoções",
        text: "Cada estação é uma porta para novas descobertas. Explore músicas, histórias e culturas que atravessam o tempo e o país.",
      },
      {
        href: "https://radioliberdade.com.br/",
        img: "https://radioliberdade.com.br/imagens/upload/destaquehome/1200x400-6749fa9bdbac2-1732901531.png",
        alt: "Música e tecnologia",
        title: "Escute a Rádio Sertaneja do Brasil",
        text: "Uma mistura de músicas sertanejas Brasileiras ",
      },
      {
        href: "https://apple.com.br",
        img: "https://thinkmarketingmagazine.com/wp-content/uploads/2013/06/steve-jobs.jpg",
        alt: "Música e tecnologia",
        title: "Onde a Tradição Encontra o Futuro",
        text: "A rádio brasileira se reinventa com tecnologia, mantendo viva a conexão entre voz, música e sentimento.",
      },
    ].map((slide, index) => (
      <SwiperSlide key={index}>
        <a
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative h-full w-full"
        >
          <img
            src={slide.img}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:p-12 flex flex-col justify-center h-full bg-black/50">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-xl">{slide.title}</h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl text-white/90 drop-shadow-md">
              {slide.text}
            </p>
          </div>
        </a>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

      {/* FUNCIONALIDADES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
        {[
          { icon: <Radio size={30} className="md:w-9 md:h-9 text-green-600" />, title: 'Rádios para todos', text: 'Milhares de estações do Brasil e do mundo à sua disposição.' },
          { icon: <Headphones size={30} className="md:w-9 md:h-9 text-yellow-600" />, title: 'Fácil de usar', text: 'Clique, escute e curta sua estação preferida, sem complicações.' },
          { icon: <Heart size={30} className="md:w-9 md:h-9 text-red-500" />, title: 'Favoritas salvas', text: 'Guarde suas rádios preferidas para ouvir sempre que quiser.' },
          { icon: <Globe size={30} className="md:w-9 md:h-9 text-blue-500" />, title: 'Cobertura global', text: 'Além do Brasil, explore estações de todo o planeta.' },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex md:block items-center md:items-start gap-4"
          >
            <div className="md:mb-4 flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-snug">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* RÁDIOS DO BRASIL */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4">
          <h2 className="text-xl md:text-3xl font-bold flex items-center text-gray-900">
            <Globe className="text-green-600 mr-2 w-6 h-6 md:w-8 md:h-8" /> Rádios do Brasil
          </h2>
          <button
            onClick={() => navigate('/countries/Brazil')}
            className="text-xs md:text-sm font-semibold text-green-600 hover:text-green-800 transition"
          >
            Ver todas
          </button>
        </div>
        <StationList
          stations={brazilStations}
          isLoading={loadingBrazil}
          emptyMessage="Nenhuma estação brasileira disponível no momento."
        />
      </section>

      {/* ESTAÇÕES POPULARES */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4">
          <h2 className="text-xl md:text-3xl font-bold flex items-center text-gray-900">
            <TrendingUp className="text-yellow-500 mr-2 w-6 h-6 md:w-8 md:h-8" /> Mais Ouvidas
          </h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-xs md:text-sm font-semibold text-yellow-600 hover:text-yellow-800 transition"
          >
            Ver todas
          </button>
        </div>
        <StationList
          stations={popularStations}
          isLoading={loadingPopular}
          emptyMessage="Carregando estações populares..."
        />
      </section>

      {/* ESTAÇÕES EM DESTAQUE */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4">
          <h2 className="text-xl md:text-3xl font-bold flex items-center text-gray-900">
            <Star className="text-red-500 mr-2 w-6 h-6 md:w-8 md:h-8" /> Em Destaque
          </h2>
        </div>
        <StationList
          stations={featuredStations}
          isLoading={loadingPopular}
          emptyMessage="Nenhuma estação em destaque agora."
        />
      </section>

      {/* ESTAÇÕES RECENTES */}
      {recentlyPlayed.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6 px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">Ouvidas Recentemente</h2>
            <button
              onClick={() => navigate('/history')}
              className="text-xs md:text-sm font-semibold text-yellow-600 hover:text-yellow-800 transition"
            >
              Ver todas
            </button>
          </div>
          <StationList
            stations={recentlyPlayed.slice(0, 9)}
            emptyMessage="Nenhuma estação recente."
          />
        </section>
      )}
    </div>
  );
};

export default HomePage;