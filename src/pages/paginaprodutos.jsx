import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import loadProducts from '../api/api-bling';

import Overlay from '../components/overlay';
import Header from '../components/header';
import HeroSections from '../components/heroSection';
import Products from '../components/produtos';
import Diferencial from '../components/diferenciais';
import Paralax from "../components/paralaxsection";
import Siganos from '../components/siganos';
import Footer from '../components/footer';
import Void from '../components/void';

export default function PaginaProdutos() {
    const dispatch = useDispatch();

    const allProductsState = useSelector((rootReducer) => rootReducer.allProducts);
    const produtos = Array.isArray(allProductsState)
        ? allProductsState
        : allProductsState?.produtos || [];

    useEffect(() => {
        if (produtos.length === 0) {
            loadProducts(dispatch);
        }
    }, [dispatch, produtos.length]);

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
            <HeroSections/>
            <Void/>
            <section className="page-products-container">
                <div className="footer-divider"></div>
                <div className='products-container'>
                    <span className='horizontal-title' style={{ lineHeight: '7em', backgroundColor: '#742a39', color: '#fff', padding: '0.5em 1em', borderRadius: '0.5em' }}>
                        {categoriaTitulo}
                    </span>
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
            <Void />
            <Diferencial />
            <Void />
            <Paralax />
            <Void />
            <Siganos />
            <Void />

            <Footer />
        </>
    );
}