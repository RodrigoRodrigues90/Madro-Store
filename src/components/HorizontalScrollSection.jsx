import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScrollSection.css';
import returnProducts from '../teste'; // Importação da função que retorna os produtos

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const watermarkRef = useRef(null);

    // Carrega os dados da função returnProducts
    const response = returnProducts();
    const produtosList = response?.retorno?.produtos || [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const xTranslate = -(trackWidth - viewportWidth);

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: targetRef.current,
                    start: 'top top',
                    end: () => `+=${trackWidth}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            timeline.to(trackRef.current, {
                x: xTranslate,
                ease: 'none',
            });

            timeline.to(
                watermarkRef.current,
                {
                    x: xTranslate * 0.7,
                    ease: 'none',
                },
                0
            );
        }, targetRef);

        // Recalcula o layout do ScrollTrigger caso o DOM monte elementos assincronamente
        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, [produtosList]);

    return (
        <section className="horizontal-section" ref={targetRef}>
            <div className="watermark-text" ref={watermarkRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>

            <div className="horizontal-track" ref={trackRef}>
                <div className="intro-card">
                    <h2>Shop in Motion</h2>
                    <p>Explore o brilho em tempo real com nossas peças em movimento.</p>
                </div>

                {produtosList.map((item, index) => {
                    const { produto } = item;
                    
                    // Extração e tratamento da imagem e preço
                    const imagemSrc = produto.imagem && produto.imagem[0] ? produto.imagem[0].link : '';
                    const precoFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });
                    const categoria = produto.categoria?.descricao || 'NOVIDADE';

                    return (
                        <div className="video-card" key={index}>
                            <div className="video-wrapper">
                                <img
                                    src={imagemSrc}
                                    alt={produto.descricao}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <span className="card-badge">{categoria}</span>
                            </div>
                            <div className="card-details">
                                <h3>{produto.descricao}</h3>
                                <p className="price">{precoFormatado}</p>
                                <button className="buy-btn">Adicionar à Sacola</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}