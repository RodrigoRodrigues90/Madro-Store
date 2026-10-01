import "../css/produto.css";
import eye from '../assets/produtos/eye.svg'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionTypes from "../Redux/product/product-actiontypes";
import cartActionTypes from "../Redux/cart/actiontype";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Regista o plugin ScrollTrigger do GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Products({ foto, tagProduct, nome, valor, categoria, descricao, descricaoComplementar }) {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const cardRef = useRef(null);
    //mandar os dados do produto para 
    //a pagina de descrição doproduto
    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const anim = gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 40, // Começa 40px abaixo
            },
            {
                opacity: 1,
                y: 0, // Sobe para a posição original
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 88%', // Dispara quando o topo do card atinge 88% da altura da viewport
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

    const changeProductDescribe = () => {
        window.scrollTo(0, 0);
        dispatch({
            type: actionTypes.REQUEST,
            payload: {
                foto: foto,
                nome: nome,
                valor: valor,
                categoria: categoria,
                descricao: descricao,
                descricaoComplementar: descricaoComplementar
            }
        })
    }
    const sendToCart = () => {
        setLoadingButton();
        dispatch({
            type: cartActionTypes.POST,
            payload: { foto: foto, nome: nome, valor: valor, unidades: 1 }
        })
        setTimeout(() => {
            dispatch({ type: cartActionTypes.activeMSG });
        }, 3000);
    }
    let valorParcelado = valor / 3;
    // Usando toFixed para definir duas casas decimais e toString para converter em string
    let valorFormatado = valorParcelado.toFixed(2).toString();
    // Substituindo o ponto por uma vírgula
    valorFormatado = valorFormatado.replace('.', ',');
    // loading botão compra
    function setLoadingButton() {
        setloading(!loading)
        setTimeout(() => {
            setloading(loading)
        }, 2000);
    }
    return (
        <section className="produto-wraper" ref={cardRef}>
            <div className="produto">
                <div className="produto-tag" style={{display: tagProduct ? 'block' : 'none'}}>{tagProduct}</div>
                <div className="image-produto">
                    <img src={foto} alt="produto-foto"></img>
                </div>
                <h5 className="nome-produto" >{nome}</h5>
                <div className="valor-produto">R$ {valor.toFixed(2)}</div>
                <div className="parcelamento"><p>3x de <strong> R$ {valorFormatado}</strong> sem juros</p></div>
                <div className="div-button-comprar">
                    <button id="botaoCompra"
                        onClick={sendToCart}
                        className={!loading ? "button-comprar" : "button-loading"}
                        disabled={loading} >
                        {!loading ? "COMPRAR" : ""}
                    </button>
                    <Link to="/Madro-Store/produtodescricao">
                        <button onClick={changeProductDescribe} className="button-ver"><img src={eye} /></button>
                    </Link>
                </div>
            </div>
        </section>
    )
}