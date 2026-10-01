import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Products from './produtos';
import returnProducts from '../teste';
import '../css/ProductsSection.css';

import { Sparkles, Sparkle, Crown } from 'lucide-react'

export default function HorizontalProductsSection() {
    const wmBelowRef = useRef(null);

    // Obtém os produtos 
    const rawProducts = returnProducts()?.retorno?.produtos || [];
    const taggedProducts = rawProducts.filter(item => Boolean(item?.produto?.tag?.trim()));
    const productList = taggedProducts.length < 5
        ? [...taggedProducts, taggedProducts[0]].slice(0, 6)
        : taggedProducts.slice(0, 8);

    useEffect(() => {

        const wmBelow = wmBelowRef.current;

        const ctx = gsap.context(() => {
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

    return (
        <section className="products-grid-section">
            <div className="footer-divider" />

            {/* <div className="title-wrapper"> */}
            <span className="horizontal-title"> NOSSAS NOVIDADES  </span>
            <h2 className="horizontal-subtitle">Destaques da coleção</h2>
            {/* </div> */}
            <div className="products-container">
                {/* Grade em Colunas */}
                <div className="products-grid">
                    {productList.map((item, index) => {
                        const p = item.produto;
                        return (
                            <div className="product-card-wrapper" key={p.id || index}>
                                <Products
                                    foto={p.imagem?.[0]?.link}
                                    tagProduct={p.tag}
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

            <div className='button-div'>
                <button className='button-comprar'>Ver mais produtos</button>
            </div>

            <div className="watermark-wrapper">
                <div className="watermark-track" ref={wmBelowRef}>
                    {/* Bloco 1 e Bloco 2 para o loop perfeito do GSAP */}
                    {[1, 2].map((_, idx) => (
                        <div key={idx} className="watermark-item">
                            {/* Repetição interna para garantir largura maior que 100vw */}
                            {[...Array(4)].map((_, itemIdx) => (
                                <span key={itemIdx} className="watermark-content">
                                    <Sparkles size={20} strokeWidth={1.8} />
                                    <span>DESTAQUES</span>
                                    <Sparkle size={20} strokeWidth={1.8} />
                                    <span>EM MOVIMENTO</span>
                                    <Crown size={20} strokeWidth={1.8} />
                                    <span>MADRO</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-divider" />
        </section>
    );
}