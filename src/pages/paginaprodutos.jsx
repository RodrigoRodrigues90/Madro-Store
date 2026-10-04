import '../css/paginaprodutos.css';
import '../css/HorizontalScrollSection.css';
import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import Overlay from '../components/overlay';
import Header from '../components/header';
import Products from '../components/produtos';
import Diferencial from '../components/diferenciais';
import Paralax from "../components/paralaxsection";
import Siganos from '../components/siganos';
import Footer from '../components/footer';
import Void from '../components/void';

export default function PaginaProdutos() {
    // Recupera produtos do Redux com fallback para array vazio
    const { produtos = [] } = useSelector((rootReducer) => rootReducer.allProducts);
    console.log("Produtos do Redux:", produtos); // Log para depuração
    // Estado do carrinho para o Overlay
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);

    // Captura a categoria pela URL
    const params = useParams();
    const categorie = params.categoria;

    // 1. Título da categoria
    const categoriaTitulo = categorie || "Produtos";

    // 2. Filtro de Produtos Corrigido
    const produtosFiltrados = useMemo(() => {
        if (!categorie) return produtos;

        return produtos.filter(item => {
            // Garante o acesso correto quer o objeto seja 'item.produto' ou 'item'
            const p = item.produto || item;
            
            // Obtém a string da categoria (seja objeto com .descricao ou string direta)
            const nomeCategoria = typeof p.categoria === 'object' 
                ? p.categoria?.descricao 
                : p.categoria;

            return nomeCategoria?.toLowerCase().includes(categorie.toLowerCase());
        });
    }, [categorie, produtos]);

    return (
        <>
            <Overlay isOpen={activeState} />
            <Header />
            <Void />

            <section className='main-content'>
                <div className='mid-content'>
                    <span className='horizontal-title'>
                        {categoriaTitulo}
                    </span>
                   <div className="products-grid">
                    {produtosFiltrados.map((item, index) => {
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
            </section>
            <Void/>
            <Diferencial />
            <Void/>
            <Paralax />
            <Void/>
            <Siganos />
            <Void />

            <Footer />
        </>
    );
}