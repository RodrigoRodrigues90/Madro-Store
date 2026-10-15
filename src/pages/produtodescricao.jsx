import '../css/produtodescricao.css';
import '../css/HorizontalScrollSection.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Percent } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import Overlay from '../components/overlay';
import Header from '../components/header';
import Void from '../components/void';
import Products from '../components/produtos';
import Siganos from '../components/siganos';
import Footer from '../components/footer';
import cartActionTypes from "../Redux/cart/actiontype";
import Diferencial from '../components/diferenciais';

export default function ProdutoDescrito() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [loading, setLoading] = useState(false);

    // Recupera o produto selecionado do Redux
    const { produto } = useSelector((rootReducer) => rootReducer.productReducer);

    // Proteção contra perda de estado caso a página seja recarregada diretamente (F5)
    useEffect(() => {
        if (!produto || (!produto.nome && !produto.descricao)) {
            navigate('/Madro-Store/produtos');
        }
    }, [produto, navigate]);

    const valor = parseFloat(produto?.valor || produto?.preco) || 0;

    // Cálculos de parcelamento
    let valorParcelado = valor / 3;
    let valorParceladoFormatado = valorParcelado.toFixed(2).replace('.', ',');
    let valorFormatado = valor.toFixed(2).replace('.', ',');

    // Recupera todos os produtos do Redux para filtrar os relacionados
    const allProductsState = useSelector((rootReducer) => rootReducer.allProducts);
    const produtosList = Array.isArray(allProductsState)
        ? allProductsState
        : allProductsState?.produtos || [];

    const [produtosRelacionados, setProdutosRelacionados] = useState([]);
    console.log('Produtos relacionados:', produtosRelacionados);

    // Filtra produtos relacionados com base na categoria
    useEffect(() => {
        if (!produto || produtosList.length === 0) return;

        // Captura o objeto interno do produto se existir
        const rawProduto = produto?.produto || produto;

        // Extrai a string da categoria (suporta objeto com .descricao ou string direta)
        const categoriaAtual = typeof rawProduto?.categoria === 'object'
            ? rawProduto?.categoria?.descricao
            : rawProduto?.categoria;

        const produtoIdAtual = rawProduto?.id || rawProduto?.nome || rawProduto?.descricao;

        // 1. Tenta filtrar por produtos da mesma categoria (excluindo o produto atual)
        let filtrados = produtosList.filter(item => {
            const p = item?.produto || item;
            const catItem = typeof p?.categoria === 'object'
                ? p?.categoria?.descricao
                : p?.categoria;

            const pId = p?.id || p?.nome || p?.descricao;

            const mesmaCategoria = categoriaAtual && catItem &&
                catItem.toLowerCase().includes(categoriaAtual.toLowerCase());

            return mesmaCategoria && pId !== produtoIdAtual;
        });

        // 2. Fallback: Se não encontrar itens da mesma categoria, exibe outros produtos da loja
        if (filtrados.length === 0) {
            filtrados = produtosList.filter(item => {
                const p = item?.produto || item;
                const pId = p?.id || p?.nome || p?.descricao;
                return pId !== produtoIdAtual;
            });
        }

        setProdutosRelacionados(filtrados.slice(0, 4));
    }, [produto, produtosList]);

    // Unidades de produto para o carrinho
    const [unidades, setUnidades] = useState(1);
    useEffect(() => {
        setUnidades(1);
    }, [produto]);

    function subtrairUnidade() {
        if (unidades > 1) {
            setUnidades(unidades - 1);
        }
    }
    function adicionarUnidade() {
        setUnidades(unidades + 1);
    }

    // Enviar produto para o carrinho
    const foto = produto?.foto || produto?.imagem?.[0]?.link;
    const nome = produto?.nome || produto?.descricao;

    const sendToCart = () => {
        setLoading(true);
        dispatch({
            type: cartActionTypes.POST,
            payload: { foto, nome, valor, unidades }
        });
        setTimeout(() => {
            setLoading(false);
            dispatch({ type: cartActionTypes.activeMSG });
        }, 2000);
    };

    if (!produto || (!produto.nome && !produto.descricao)) return null;

    return (
        <>
            <Overlay isOpen={activeState} />
            <Header />
            <section>
                <div className="content-wrapper-descricao">
                    <div className='image-produto-descricao'>
                        <img src={foto} alt={nome} />
                    </div>
                    <div className='descricao-produto'>
                        <h1>{nome}</h1>
                        <h3>R$ {valorFormatado}</h3>
                        <p>
                            <span><CreditCard size={20} style={{ color: '#b53a62', marginRight: '6px' }} /></span>
                            3x de&nbsp;<strong>R$ {valorParceladoFormatado} sem juros</strong>.
                        </p>
                        <p>
                            <span><Percent size={20} style={{ color: '#b53a62', marginRight: '6px' }} /></span>
                            Desconto especial pagando no Pix.
                        </p>
                        <p>
                            <strong>Atenção, últimas peças!</strong>
                        </p>
                        <div className='buttons-wrapper'>
                            <div className='buttons-quantidade'>
                                <button onClick={subtrairUnidade}>-</button>
                                <div className='qtd'> {unidades} </div>
                                <button onClick={adicionarUnidade}>+</button>
                            </div>

                            {
                                loading ?
                                    <div className="loading-spinner">
                                        <div className="spinner"></div>
                                    </div>
                                    :
                                    <button
                                        id="botaoCompra"
                                        onClick={sendToCart}
                                        className={!loading ? "button-comprar" : "button-loading"}
                                        disabled={loading}
                                    >
                                        ADICIONAR AO CARRINHO
                                    </button>
                            }
                        </div>
                    </div>
                </div>

                <section>
                    <div className='descricao-detalhada'>
                        <div className='campo-medidas'>
                            <p dangerouslySetInnerHTML={{ __html: produto.descricao || produto.descricaoCurta || '' }} />
                            <br />
                            <p dangerouslySetInnerHTML={{ __html: produto.descricaoComplementar || '' }} />
                        </div>
                    </div>
                </section>
                <Void />

                {produtosRelacionados.length > 0 && (
                    <section className='section-relacionados'>
                        <div className='horizontal-scroll-container'>
                            <span className='horizontal-title'>PRODUTOS RELACIONADOS</span>

                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={24}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                breakpoints={{
                                    640: { slidesPerView: 2, spaceBetween: 20 },
                                    900: { slidesPerView: 3, spaceBetween: 24 },
                                    1200: { slidesPerView: 4, spaceBetween: 28 },
                                }}
                                className="products-swiper"
                            >
                                {produtosRelacionados.map((item, index) => {
                                    const p = item?.produto || item;
                                    return (
                                        <SwiperSlide key={p?.id || index}>
                                            <div className="product-card-wrapper">
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
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </section>
                )}

            </section>
            <Void />
            <Diferencial />
            <Void />
            <Siganos />
            <Footer />
        </>
    );
}