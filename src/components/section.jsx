import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowDown, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import video from '../assets/backGround.mp4';
import '../css/section.css';

export default function HeroSection() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const badgeRef = useRef(null);
    const sloganRef = useRef(null);
    const ctaRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animação em sequência (Stagger / Timeline)
        tl.fromTo(
            badgeRef.current,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
        )
        .fromTo(
            titleRef.current,
            { scale: 0.8, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 1.2 },
            "-=0.4"
        )
        .fromTo(
            sloganRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.6"
        )
        .fromTo(
            ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.4"
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="hero-container">
            <video 
                className="hero-video" 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source 
                    src={video} 
                    type="video/mp4" 
                />
                Seu navegador não suporta vídeos HTML5.
            </video>
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <div ref={badgeRef} className="hero-badge">
                    <Sparkles size={16} className="badge-icon" />
                    <span>Coleção Exclusiva</span>
                </div>

                <h1 ref={titleRef} className="hero-title">
                    MADRO
                </h1>

                <p ref={sloganRef} className="hero-slogan">
                    Realce sua essência com o brilho dos detalhes.
                </p>

                <div ref={ctaRef} className="hero-actions">
                    <Link to="/Madro-Store/produtos" className="btn-primary">
                        <ShoppingBag size={18} />
                        Explorar Produtos
                    </Link>
                </div>
            </div>

            <a href="#produtos" className="scroll-indicator" aria-label="Rolar para baixo">
                <ArrowDown size={22} />
            </a>
        </section>
    );
}