import '../css/paginaprodutos.css'
import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Overlay from '../components/overlay';
import Main from '../components/mainProducts'
import Header from '../components/header'
import Footer from '../components/footer'
import Produtos from '../components/produtos'
import Paralax from "../components/paralaxsection";
import Void from '../components/void';
import Siganos from '../components/siganos';

export default function PaginaProdutos() {
    //recuperando os valores dos produtos com Redux
    const { produtos } = useSelector((rootReducer) => rootReducer.allProducts)

    //===pega o estado do carrinho===//
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);

    //capturar a categoria pela URL 
    const { categorie } = useParams();
    //seta categoria ou produtos gerais
    const [categoria, setCategory] = useState();
    useEffect(() => {
        if (categorie == null ?
            setCategory("Produtos") : setCategory(categorie));
    }, [categorie])

    // "pesquisa" os produtos por nome e retorna a lista
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    useEffect(() => {
        if (categorie != null) {
            // Filtra os produtos com base na categoria
            const Filtro = produtos.filter(produto =>
                produto.categoria.toLowerCase().includes(categorie.toLowerCase())
            );
            setProdutosFiltrados(Filtro);
        } else {
            setProdutosFiltrados(produtos);
        }
    }, [categorie]);

    return (
        <>

            <Overlay isOpen={activeState} />
            <Header />
            <Void />
            <section className='main-content'>
                <div className='mid-content' >
                    <div className='title'>
                        <h1>{categoria}</h1>
                    </div>
                    <div className='content-wide-screen'>
                        {produtosFiltrados.map((produto, index) => (
                            <React.Fragment key={index}>
                                <Produtos
                                    foto={produto.foto}
                                    nome={produto.nome}
                                    valor={produto.valor}
                                    categoria={produto.categoria}
                                    descricao={produto.descricao}
                                    descricaoComplementar={produto.descricaoComplementar}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
            {/* componente swiper para telas mobile */}
            <div className='content-mobile'>
                <Main
                    titulo={categoria}
                    produtos={produtosFiltrados}
                />
            </div>
            <Void />
            <Paralax/>
            <Void />
            <Siganos />
            <Void />
            <Footer />
        </>
    )
}