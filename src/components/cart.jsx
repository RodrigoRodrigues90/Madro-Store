import '../css/cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Truck } from 'lucide-react';

import ItemCart from '../components/itemcart.jsx';
import actionTypes from '../Redux/cart/actiontype';
import calculateFrete from '../api/api-correios';
import ItemFrete from '../components/itemfrete';
import Loading from '../components/loading';

export default function Cart() {
    // === Pega o estado do carrinho === //
    const { valorFrete, frete, produtos = [], activeState } = useSelector(({ cartReducer }) => cartReducer);
    const shippingServices = frete?.data?.ShippingSevicesArray || [];

    // === Altera o estado de ativo/desativo do menu do carrinho === //
    const dispatch = useDispatch();
    const changeActiveState = () => {
        dispatch({
            type: actionTypes.active,
        });
    };

    // ===== Cálculo de subtotal =========== //
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        // Calcula subtotal quando a lista de produtos se altera
        const newSubtotal = (produtos.length > 0 ? produtos.reduce((acc, item) => acc + item.valorsomado, 0) : 0);
        setSubtotal(newSubtotal);
    }, [produtos]);

    // Soma o subtotal com o valor de frete selecionado
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(parseFloat(valorFrete || 0) + parseFloat(subtotal || 0));
    }, [subtotal, valorFrete]);

    // === String de CEP escrita no input === //
    const [cep, setCep] = useState("");
    const handleCepChange = (event) => {
        setCep(event.target.value);
    };

    // === Formatar strings de preço === //
    function formString(string) {
        return string.replace('.', ',');
    }

    const [isloading, setloading] = useState(false);
    const [res, setResponse] = useState(null);

    const changeRes = (response) => {
        setResponse(response);
    };

    const sendToFetch = async () => {
        try {
            dispatch({
                type: actionTypes.VALORFRETE,
                payload: 0
            });
            setloading(true);
            const response = await calculateFrete(dispatch, cep);
            changeRes(response);
        } catch (e) {
            console.log(e);
        } finally {
            setloading(false);
        }
    };

    return (
        <section>
            <div id="cart-screen" className={activeState ? "show-cart" : "wrapper-cart-screen"}>
                {/* Header do Carrinho */}
                <div className='header-cart'>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <ShoppingBag size={20} color="#f7d2db" />
                        <h1>Minhas compras</h1>
                    </div>
                    <button onClick={changeActiveState} aria-label="Fechar carrinho">
                        <X size={22} />
                    </button>
                </div>

                {produtos.length === 0 ? (
                    /* ESTADO VAZIO: Ilustração & Mensagem Editorial */
                    <div className="cart-empty-state">
                        <svg
                            className="cart-empty-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>

                        <h3>Seu carrinho está vazio</h3>
                        <Link to="/Madro-Store/produtos" onClick={changeActiveState} className="btn-shop-now">
                            Ver Coleção
                        </Link>
                    </div>
                ) : (
                    /* CONTEÚDO COM ITENS NO CARRINHO */
                    <>
                        <div className='cart-wrapper-products'>
                            {produtos.map((product) => (
                                <ItemCart
                                    key={product.id}
                                    image={product.foto}
                                    descricao={product.nome}
                                    valor={product.valor}
                                    unidades={product.unidades}
                                    id={product.id}
                                />
                            ))}
                        </div>

                        {/* Subtotal */}
                        <div className='subtotal-Wrapper-div'>
                            <div className='subtotal-content'>
                                <span>Subtotal (sem frete):</span>
                                <span>R${formString(subtotal.toFixed(2).toString())}</span>
                            </div>
                        </div>

                        {/* Cálculo de Frete */}
                        <div className='fretecalc-wrapper-div'>
                            <div className='fretecalc-content'>
                                <div className='linha'>
                                    <p><Truck size={18} /> Meios de envio</p>
                                </div>
                                <div className='input-fretecalc-div'>
                                    <input
                                        className="input-fretecalc"
                                        onChange={handleCepChange}
                                        type="text"
                                        placeholder='Digite seu CEP'
                                    />
                                    <button className='button-fretecalc' onClick={sendToFetch}>
                                        CALCULAR
                                    </button>
                                </div>
                                <a href='https://buscacepinter.correios.com.br/app/endereco/index.php' target='_blank' rel='noopener noreferrer'>
                                    Não sei meu CEP
                                </a>
                            </div>
                        </div>

                        {/* Opções de Frete */}
                        <div className='frete-options-wrapper'>
                            {isloading && <Loading />}

                            {frete?.servicos && frete.servicos[2]?.ShippingPrice && (
                                <ItemFrete
                                    prazo={frete.servicos[2].DeliveryTime}
                                    valor={frete.servicos[2].ShippingPrice}
                                    nome={frete.servicos[2].ServiceDescription}
                                />
                            )}
                            {frete?.servicos && frete.servicos[0]?.ShippingPrice && (
                                <ItemFrete
                                    prazo={frete.servicos[0].DeliveryTime}
                                    valor={frete.servicos[0].ShippingPrice}
                                    nome={frete.servicos[0].ServiceDescription}
                                />
                            )}

                            {res && !isloading && shippingServices.length === 0 && (
                                <p style={{
                                    color: "#ae325b",
                                    padding: "0.5em",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    fontSize: "0.85rem"
                                }}>
                                    Verifique o CEP digitado.
                                </p>
                            )}

                            <p style={{ fontSize: "11px", opacity: 0.8, marginTop: "8px" }}>
                                O prazo de entrega <strong>não contabiliza feriados.</strong>
                            </p>
                        </div>

                        {/* Resumo Final & Checkout */}
                        <div className='payment-wrapper'>
                            <div className='price-wrapper'>
                                <span>Total:</span>
                                <div style={{ textAlign: 'end' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        R${formString(total.toFixed(2).toString())}
                                    </span>
                                    <p style={{ fontSize: '0.78rem', margin: '4px 0 0 0', opacity: 0.85 }}>
                                        ou até 3x de <strong>R${formString((total / 3).toFixed(2).toString())}</strong> sem juros
                                    </p>
                                </div>
                            </div>
                            <div className='button-div-payment'>
                                <button disabled={produtos.length === 0} className='button-comprar'>
                                    IR PARA PAGAMENTO
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}