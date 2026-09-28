import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/HorizontalScrollSection.css';

// Importação direta dos arquivos WebP
import oculosWebp from '../assets/oculos.webp';
import pulseirasWebp from '../assets/pulseiras.webp';
import aneisWebp from '../assets/aneis.webp';
import colaresWebp from '../assets/colares.webp';
import brincosWebp from '../assets/brincos.webp';

const produtosManuais = [
    { id: 1, categoria: 'ÓCULOS', imgSrc: oculosWebp },
    { id: 2, categoria: 'PULSEIRAS', imgSrc: pulseirasWebp },
    { id: 3, categoria: 'ANÉIS', imgSrc: aneisWebp },
    { id: 4, categoria: 'COLARES', imgSrc: colaresWebp },
    { id: 5, categoria: 'BRINCOS', imgSrc: brincosWebp },
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
            // 1. Carrossel Infinito de Produtos
            tweenRef.current = gsap.to(track, {
                xPercent: -50,
                ease: 'none',
                duration: 25,
                repeat: -1,
                force3D: true,
            });

            // 2. Marca d'água Superior (Esquerda)
            if (wmUp) {
                gsap.to(wmUp, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 32,
                    repeat: -1,
                });
            }

            // 3. Marca d'água Inferior (Direita)
            if (wmBelow) {
                gsap.fromTo(
                    wmBelow,
                    { xPercent: -50 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        duration: 32,
                        repeat: -1,
                    }
                );
            }
        }, track);

        return () => ctx.revert();
    }, []);

    // Pausa no Hover / Toque
    const handleMouseEnter = () => tweenRef.current?.pause();
    const handleMouseLeave = () => tweenRef.current?.play();

    const watermarkText = "COLEÇÃO • EM MOVIMENTO • MADRO • ";

    return (
        <section className="horizontal-section">
            {/* Marca d'água Superior */}
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
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
            >
                {/* LOTE 1 */}
                <div className="intro-card">
                    <div className="intro-content">
                        <h2>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                        <p>Garanta os seus favoritos da estação.</p>
                    </div>
                </div>

                {produtosManuais.map((item) => (
                    <div className="video-card" key={`set1-${item.id}`}>
                        <div className="video-wrapper">
                            <img
                                src={item.imgSrc}
                                alt={`Categoria ${item.categoria}`}
                                loading="eager"
                            />
                            <span className="card-badge">{item.categoria}</span>
                            <div className="card-details">
                                <button className="buy-btn">Ver Produtos</button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* LOTE 2 (Loop contínuo sem emendas) */}
                <div className="intro-card">
                    <div className="intro-content">
                        <h2>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                        <p>Garanta os seus favoritos da estação.</p>
                    </div>
                </div>

                {produtosManuais.map((item) => (
                    <div className="video-card" key={`set2-${item.id}`}>
                        <div className="video-wrapper">
                            <img
                                src={item.imgSrc}
                                alt={`Categoria ${item.categoria}`}
                                loading="lazy"
                            />
                            <span className="card-badge">{item.categoria}</span>
                            <div className="card-details">
                                <button className="buy-btn">Ver Produtos</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Marca d'água Inferior */}
            <div className="watermark-container watermark-below">
                <div className="watermark-track" ref={wmBelowRef}>
                    <span>{watermarkText.repeat(3)}</span>
                    <span>{watermarkText.repeat(3)}</span>
                </div>
            </div>
        </section>
    );
}