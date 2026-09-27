import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Products from './produtos';
import returnProducts from '../teste';
import '../css/horizontalProducts.css';

export default function HorizontalProductsSection() {
    const wmUpRef = useRef(null);
    const wmBelowRef = useRef(null);

    // Obtém os produtos via função mantendo 
    const rawProducts = returnProducts()?.retorno?.produtos || [];
    const productList = rawProducts.length < 5
        ? [...rawProducts, rawProducts[0]].slice(0, 6)
        : rawProducts.slice(0, 8);

    useEffect(() => {
        const wmUp = wmUpRef.current;
        const wmBelow = wmBelowRef.current;

        const ctx = gsap.context(() => {
            if (wmUp) {
                gsap.to(wmUp, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 40,
                    repeat: -1,
                });
            }

            if (wmBelow) {
                gsap.fromTo(
                    wmBelow,
                    { xPercent: -50 },
                    { xPercent: 0, ease: 'none', duration: 40, repeat: -1 }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const watermarkText = "MODA • DESTAQUES • MADRO • ";

    return (
        <section className="products-grid-section">
            {/* Marca d'água Superior */}
            <div className="products-watermark watermark-up">
                <div className="watermark-track" ref={wmUpRef}>
                    <span>{watermarkText.repeat(3)}</span>
                    <span>{watermarkText.repeat(3)}</span>
                </div>
            </div>

            <div className="products-container">
                {/* Cabeçalho do Bloco */}
                <div className="products-intro-header">
                    <h2>NOSSOS PRODUTOS EM ALTA</h2>
                    <p>Descubra os destaques da loja.</p>
                </div>

                {/* Grade em Colunas */}
                <div className="products-grid">
                    {productList.map((item, index) => {
                        const p = item.produto;
                        return (
                            <div className="product-card-wrapper" key={p.id || index}>
                                <Products
                                    foto={p.imagem?.[0]?.link}
                                    nome={p.descricao}
                                    valor={parseFloat(p.preco)}
                                    categoria={p.categoria?.descricao}
                                    descricao={p.descricaoCurta}
                                    descricaoComplementar={p.descricaoComplementar}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Marca d'água Inferior */}
            <div className="products-watermark watermark-below">
                <div className="watermark-track" ref={wmBelowRef}>
                    <span>{watermarkText.repeat(3)}</span>
                    <span>{watermarkText.repeat(3)}</span>
                </div>
            </div>
        </section>
    );
}