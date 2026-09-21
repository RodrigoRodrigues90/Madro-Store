import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoBg from '../assets/backGround.mp4';
import '../css/heroSection.css';

gsap.registerPlugin(ScrollTrigger);

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
                    end: '+=150%',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            });

            tl.to('#hero-scroll-hint', { opacity: 0, duration: 0.1 }, 0)

                .to(
                    '#hero-zoom-target',
                    {
                        scale: 50,
                        transformOrigin: '47% 50%',
                        ease: 'power2.in',
                    },
                    0
                )

                .to(
                    '.hero-overlay-mask',
                    {
                        opacity: 0,
                        pointerEvents: 'none',
                        ease: 'power1.out',
                    },
                    0.85
                )

            if (headerElement) {
                tl.fromTo(
                    headerElement,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, ease: 'power1.out' },
                    0.7
                );
            }

        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroWrapperRef} className="hero-container">
            {/* 1. CAMADA DE VÍDEO DE BACKGROUND (FIXA NO FUNDO DA HERO) */}
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
            </div>

            {/* 2. CAMADA DE OVERLAY COM MÁSCARA SVG */}
            <div className="hero-overlay-mask">
                <svg
                    className="hero-svg-viewport"
                    viewBox="0 0 1000 500"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <mask id="madro-hero-mask">
                            {/* Retângulo branco cobre toda a tela com a cor de fundo */}
                            <rect width="100%" height="100%" fill="#ffffff" />

                            {/* Texto preto cria o furo transparente para revelar o vídeo */}
                            <g id="hero-zoom-target">
                                <text
                                    x="500"
                                    y="250"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className="hero-svg-text"
                                >
                                    {brandName}
                                </text>
                            </g>
                        </mask>
                    </defs>

                    {/* Renderiza a cor de fundo com o recorte aplicado */}
                    <rect
                        width="100%"
                        height="100%"
                        fill="#FDFBFB"
                        mask="url(#madro-hero-mask)"
                    />
                </svg>

                {/* Dica de Rolagem */}
                <div id="hero-scroll-hint" className="hero-scroll-hint">
                    <span>{scrollText}</span>
                </div>
            </div>
        </section>
    );
}