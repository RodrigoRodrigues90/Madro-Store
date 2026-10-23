import { memo, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';

import '../css/HorizontalScrollSection.css';


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

const reduzirMovimento = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const economiaDeDados = () =>
    typeof navigator !== 'undefined' && navigator.connection?.saveData === true;

const CardVideo = memo(function CardVideo({ src, label }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;

        const podeTocar = !reduzirMovimento() && !economiaDeDados();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && podeTocar) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-label={label}
        />
    );
});

export default function HorizontalScrollSection() {
    const sectionRef = useRef(null);
    const wmBelowRef = useRef(null);
    const swiperRef = useRef(null);
    const tweenRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const totalSlides = produtosManuais.length;


    useEffect(() => {
        const wmBelow = wmBelowRef.current;
        if (!wmBelow || reduzirMovimento()) return;

        const ctx = gsap.context(() => {
            tweenRef.current = gsap.fromTo(
                wmBelow,
                { xPercent: -50 },
                {
                    xPercent: 0,
                    ease: 'none',
                    duration: 42,
                    repeat: -1,
                    force3D: true,
                }
            );
        });

        return () => {
            tweenRef.current = null;
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                tweenRef.current?.play();
                swiperRef.current?.autoplay?.start();
            } else {
                tweenRef.current?.pause();
                swiperRef.current?.autoplay?.stop();
            }
        });

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="horizontal-section" ref={sectionRef}>
            <div className="footer-divider" />
            <span className="horizontal-title">QUALIDADE & PERSONALIDADE</span>
            <h2 className="horizontal-subtitle">Escolha por Categoria </h2>

            {/* Container do Swiper */}
            <div className="track-container">

                <button
                    className="custom-nav-btn prev-btn"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Anterior"
                >
                    ‹
                </button>

                <Swiper
                    modules={[Autoplay]}
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
                        disableOnInteraction: false, 
                        pauseOnMouseEnter: true,
                    }}
                    className="horizontal-swiper-track"
                >
                    {/* Cards dos Produtos */}
                    {produtosManuais.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-slide-custom">
                            <div className="video-card">
                                <div className="video-wrapper">
                                    <CardVideo
                                        src={item.videoSrc}
                                        label={`Categoria ${item.categoria}`}
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
                        aria-label={`Ir para o slide ${index + 1}`}
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
