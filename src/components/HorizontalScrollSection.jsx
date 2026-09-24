import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/HorizontalScrollSection.css';

// Importação direta dos vídeos no topo do componente
import oculosVideo from '../assets/oculos.mp4';
import pulseirasVideo from '../assets/pulseira.mp4';
import aneisVideo from '../assets/aneis.mp4';
import colaresVideo from '../assets/colares.mp4';
import brincosVideo from '../assets/brincos.mp4'

gsap.registerPlugin(ScrollTrigger);

// Array manual de produtos
const produtosManuais = [
    {
        id: 1,
        categoria: 'ÓCULOS',
        videoSrc: oculosVideo,
    },
    {
        id: 2,
        categoria: 'PULSEIRAS',
        videoSrc: pulseirasVideo,
    },
    {
        id: 3,
        categoria: 'ANÉIS',
        videoSrc: aneisVideo,
    },
    {
        id: 4,
        categoria: 'COLARES',
        videoSrc: colaresVideo,
    },
    {
        id: 5,
        categoria: 'BRINCOS',
        videoSrc: brincosVideo,
    },
];

export default function HorizontalScrollSection() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const watermarkBelowRef = useRef(null);
    const watermarkUpRef = useRef(null);
    const introTitleRef = useRef(null);
    const introTextRef = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1px)", () => {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            const calculatedTranslate = trackWidth - viewportWidth;
            const xTranslate = calculatedTranslate > 0 
                ? -calculatedTranslate 
                : -(viewportWidth * 0.5);

            const scrollDistance = Math.max(trackWidth * 1.5, viewportWidth * 1.5);

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: targetRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Revelação do Título/Texto de Entrada
            timeline.fromTo(
                [introTitleRef.current, introTextRef.current],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.1, stagger: 0.1, ease: 'power2.out' },
                0
            );

            // Animação da trilha horizontal
            timeline.to(
                trackRef.current,
                {
                    x: xTranslate,
                    ease: 'power2.inOut',
                },
                0.2
            );

            // Marcas d'água
            timeline.to(
                watermarkBelowRef.current,
                { x: xTranslate * 0.4, ease: 'none' },
                0.2
            );

            timeline.to(
                watermarkUpRef.current,
                { x: -xTranslate * 0.4, ease: 'none' },
                0.2
            );
        });

        ScrollTrigger.refresh();

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section className="horizontal-section" ref={targetRef}>
            <div className="watermark-text-up" ref={watermarkUpRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>

            <div className="horizontal-track" ref={trackRef}>
                <div className="intro-card">
                    <h2 ref={introTitleRef}>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                    <p ref={introTextRef}>Garanta os seus favoritos da estação.</p>
                </div>

                {produtosManuais.map((item) => (
                    <div className="video-card" key={item.id}>
                        <div className="video-wrapper">
                            <video
                                src={item.videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <span className="card-badge">{item.categoria}</span>
                            <div className="card-details">
                                <button className="buy-btn">Ver Produtos</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="scroll-end-spacer" />
            </div>

            <div className="watermark-text-below" ref={watermarkBelowRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>
        </section>
    );
}