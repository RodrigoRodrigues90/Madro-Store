import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import videoBg from '../assets/backGround.mp4';
import '../css/heroSection.css';

export default function HeroSection({ isLoaded = false }) {
    const heroWrapperRef = useRef(null);

    useEffect(() => {
        // Dispara apenas quando a SplashScreen for concluída (isLoaded = true)
        if (!isLoaded) return;

        const wrapper = heroWrapperRef.current;
        if (!wrapper) return;
        const headerElement = document.querySelector('header');

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // 1. Entrada do Header da página (se existir)
            if (headerElement) {
                tl.fromTo(
                    headerElement,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.6 }
                );
            }

            // 2. Animação Stagger nos textos (Nova -> Coleção -> Verão☼)
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
                    stagger: 0.22,
                    duration: 0.9,
                },
                headerElement ? '-=0.3' : 0
            );

            // 3. Revelação do indicador "VER MAIS" + Scroll Bounce
            tl.fromTo(
                '#hero-scroll-hint',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.2'
            );

            // Loop contínuo de Bounce para a seta/indicador de scroll
            gsap.to('.hero-scroll-icon', {
                y: 8,
                repeat: -1,
                yoyo: true,
                duration: 0.75,
                ease: 'power1.inOut',
            });

        }, wrapper);

        return () => ctx.revert();
    }, [isLoaded]);

    return (
        <section ref={heroWrapperRef} className="hero-container">
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

                {/* Subtítulo da Coleção */}
                <div id="subtitle-hero" className="subtitle-hero">
                    <span className="hero-text-item">Nova</span>
                    <br />
                    <span className="hero-text-item">Coleção</span>
                    <br />
                    <span className="hero-text-item">Verão☼</span>
                </div>

                {/* Elemento VER MAIS com efeito Bounce */}
                <div id="hero-scroll-hint" className="hero-scroll-hint">
                    <span className="hero-scroll-text">VER MAIS</span>
                    <span className="hero-scroll-icon">↓</span>
                </div>
            </div>
        </section>
    );
}