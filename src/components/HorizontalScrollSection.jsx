import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/HorizontalScrollSection.css';

// Importação direta dos vídeos
import oculosVideo from '../assets/oculos.mp4';
import pulseirasVideo from '../assets/pulseira.mp4';
import aneisVideo from '../assets/aneis.mp4';
import colaresVideo from '../assets/colares.mp4';
import brincosVideo from '../assets/brincos.mp4';

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
    const trackRef = useRef(null);
    const tweenRef = useRef(null);
    const wmUpRef = useRef(null);
    const wmBelowRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        const wmUp = wmUpRef.current;
        const wmBelow = wmBelowRef.current;
        if (!track) return;

        const ctx = gsap.context(() => {
            // 1. Carrossel de produtos (Esquerda)
            tweenRef.current = gsap.to(track, {
                xPercent: -50,
                ease: 'none',
                duration: 30,
                repeat: -1,
            });

            // 2. Marca d'água Superior (Movimento para a Esquerda)
            if (wmUp) {
                gsap.to(wmUp, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 35,
                    repeat: -1,
                });
            }

            // 3. Marca d'água Inferior (Movimento oposto: Direita)
            if (wmBelow) {
                gsap.fromTo(
                    wmBelow,
                    { xPercent: -50 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        duration: 35,
                        repeat: -1,
                    }
                );
            }
        }, track);

        return () => ctx.revert();
    }, []);

    // Pausa a rolagem no hover
    const handleMouseEnter = () => tweenRef.current?.pause();
    const handleMouseLeave = () => tweenRef.current?.play();

    const watermarkText = "COLEÇÃO • EM MOVIMENTO • MADRO • ";

    return (
        <section className="horizontal-section">
            {/* Marca d'água Superior (Desliza para a esquerda) */}
            <div className="watermark-container watermark-up">
                <div className="watermark-track" ref={wmUpRef}>
                    <span>{watermarkText.repeat(3)}</span>
                    <span>{watermarkText.repeat(3)}</span>
                </div>
            </div>

            {/* Trilha de Cards do Catálogo */}
            <div
                className="horizontal-track"
                ref={trackRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* SET 1 */}
                <div className="intro-card">
                    <h2>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                    <p>Garanta os seus favoritos da estação.</p>
                </div>

                {produtosManuais.map((item) => (
                    <div className="video-card" key={`set1-${item.id}`}>
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

                {/* SET 2 (Duplicado para loop perfeito) */}
                <div className="intro-card">
                    <h2>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                    <p>Garanta os seus favoritos da estação.</p>
                </div>

                {produtosManuais.map((item) => (
                    <div className="video-card" key={`set2-${item.id}`}>
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
            </div>

            {/* Marca d'água Inferior (Desliza para a direita) */}
            <div className="watermark-container watermark-below">
                <div className="watermark-track" ref={wmBelowRef}>
                    <span>{watermarkText.repeat(3)}</span>
                    <span>{watermarkText.repeat(3)}</span>
                </div>
            </div>
        </section>
    );
}