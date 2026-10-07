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

export default function Hero() {
    const trackRef = useRef(null);

    useGSAP(() => {
        if (!trackRef.current) return;

        gsap.to(trackRef.current, {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1,
        });
    }, { scope: trackRef });

    return (
        <section className="hero-section">
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
                    <Link to="/Madro-Store/Allprodutos" className="hero-cta-button">
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