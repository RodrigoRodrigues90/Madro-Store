import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/header/logo.webp';
import '../css/Preloader.css';

gsap.registerPlugin(ScrollTrigger);

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const percentRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        let isFullyLoaded = false;
        let currentPercent = 0;

        // 1. O contador avança até 90% enquanto os recursos descarregam
        const interval = setInterval(() => {
            if (currentPercent < 90 || isFullyLoaded) {
                currentPercent += 1;
                setProgress(currentPercent);
            }

            // Quando atinge 100% (após o carregamento real confirmar)
            if (currentPercent >= 100) {
                clearInterval(interval);
                dismissPreloader();
            }
        }, 15);

        // 2. Escuta o carregamento REAL de todas as mídias do DOM (imagens, vídeos, fontes)
        const handlePageLoad = () => {
            isFullyLoaded = true;
        };

        if (document.readyState === 'complete') {
            isFullyLoaded = true;
        } else {
            window.addEventListener('load', handlePageLoad);
        }

        // 3. Animação de fecho com GSAP
        const dismissPreloader = () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        document.body.style.overflow = 'auto';
                        ScrollTrigger.refresh(); // Recalcula o GSAP após remover o preloader
                        if (onComplete) onComplete();
                    }
                });

                tl.to([logoRef.current, percentRef.current, '.preloader-bar-container'], {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in'
                })
                .to(preloaderRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut'
                });
            }, preloaderRef);
        };

        return () => {
            clearInterval(interval);
            window.removeEventListener('load', handlePageLoad);
        };
    }, [onComplete]);

    return (
        <div className="preloader-overlay" ref={preloaderRef}>
            <div className="preloader-content">
                <img src={logo} alt="MADRO" className="preloader-logo" ref={logoRef} />
                <div className="preloader-bar-container">
                    {/* A barra acompanha o estado de progresso dinâmico */}
                    <div 
                        className="preloader-bar" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                <span className="preloader-percent" ref={percentRef}>
                    {progress}%
                </span>
            </div>
        </div>
    );
}