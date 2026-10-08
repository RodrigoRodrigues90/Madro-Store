import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

// Estilos essenciais do Swiper
import 'swiper/css';

import '../css/HorizontalScrollSection.css';

// Importação das Imagens
import oculosWebp from '../assets/oculos.webp';
import pulseirasWebp from '../assets/pulseiras.webp';
import aneisWebp from '../assets/aneis.webp';
import colaresWebp from '../assets/colares.webp';
import brincosWebp from '../assets/brincos.webp';

const produtosManuais = [
    { id: 1, categoria: 'ÓCULOS', imgSrc: oculosWebp },
    { id: 2, categoria: 'PULSEIRAS', imgSrc: pulseirasWebp },
    { id: 3, categoria: 'ANÉIS', imgSrc: aneisWebp },
    { id: 4, categoria: 'COLARES', imgSrc: colaresWebp },
    { id: 5, categoria: 'BRINCOS', imgSrc: brincosWebp },
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
                                    <img
                                        src={item.imgSrc}
                                        alt={`Categoria ${item.categoria}`}
                                        loading="eager"
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