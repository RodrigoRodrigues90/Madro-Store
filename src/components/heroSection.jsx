import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoBg from '../assets/backGround.mp4';
import '../css/heroSection.css';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.normalizeScroll(true);

export default function HeroSection({
    brandName = "MADRO",
    scrollText = "ROLE PARA EXPLORAR",
}) {
    const heroWrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = heroWrapperRef.current;
        if (!wrapper) return;
        const headerElement = document.querySelector('header');

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top top',
                    end: '+=350%',
                    scrub: 2,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Oculta o indicador de rolagem
            tl.to('#hero-scroll-hint', { opacity: 0, duration: 0.1 }, 0)

                // 2. Faz o zoom da palavra/máscara SVG
                .to(
                    '#hero-zoom-target',
                    {
                        scale: 80,
                        transformOrigin: '47% 50%',
                        ease: 'power2.inOut',
                        duration: 1,
                    },
                    0
                );

            // 3. Remove a máscara
            tl.to(
                '.hero-overlay-mask',
                {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.15,
                },
                0.5
            );

            // 4. Animação do cabeçalho
            if (headerElement) {
                tl.fromTo(
                    headerElement,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, ease: 'power1.out', duration: 0.3 },
                    0.4
                );
            }

            // 5. ANIMAÇÃO DOS TEXTOS NO FINAL DA TIMELINE (Inicia em 0.75 s/fator da timeline)
            tl.fromTo(
                '#subtitle-hero .hero-text-item',
                {
                    opacity: 0,
                    y: 35,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.08, // Revela palavra 1 -> símbolo -> palavra 2 rapidamente em sequência
                    duration: 0.5,
                    ease: 'power2.out',
                },
                0.75 // Posição no final do zoom
            );

        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroWrapperRef} className="hero-container">
            {/* 1. CAMADA DE VÍDEO DE BACKGROUND E TEXTO SOBREPOSTO */}
            <div className="hero-video-wrapper">
                <video
                    className="hero-video-element"
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                />

                {/* Elemento de texto acionado no final da animação */}
                <div id="subtitle-hero" className="subtitle-hero">
                    <span className="hero-text-item">Nova</span>
                    <br />
                    <span className="hero-text-item">Coleção</span>
                    <br />
                    <span className="hero-text-item">Verão☼</span>

                </div>
            </div>

            {/* 2. CAMADA DE OVERLAY COM MÁSCARA SVG */}
            <div className="hero-overlay-mask">
                <svg
                    className="hero-svg-viewport"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <mask id="madro-hero-mask">
                            <rect width="100%" height="100%" fill="#ffffff" />
                            <g id="hero-zoom-target">
                                <text
                                    x="500"
                                    y="500"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className="hero-svg-text"
                                >
                                    {brandName}
                                </text>
                            </g>
                        </mask>
                    </defs>

                    <rect
                        width="100%"
                        height="100%"
                        fill="#FDFBFB"
                        mask="url(#madro-hero-mask)"
                    />
                </svg>

                <div id="hero-scroll-hint" className="hero-scroll-hint">
                    <span>{scrollText}</span>
                </div>
            </div>
        </section>
    );
}