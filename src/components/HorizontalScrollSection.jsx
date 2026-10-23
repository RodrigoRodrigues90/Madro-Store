import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

// Estilos essenciais do Swiper
import 'swiper/css';

import '../css/HorizontalScrollSection.css';

// Importação dos videos

import oculosVideo from '../assets/mp4/oculos.mp4';
import aneisVideo from '../assets/mp4/aneis.mp4';
import colaresVideo from '../assets/mp4/colares.mp4';
import brincosVideo from '../assets/mp4/brincos.mp4';
import pulseirasVideo from '../assets/mp4/pulseiras.mp4';

const produtosManuais = [
    { id: 1, categoria: 'ÓCULOS', videoSrc: oculosVideo },
    { id: 2, categoria: 'PULSEIRAS', videoSrc: pulseirasVideo },
    { id: 3, categoria: 'ANÉIS', videoSrc: aneisVideo },
    { id: 4, categoria: 'COLARES', videoSrc: colaresVideo },
    { id: 5, categoria: 'BRINCOS', videoSrc: brincosVideo },
];

export default function HorizontalScrollSection() {
    const wmBelowRef = useRef(null);
    const swiperRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const totalSlides = produtosManuais.length;

    useEffect(() => {

        const wmBelow = wmBelowRef.current;

        const ctx = gsap.context(() => {
            if (wmBelow) {
                gsap.fromTo(
                    wmBelow,
                    { xPercent: -50 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        duration: 42,
                        repeat: -1,
                    }
                );
            }

        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="horizontal-section">
            <div className="footer-divider" />
            <span className="horizontal-title">QUALIDADE & PERSONALIDADE</span>
            <h2 className="horizontal-subtitle">Escolha por Categoria </h2>

            {/* Container do Swiper */}
            <div className="track-container">
                {/* Botão Anterior Customizado */}
                <button
                    className="custom-nav-btn prev-btn"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Anterior"
                >
                    ‹
                </button>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    centeredSlidesBounds={false}
                    centerInsufficientSlides={true}
                    spaceBetween={20}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000, // Tempo de espera entre os slides (3 segundos)
                        disableOnInteraction: false, // Continua a rodar sozinho mesmo após o utilizador interagir/clicar
                        pauseOnMouseEnter: true, // Pausa a reprodução quando o rato passa por cima
                    }}
                    className="horizontal-swiper-track"
                >
                    {/* Cards dos Produtos */}
                    {produtosManuais.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-slide-custom">
                            <div className="video-card">
                                <div className="video-wrapper">
                                    <video
                                        src={item.videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label={`Categoria ${item.categoria}`}
                                    />
                                    <span className="card-badge">{item.categoria}</span>
                                    <div className="card-details">
                                        <Link to={"/Madro-Store/produtos/" + item.categoria.toLowerCase()}>
                                            <button className="buy-btn">Ver Produtos</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Botão Próximo Customizado */}
                <button
                    className="custom-nav-btn next-btn"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Próximo"
                >
                    ›
                </button>
            </div>

            <div className="custom-pagination">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`custom-bullet ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => swiperRef.current?.slideTo(index)}
                    />
                ))}
            </div>

            {/* Marca d'água Inferior */}
            <div className="watermark-wrapper">
                <div className="watermark-track" ref={wmBelowRef}>
                    {/* Bloco 1 e Bloco 2 para o loop perfeito do GSAP */}
                    {[1, 2].map((_, idx) => (
                        <div key={idx} className="watermark-item">
                            {/* Repetição interna para garantir largura maior que 100vw */}
                            {[...Array(4)].map((_, itemIdx) => (
                                <span key={itemIdx} className="watermark-content">
                                    <Gem size={20} strokeWidth={1.8} />
                                    <span>COLEÇÃO</span>
                                    <Gem size={20} strokeWidth={1.8} />
                                    <span>EM MOVIMENTO</span>
                                    <Gem size={20} strokeWidth={1.8} />
                                    <span>MADRO</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-divider" />
        </section>
    );
}