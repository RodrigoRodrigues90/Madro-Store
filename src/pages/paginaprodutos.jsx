import { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import gsap from "gsap";
import loadProducts from '../api/api-bling';

import Overlay from '../components/overlay';
import Header from '../components/header';
import Products from '../components/produtos';
import Horizontal from "../components/HorizontalScrollSection";
import Newsletter from '../components/newsletter';
import Diferencial from '../components/diferenciais';
import Paralax from "../components/paralaxsection";
import Siganos from '../components/siganos';
import Footer from '../components/footer';
import Void from '../components/void';

export default function PaginaProdutos() {
    const dispatch = useDispatch();
    const titleRef = useRef(null);

    const allProductsState = useSelector((rootReducer) => rootReducer.allProducts);
    const produtos = Array.isArray(allProductsState)
        ? allProductsState
        : allProductsState?.produtos || [];

    useEffect(() => {
        if (produtos.length === 0) {
            loadProducts(dispatch);
        }
    }, [dispatch, produtos.length]);

    useEffect(() => {
        const titleElement = titleRef.current;
        if (!titleElement) return;
        const anim = gsap.fromTo(
            titleElement,
            {
                opacity: 0,
                x: -20,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: titleElement,
                    start: 'top 90%', // Dispara quando o topo do card atinge 88% da altura da viewport
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            // Limpa a animação e o ScrollTrigger ao desmontar o componente
            anim.kill();
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
        };
    }, []);

    const { activeState } = useSelector(({ cartReducer }) => cartReducer);

    const { categorie } = useParams();

    const categoriaTitulo = (categorie && categorie.toLowerCase() !== 'todos')
        ? categorie.toUpperCase()
        : "TODOS OS PRODUTOS";

    const produtosFiltrados = useMemo(() => {
        if (!categorie || categorie.toLowerCase() === 'todos' || categorie.toLowerCase() === 'all') {
            return produtos;
        }

        return produtos.filter(item => {
            const p = item?.produto || item;
            const nomeCategoria = typeof p?.categoria === 'object'
                ? p?.categoria?.descricao
                : p?.categoria;

            return nomeCategoria?.toLowerCase().includes(categorie.toLowerCase());
        });
    }, [categorie, produtos]);

    return (
        <>
            <Overlay isOpen={activeState} />
            <Header />
            <section className="page-products-container" style={{ marginTop: '4em' }}>
                <div className='products-container'>
                    <div ref={titleRef} >

                        <span className='horizontal-title'  style={{ lineHeight: '5em', backgroundColor: '#803141', color: '#fff', padding: '0.5em 1em',fontSize: '1em', fontFamily: 'serif',    borderRadius: '0.5em' }}>
                            {categoriaTitulo}
                        </span>
                    </div>
                    <div className="products-grid">
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map((item, index) => {
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
                            })
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#7a515c' }}>
                                <p>Nenhum produto encontrado para a categoria "{categorie}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Horizontal />
            <Diferencial />
            <Void />
            <Paralax />
            <Newsletter />
            <Siganos />
            <Footer />
        </>
    );
}