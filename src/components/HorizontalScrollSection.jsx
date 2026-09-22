import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from 'scrollreveal';
import '../css/HorizontalScrollSection.css';
import returnProducts from '../teste';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const watermarkBelowRef = useRef(null);
    const watermarkUpRef = useRef(null);
    const introTitleRef = useRef(null);
    const introTextRef = useRef(null);

    const response = returnProducts();
    const produtosList = response?.retorno?.produtos || [];

    useEffect(() => {
        // Revelação do título e descrição com ScrollReveal
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 300,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: true,
        });

        if (introTitleRef.current) sr.reveal(introTitleRef.current, { delay: 300 });
        if (introTextRef.current) sr.reveal(introTextRef.current, { delay: 300 });

        const ctx = gsap.context(() => {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const xTranslate = -(trackWidth - viewportWidth);

            // TIMELINE DE TRAVAMENTO E ROLAGEM ISOLADA
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: targetRef.current,
                    start: 'top top',         // Trava a seção assim que o topo toca o topo da viewport
                    end: () => `+=${trackWidth}`, // O tempo em que o scroll fica travado para mover o conteúdo
                    scrub: 1,                 // Sincroniza o movimento com a roda do mouse/touch
                    pin: true,                // Fixa a seção na tela enquanto o scroll acontece
                    pinSpacing: true,         // Garante o espaço vertical para continuar descendo a página depois
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Move a trilha de produtos na horizontal
            timeline.to(
                trackRef.current,
                {
                    x: xTranslate,
                    ease: 'none',
                },
                0
            );

            // Animação da marca d'água inferior (move para a esquerda)
            timeline.to(
                watermarkBelowRef.current,
                {
                    x: xTranslate * 1.2,
                    ease: 'none',
                },
                0
            );

            // Animação da marca d'água superior (move para a direita)
            timeline.to(
                watermarkUpRef.current,
                {
                    x: -xTranslate * 1.0,
                    ease: 'none',
                },
                0
            );
        }, targetRef);

        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            sr.destroy();
        };
    }, [produtosList]);

    return (
        <section className="horizontal-section" ref={targetRef}>
            <div className="watermark-text-up" ref={watermarkUpRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>

            <div className="horizontal-track" ref={trackRef}>
                <div className="intro-card">
                    <h2 ref={introTitleRef}>CONHEÇA NOSSO CATÁLOGO EXCLUSIVO</h2>
                    <p ref={introTextRef}>Garanta os seus favoritos da estação.</p>
                </div>

                {produtosList.map((item, index) => {
                    const { produto } = item;
                    const imagemSrc = produto.imagem && produto.imagem[0] ? produto.imagem[0].link : '';
                    const categoria = produto.categoria?.descricao || 'NOVIDADE';

                    return (
                        <div className="video-card" key={index}>
                            <div className="video-wrapper">
                                <img
                                    src={imagemSrc}
                                    alt={produto.descricao}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div className="card-details">
                                    <span className="card-badge">{categoria}</span>
                                    <button className="buy-btn">Ver Produtos</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="watermark-text-below" ref={watermarkBelowRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>
        </section>
    );
}