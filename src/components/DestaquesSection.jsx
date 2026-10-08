import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Products from './produtos';
import '../css/DestaquesSection.css';

import { Sparkles, Sparkle, Crown } from 'lucide-react';

export default function DestaquesSection() {
    const wmBelowRef = useRef(null);

    // 1. Obtém o estado do Redux para todos os produtos
    const allProductsState = useSelector((state) => state.allProducts);

    // 2. Extrai o array 'produtos'
    const rawProducts = allProductsState?.produtos || [];

    // 3. Aplica filtragem dos itens com tags
    const taggedProducts = rawProducts.filter(item => Boolean(item?.tag?.trim()));

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

            <span className="horizontal-title"> NOSSAS NOVIDADES </span>
            <h2 className="horizontal-subtitle">Destaques da coleção</h2>

            <div className="products-container">
                {/* Grade em Colunas */}
                <div className="products-grid">
                    {taggedProducts.map((item, index) => {
                        const p = item?.produto || item;

                        return (
                            <div className="product-card-wrapper" key={p?.id || index}>
                                <Products
                                    foto={p?.foto || p?.imagem?.[0]?.link}
                                    tagProduct={p?.tag}
                                    nome={p?.nome || p?.descricao}
                                    valor={p?.valor ?? (parseFloat(p?.preco) || 0)}
                                    categoria={typeof p?.categoria === 'string' ? p?.categoria : p?.categoria?.descricao}
                                    descricao={p?.descricao || p?.descricaoCurta}
                                    descricaoComplementar={p?.descricaoComplementar}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='button-div'>
                <Link to='/Madro-Store/produtos'>
                    <button className='button-comprar'>Ver mais produtos</button>
                </Link>
            </div>
            <div className="watermark-wrapper">
                <div className="watermark-track" ref={wmBelowRef}>
                    {[1, 2].map((_, idx) => (
                        <div key={idx} className="watermark-item">
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