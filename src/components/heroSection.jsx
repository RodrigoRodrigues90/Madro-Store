import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, CreditCard, Tag, Gift } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import bannerVideo from '../assets/video.mp4';
import '../css/heroSection.css';

const promoItems = [
    { id: 1, icon: <CreditCard size={22} />, text: 'Parcele em até 3x sem juros' },
    { id: 2, icon: <Tag size={22} />, text: '10% OFF em pagamentos no pix' },
    { id: 3, icon: <Gift size={22} />, text: 'Embalagens personalizadas para presentear' },
];

export default function Hero({ isSplashFinished = false }) {
    const heroRef = useRef(null);
    const trackRef = useRef(null);

    useGSAP(() => {
        // 1. Barra Promocional Infinita (Marquee)
        if (trackRef.current) {
            gsap.to(trackRef.current, {
                xPercent: -50,
                ease: 'none',
                duration: 20,
                repeat: -1,
            });
        }

        // 2. Se a Splash Screen ainda NÃO terminou, mantém os elementos escondidos
        if (!isSplashFinished) {
            gsap.set(['.hero-subtitle', '.hero-title', '.hero-description', '.hero-cta-button'], {
                opacity: 0,
                y: 30,
            });
            return;
        }

        // 3. Quando isSplashFinished === true, executa a animação de entrada
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 0.9,
            },
        });

        tl.to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            delay: 0.2, // Pequeno delay após a remoção da splash screen
        })
        .to('.hero-title', {
            y: 0,
            opacity: 1,
        }, '-=0.6')
        .to('.hero-description', {
            y: 0,
            opacity: 1,
        }, '-=0.6')
        .to('.hero-cta-button', {
            y: 0,
            opacity: 1,
            scale: 1,
        }, '-=0.9');

    }, { scope: heroRef, dependencies: [isSplashFinished] });

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="hero-banner-container">
                <video
                    src={bannerVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-banner-video"
                />
                <div className="hero-banner-overlay">
                    <span className="hero-subtitle">LANÇAMENTO</span>
                    <h1 className="hero-title">
                        Nova Coleção Verão <Sun size={28} color="#ffffff" />
                    </h1>
                    <p className='hero-description'>Conheça a exclusividade MADRO</p>
                    <Link to="/Madro-Store/produtos" className="hero-cta-button">
                        VER MAIS
                    </Link>
                </div>
            </div>

            {/* BARRA PROMOCIONAL INFINITA */}
            <div className="hero-off-conteiner">
                <div className="hero-off-track" ref={trackRef}>
                    {/* LOTE 1 */}
                    <div className="hero-off-wrapper">
                        {promoItems.map((item) => (
                            <span key={`lote1-${item.id}`}>
                                {item.icon}
                                {item.text}
                            </span>
                        ))}
                    </div>

                    {/* LOTE 2 (Duplicado para garantir o loop contínuo sem emendas) */}
                    <div className="hero-off-wrapper">
                        {promoItems.map((item) => (
                            <span key={`lote2-${item.id}`}>
                                {item.icon}
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}