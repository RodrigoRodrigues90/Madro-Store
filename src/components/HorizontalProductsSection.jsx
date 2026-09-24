import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Products from './produtos';
import returnProducts from '../teste';
import '../css/horizontalProducts.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProductsSection() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const watermarkBelowRef = useRef(null);
    const watermarkUpRef = useRef(null);
    const introTitleRef = useRef(null);
    const introTextRef = useRef(null);

    const rawProducts = returnProducts().retorno.produtos;
    const productList = rawProducts.length < 5
        ? [...rawProducts, rawProducts[0]].slice(0, 5)
        : rawProducts.slice(0, 5);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1px)", () => {
            const track = trackRef.current;
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            // Valor negativo para puxar a trilha em direção à ESQUERDA
            const xTranslate = -(trackWidth - viewportWidth);
            const scrollDistance = Math.max(trackWidth * 1.5, viewportWidth * 1.5);

            // Garante que o ponto inicial é zerado (origem à direita da tela)
            gsap.set(track, { x: 0 });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: targetRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Revelação do Título
            timeline.fromTo(
                [introTitleRef.current, introTextRef.current],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.09, stagger: 0.1, ease: 'power2.out' },
                0
            );

            // Animação Direita -> Esquerda (x negativo)
            timeline.to(
                track,
                {
                    x: -xTranslate,
                    ease: 'power2.inOut',
                },
                0.2
            );

            // Marcas d'água
            timeline.to(
                watermarkBelowRef.current,
                { x: xTranslate * 0.4, ease: 'none' },
                0.2
            );

            timeline.to(
                watermarkUpRef.current,
                { x: -xTranslate * 0.4, ease: 'none' },
                0.2
            );
        });

        ScrollTrigger.refresh();

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section className="products-horizontal-section" ref={targetRef}>
            <div className="products-watermark-text-up" ref={watermarkUpRef}>
                MODA • DESTAQUES • MADRO •
            </div>

            <div className="products-horizontal-track" ref={trackRef}>

                <div className="products-scroll-end-spacer" />
                
                {productList.map((item, index) => {
                    const p = item.produto;
                    return (
                        <div className="product-card-container" key={index}>
                            <Products
                                foto={p.imagem[0].link}
                                nome={p.descricao}
                                valor={parseFloat(p.preco)}
                                categoria={p.categoria.descricao}
                                descricao={p.descricaoCurta}
                                descricaoComplementar={p.descricaoComplementar}
                            />
                        </div>
                    );
                })}
                
                <div className="products-intro-card">
                    <h2 ref={introTitleRef}>NOSSOS PRODUTOS EM ALTA</h2>
                    <p ref={introTextRef}>Descubra os destaques da loja.</p>
                </div>

            </div>

            <div className="products-watermark-text-below" ref={watermarkBelowRef}>
                MODA • DESTAQUES • MADRO •
            </div>
        </section>
    );
}