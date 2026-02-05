import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Heart, Globe, Headphones, TrendingUp, Star, X, Search } from 'lucide-react';
import StationList from '../components/StationList';
import { useRadio } from '../contexts/RadioContext';
import { fetchStations } from '../services/api';
import { RadioStation } from '../types/station';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Lista estática de dados das rádios (Stories)
const STORIES_DATA = [
  { name: 'Jovem Pan', logo: 'https://img.radios.com.br/radio/lg/radio13388_1757040203.jpg', url: 'https://jovempan.com.br' },
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
  { name: 'Ótima FM', logo: 'https://img.radios.com.br/radio/lg/radio27258_1646778302.png', url: 'https://otimafm.com.br' },
  { name: 'Liberdade FM', logo: 'https://img.radios.com.br/radio/md/radio13590_1661519400.jpeg', url: 'https://www.radioliberdade.com.br/' },
  { name: 'Rádio Metropolitana', logo: 'https://img.radios.com.br/radio/lg/radio13900_1665067845.png', url: 'http://www.metropolitanafm.com.br/' },
  { name: 'Rádio Bom Sucesso', logo: 'https://img.radios.com.br/radio/md/radio10473_1574106832.jpg', url: 'https://radiobomsucesso.com.br/' },
  { name: 'Rádio Itatiaia', logo: 'https://img.radios.com.br/radio/lg/radio14_1646746883.jpeg', url: 'https://www.itatiaia.com.br/' },
  { name: 'Rádio Canção Nova', logo: 'https://img.radios.com.br/radio/lg/radio11125_1568051795.png', url:'https://radio.cancaonova.com/' },
  { name: 'Rádio Inconfidência', logo: 'https://img.radios.com.br/radio/lg/radio139_1488725850.jpg', url: 'https://www.inconfidencia.com.br/' },
  { name: 'Rádio Jornal', logo: 'https://img.radios.com.br/radio/lg/radio13488_1558098324.jpg', url: 'https://radiojornal.com.br/' },
  { name: 'Rádio Gaúcha', logo: 'https://img.radios.com.br/radio/md/radio13176_1628168105.png', url: 'https://gauchazh.clicrbs.com.br/' },
  { name: 'Rádio Band FM ', logo: 'https://img.radios.com.br/radio/lg/radio10358_1526480428.jpg', url: 'https://www.band.com.br/band-fm/' },
  { name: 'Rádio Antena 1', logo: 'https://img.radios.com.br/radio/lg/radio15456_1758287813.jpg', url: 'https://www.antena1rio.com.br/' },
  { name: 'Rádio Clube', logo: 'https://img.radios.com.br/radio/lg/radio11839_1658250334.png', url: 'https://clube.fm/' },
  { name: 'Rádio FM O Dia', logo: 'https://img.radios.com.br/radio/lg/radio229211_1706128532.jpeg', url: 'https://macae.fmodia.com.br/' },
  { name: 'Super Rádio Tupi', logo: 'https://img.radios.com.br/radio/lg/radio14215_1732190432.png', url: 'https://www.tupi.fm/' },
  { name: 'Rádio Nativa', logo: 'https://img.radios.com.br/radio/lg/radio14040_1677589865.png', url: 'https://www.band.com.br/radios/nativa/sao-paulo' },
  { name: 'Rádio Kboing', logo: 'https://img.radios.com.br/radio/lg/radio29604_1653915617.jpg', url: ' https://www.kboingfm.com.br' },
  { name: 'Rádio Melodia', logo: 'https://img.radios.com.br/radio/lg/radio13848_1439401456.jpg', url: 'http://www.melodia.com.br/' },
  { name: 'Web Vintage Radio', logo: 'https://img.radios.com.br/radio/lg/radio61905_1558962314.jpg', url: 'https://www.sistemavintage.com/'},
];

// Lista de Nomes para busca (Tags Sugestivas)
const SUGGESTED_TAGS = [
  "Jovem Pan", "Antena 1", "Coca-Cola FM", "BandNews", "Alpha FM",
  "Nativa", "Mix FM", "89 Rock", "Nova Brasil", "Energia 97",
  "Transamérica", "CBN", "Metropolitana", "Disney", "Rádio Globo"
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { stations, isLoading, error, recentlyPlayed } = useRadio();
  
  // States principais
  const [popularStations, setPopularStations] = useState<RadioStation[]>([]);
  const [featuredStations, setFeaturedStations] = useState<RadioStation[]>([]);
  const [brazilStations, setBrazilStations] = useState<RadioStation[]>([]);
  
  // State para os Stories aleatórios
  const [stories, setStories] = useState(STORIES_DATA);

  // Loadings
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingBrazil, setLoadingBrazil] = useState(false);

  // States para busca por Tags
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagStations, setTagStations] = useState<RadioStation[]>([]);
  const [loadingTag, setLoadingTag] = useState(false);

  // Função para limpar a busca
  const clearTagSearch = () => {
    setSelectedTag(null);
    setTagStations([]);
  };

  // Função para lidar com clique na Tag (Busca por NOME + PAÍS: Brasil)
  const handleTagClick = async (tagName: string) => {
    // Se clicar na tag que já está ativa, limpa o filtro (toggle)
    if (selectedTag === tagName) {
      clearTagSearch();
      return;
    }

    setSelectedTag(tagName);
    setLoadingTag(true);
    setTagStations([]); 

    try {
      // AQUI ESTÁ A MUDANÇA: Adicionamos country: 'Brazil'
      const data = await fetchStations({ 
        name: tagName, 
        country: 'Brazil' // Filtra apenas estações do Brasil
      }, 30);
      
      setTagStations(data);
    } catch (err) {
      console.error(`Erro ao buscar rádio ${tagName} no Brasil:`, err);
    } finally {
      setLoadingTag(false);
    }
  };

  useEffect(() => {
    document.title = 'Rádio BR - Ouça rádios brasileiras';

    // LÓGICA DE ALEATORIEDADE DOS STORIES
    const shuffledStories = [...STORIES_DATA].sort(() => Math.random() - 0.5);
    setStories(shuffledStories);

    const CACHE_TTL = 1000 * 60 * 10; 

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
    <div className="flex flex-col pb-20">

      {/* 1. TAGS SUGESTIVAS DE RÁDIOS (No Topo) */}
      <section className="w-full max-w-[1515px] mx-auto px-4 mb-2 md:mb-6 relative z-30 -mt-10 md:-mt-20">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          {SUGGESTED_TAGS.map((tag, index) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shadow-sm active:scale-95
                  ${isActive 
                    ? 'bg-green-600 text-white border border-green-700 shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-700 hover:bg-green-50'
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. SEÇÃO DE RESULTADOS DA BUSCA POR NOME (TAG) */}
      {selectedTag && (
        <section className="w-full max-w-[1515px] mx-auto px-4 mb-8 animate-fade-in relative z-30">
          <div className="flex items-center justify-between mb-4 bg-green-50 p-4 rounded-xl border border-green-100">
            <h2 className="text-xl font-bold flex items-center text-gray-900">
              <Search className="text-green-600 mr-2 w-5 h-5" /> 
              Buscando no Brasil: <span className="text-green-700 ml-1">"{selectedTag}"</span>
            </h2>
            <button
              onClick={clearTagSearch}
              className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm"
            >
              <X size={16} /> Limpar
            </button>
          </div>
          
          <StationList
            stations={tagStations}
            isLoading={loadingTag}
            emptyMessage={`Nenhuma rádio brasileira encontrada com o nome "${selectedTag}".`}
          />
        </section>
      )}

      {/* 3. HERO BRASILEIRO */}
      <section className="w-full max-w-[1515px] mx-auto relative rounded-3xl overflow-hidden shadow-xl text-white aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] mt-4 z-10">
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
              href: "https://97fmnatal.com.br",
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

      {/* 4. STORIES DE RÁDIOS */}
      <section className="px-2 mt-8 mb-8 relative z-20">
        
        {/* Container Desktop */}
        <div className="hidden md:flex gap-3 md:gap-5 overflow-hidden justify-center">
          {stories.map((station, idx) => (
            <a
              key={idx}
              href={station.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 
                ${idx >= 14 ? 'hidden' : ''}`} 
            >
              <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden shadow-md flex-shrink-0">
                <img
                  src={station.logo}
                  alt={station.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-gray-700 mt-2 text-center w-[80px] truncate block">
                {station.name}
              </span>
            </a>
          ))}
        </div>

        {/* Container Mobile (Scrollable) */}
        <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x">
          {stories.map((station, idx) => (
            <a
              key={idx}
              href={station.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 snap-start"
            >
              <div className="w-14 h-14 rounded-full border-[3px] border-yellow-400 overflow-hidden shadow-md flex-shrink-0">
                <img
                  src={station.logo}
                  alt={station.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs text-gray-700 mt-1.5 text-center w-[60px] truncate block">
                {station.name}
              </span>
            </a>
          ))}
        </div>

      </section>

      {/* FUNCIONALIDADES */}
      <section className="hidden md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 mb-10">
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
      <section className="mb-10">
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
      <section className="mb-10">
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
      <section className="mb-10">
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
        <section className="mb-10">
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