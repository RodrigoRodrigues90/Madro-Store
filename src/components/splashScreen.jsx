import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Preloader.css';

gsap.registerPlugin(ScrollTrigger);

export default function SplashScreen({ onComplete, brandName = "MADRO" }) {
    const splashRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    // Deteta alteração no tamanho da janela
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        let isFullyLoaded = false;
        let currentPercent = 0;

        // Animação final da SplashScreen
        const dismissPreloader = () => {
            const ctx = gsap.context(() => {
                const isMobileScreen = window.innerWidth < 768;
                const tl = gsap.timeline({
                    onComplete: () => {
                        document.body.style.overflow = 'auto';
                        ScrollTrigger.refresh();
                        if (onComplete) onComplete();
                    }
                });

                // 1. Esconde a porcentagem e a barra de carregamento
                tl.to(['.splash-progress-info', '#splash-loader-bar'], {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });

                // 2. Condição de Zoom: Apenas em dispositivos Mobile (< 768px)
                if (isMobileScreen) {
                    tl.to('#splash-zoom-target', {
                        scale: 85,
                        transformOrigin: '45.5% 50%',
                        duration: 1.8,
                        ease: 'power2.inOut'
                    }, '-=0.1');
                }

                // 3. Oculta suavemente a SplashScreen inteira
                tl.to(splashRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    pointerEvents: 'none',
                    ease: 'power2.out'
                }, isMobileScreen ? '-=0.6' : '-=0.1');
            }, splashRef);
        };

        // Simulação / acompanhamento do progresso de carregamento
        const interval = setInterval(() => {
            if (currentPercent < 90 || isFullyLoaded) {
                currentPercent += 1;
                setProgress(currentPercent);
            }

            if (currentPercent >= 100) {
                clearInterval(interval);
                dismissPreloader();
            }
        }, 15);

        const handlePageLoad = () => {
            isFullyLoaded = true;
        };

        if (document.readyState === 'complete') {
            isFullyLoaded = true;
        } else {
            window.addEventListener('load', handlePageLoad);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('load', handlePageLoad);
        };
    }, [onComplete]);

    // Cálculo do progresso da barra (160 a 0)
    const strokeDashoffset = 160 - (160 * progress) / 100;

    return (
        <div className="preloader-overlay" ref={splashRef}>
            <svg
                className="splash-svg-viewport"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
            >
                {isMobile ? (
                    <>
                        <defs>
                            <mask id="madro-splash-mask">
                                <rect width="100%" height="100%" fill="#ffffff" />
                                
                                <g id="splash-zoom-target">
                                    <text
                                        x="500"
                                        y="500"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className="splash-svg-text"
                                    >
                                        {brandName}
                                    </text>
                                </g>

                                <line
                                    id="splash-loader-bar"
                                    x1="420"
                                    y1="550"
                                    x2="580"
                                    y2="550"
                                    stroke="#000000"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray="160"
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </mask>
                        </defs>

                        <rect
                            width="100%"
                            height="100%"
                            fill="#fcbbc6ff"
                            mask="url(#madro-splash-mask)"
                        />
                    </>
                ) : (
                    <>
                        <rect width="100%" height="100%" fill="#ffffff" />

                        <g id="splash-zoom-target">
                            <text
                                x="500"
                                y="500"
                                textAnchor="middle"
                                dominantBaseline="central"
                                className="splash-svg-text"
                                style={{ fill: '#fcbbc6ff' }}
                            >
                                {brandName}
                            </text>
                        </g>

                        <line
                            id="splash-loader-bar"
                            x1="420"
                            y1="550"
                            x2="580"
                            y2="550"
                            stroke="#fcbbc6ff"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="160"
                            strokeDashoffset={strokeDashoffset}
                        />
                    </>
                )}
            </svg>

            <div className="splash-progress-info" style={{ color: '#000000' }}>
                <span>{progress}%</span>
            </div>
        </div>
    );
}