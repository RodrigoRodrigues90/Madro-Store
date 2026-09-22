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
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 300,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: true,
        });

        if (introTitleRef.current) {
            sr.reveal(introTitleRef.current, { delay: 500 });
        }

        if (introTextRef.current) {
            sr.reveal(introTextRef.current, { delay: 500 });
        }

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

            // Scroll Horizontal da trilha
            timeline.to(
                trackRef.current,
                {
                    x: xTranslate,
                    ease: 'none',
                },
                0
            );

            // Watermark de baixo se move para a esquerda
            timeline.to(
                watermarkBelowRef.current,
                {
                    x: xTranslate * 0.7,
                    ease: 'none',
                },
                0
            );

            // Watermark de cima se move na direção oposta (direita -> esquerda sincronizada)
            timeline.to(
                watermarkUpRef.current,
                {
                    x: -xTranslate * 0.7,
                    ease: 'none',
                },
                0 // O parâmetro 0 garante que inicie junto no tempo zero da timeline
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