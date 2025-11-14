import '../css/cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import bag from '../assets/header/bag.png'
import truck from '../assets/section/truck.svg'
import menu from '../assets/header/close.svg'
import ItemCart from '../components/itemcart.jsx'
import actionTypes from '../Redux/cart/actiontype'
import calculateFrete from '../api/api-correios'
import ItemFrete from '../components/itemfrete'
import warning from '../assets/header/warning.svg'
import Loading from '../components/loading';


export default function cart() {
    //===pega o estado do carrinho===//
    const { valorFrete, frete, produtos = [], activeState } = useSelector(({ cartReducer }) => cartReducer);
    const shippingServices = frete?.data?.ShippingSevicesArray || [];

    // ===altera o estado de ativo/desativo do menu do carrinho de compras===//
    const dispatch = useDispatch();
    const changeActiveState = () => {
        dispatch({
            type: actionTypes.active,
        })
    }
    //===================================//

    //=====calculo de subtotal===========//
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        // Calcula subtotal quando a lista de produtos se altera
        const newSubtotal = (produtos.length > 0 ? produtos.reduce((acc, item) => acc + item.valorsomado, 0) : 0);
        setSubtotal(newSubtotal);
    }, [produtos]);
    // soma o subtotal com o valor de frete selecionado
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(parseFloat(valorFrete) + parseFloat(subtotal))
    }, [subtotal, valorFrete])
    //===================================//

    //===string de cep escrita no input===//
    const [cep, setCep] = useState("");
    const handleCepChange = (event) => {
        setCep(event.target.value);
    };
    //====================================//

    //===formatar strings de preço===//
    function formString(string) {
        return string.replace('.', ',');
    }
    //===============================//

    const [isloading, setloading] = useState(false);
    const [res, setResponse] = useState(null)

    const changeRes = (response) => {
        setResponse(response)
    }
    const sendToFetch = async () => {
        try {
            dispatch({
                type: actionTypes.VALORFRETE,
                payload: 0
            });
            setloading(true);
            const response = await calculateFrete(dispatch, cep);
            changeRes(response)
        } catch (e) {
            console.log(e)
        } finally {
            setloading(false);
        }
    }
    return (
        <section>
            <div id="cart-screen" className={activeState ? "show-cart" : "wrapper-cart-screen"}>
                <div className='header-cart'>
                    <button onClick={changeActiveState} className='menu-div-mobile'>
                        <img src={menu} />
                    </button>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1>Minhas compras</h1>
                        <img src={bag}></img>
                    </div>
                </div>
                <div className='cart-wrapper-products'>
                    {produtos.map((product, index) => (
                        <ItemCart
                            key={product.id}
                            image={product.foto}
                            descricao={product.nome}
                            valor={product.valor}
                            unidades={product.unidades}
                            id={product.id}
                        />
                    ))}
                    <div className='msg-produtos' style={produtos.length == 0 ? { display: "block" } : { display: "none" }}>
                        <p style={activeState ? { color: "#daabbd", alignItems: "center", display: "flex" } : { display: "none" }}><span><img style={{ width: "20px" }} src={warning} alt='icon' /></span>Seu carrinho está vazio</p>
                    </div>
                </div>
                <div style={produtos.length == 0 ? { display: "none" } : { display: "block" }} className='subtotal-Wrapper-div'>
                    <div className='subtotal-content' >
                        <h5>Subtotal(sem frete):</h5>
                        <h5>R${formString(subtotal.toFixed(2).toString())}</h5>
                    </div>
                </div>
                <div style={produtos.length == 0 ? { display: "none" } : { display: "block" }} className='fretecalc-wrapper-div'>
                    <div className='fretecalc-content'>
                        <div className='linha'>
                            <p><span><img src={truck} /> </span>Meios de envio</p>
                        </div>
                        <div className='input-fretecalc-div'>
                            <input className="input-fretecalc" onChange={handleCepChange} type="text" placeholder='Digite seu cep' />
                            <button className='button-fretecalc' onClick={() => sendToFetch()} >CALCULAR</button>
                        </div>
                        <a href='https://buscacepinter.correios.com.br/app/endereco/index.php' target='blank'>Não sei meu cep</a>
                    </div>
                </div>
                <div style={produtos.length > 0 || isloading ? { display: "block" } : { display: "none" }} className='frete-options-wrapper'>

                    {/* loading */}
                    {isloading && <Loading />}

                    {/* info frete */}
                    {frete && frete.servicos && frete.servicos[2]?.ShippingPrice && (
                        <ItemFrete
                            prazo={frete.servicos[2].DeliveryTime}
                            valor={frete.servicos[2].ShippingPrice}
                            nome={frete.servicos[2].ServiceDescription}
                        />
                    )}
                    {frete && frete.servicos && frete.servicos[0]?.ShippingPrice && (
                        <ItemFrete
                            prazo={frete.servicos[0].DeliveryTime}
                            valor={frete.servicos[0].ShippingPrice}
                            nome={frete.servicos[0].ServiceDescription}
                        />
                    )}

                    {/* cep inválido */}
                    {(res && !isloading && shippingServices.length === 0) && (
                        <p style={{
                            color: "#daaddb9",
                            padding: "1em",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold"
                        }}>Verifique o Cep</p>
                    )}

                    <p style={{ fontSize: "12px" }}>O prazo de entrega <strong> não contabiliza feriados.</strong></p>
                </div>

                {/* Total da compra */}
                <div style={produtos.length === 0 || parseFloat(valorFrete) === 0 ? { display: "none" } : { display: "block" }} className='payment-wrapper'>
                    <div className='price-wrapper'>
                        <h1>Total: </h1>
                        <div style={{ textAlign: 'end' }}>
                            <h1>R${formString(total.toFixed(2).toString())}</h1>
                            <p>ou até 3x de <strong>R${formString((total / 3).toFixed(2).toString())}</strong> sem juros.</p>
                        </div>
                    </div>
                    <div className='button-div-payment'>
                        <button style={{ width: "80%" }} disabled={true} className='button-comprar'>
                            IR PARA PAGAMENTO
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}