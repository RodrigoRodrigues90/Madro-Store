import "../css/header.css";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import user from "../assets/header/user.svg";
import cart from "../assets/header/bag.png";
import logoName from "../assets/header/logo.webp";
import menu from "../assets/header/icons8-menu-26.svg";
import Menucart from "../components/cart";
import search from "../assets/header/search.svg";
import searchinput from "../assets/header/icons8-search.svg"
import Msgcart from "../components/mensagemcart"
import { Link } from 'react-router-dom'
import actionTypes from '../Redux/cart/actiontype'


export default function Header() {
    // altera o icone de carrinho de compra, sobre a quantidade de produtos
    const { msgActive, produtos } = useSelector(({ cartReducer }) => cartReducer);

    // ===altera o estado de ativo/desativo 
    //  do menu do carrinho de compras===//
    const dispatch = useDispatch();
    const changeActiveState = () => {
        dispatch({
            type: actionTypes.active,
        })
    }
    //menu mobile lateral
    const [classname, setActive] = useState(false)
    const setState = () => {
        setActive(!classname);
    }
    //sub menu de produtos do menu mobile
    const submenu = document.getElementById("products");
    function toggleSubMenu() {
        submenu.classList.toggle("open-submenu");
    }
    //input search mobile
    function setVisibility() {
        if (document.getElementById("search").style.display === "none") {
            document.getElementById("search").style.display = "block";
        } else {
            document.getElementById("search").style.display = "none";
        }
    };
    //msg do carrinho de compras
    const [msgAtiva, setMsgActive] = useState(msgActive)
    useEffect(() => {
        setMsgActive(msgActive);
    })
    return (
        <>
            <header className="header">
                <div id="center" className="center" >
                    {/* logomarca */}
                    <Link to="/Madro-Store">

                        <div className="logo">

                            <img src={logoName} alt="logo"></img>

                        </div>
                    </Link>

                    {/* menu */}
                    <nav className="menu">
                        <ul className="menu-list">

                            <li className="item-menu">
                                <Link to="/Madro-Store">
                                    Home
                                </Link>

                            </li>
                            <li className="item-menu-produtos">
                                <Link to="/Madro-Store/produtos">
                                    Produtos
                                </Link>

                                <ul className="sub-menu">
                                    <li>
                                        <Link to="/Madro-Store/produtos/Anéis" >
                                            Anéis
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Madro-Store/produtos/Pulseiras">
                                            Pulseiras
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Madro-Store/produtos/Brincos">
                                            Brincos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Madro-Store/produtos/Colares">
                                            Colar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Madro-Store/produtos/Óculos">
                                            Óculos
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="item-menu">
                                <Link to="/Madro-Store/contatos">
                                    Contatos
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* input de pesquisa */}
                    <div className="search-div">
                        <input className="search-input" type="search" placeholder="O que você está procurando?"></input>
                        <button className="input-search-button">
                            <img className="search-image-button" src={searchinput} />
                        </button>
                    </div>

                    {/* cadastro e carrinho */}
                    <div className="icons-log-cart-div">
                        <div className="icons-log-cart" >
                            <div className="label-log-cart" id="log" >
                                <img className="img-log-cart" src={user} alt="login"></img>
                                <ul style={{ width: '120px', padding: '0px', textAlign: 'center' }} className="sub-menu">
                                    <li>
                                        <Link to="/Madro-Store/cadastro">
                                            Cadastre-se
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Madro-Store/login">
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="icons-log-cart" >
                            <div className="label-log-cart">

                                <img onClick={changeActiveState} className="img-log-cart" id="cart" src={cart} alt="cart"></img>
                                <div className="quantidade-itens-cart">{produtos.length}</div>
                            </div>
                        </div>
                    </div>

                    {/* icones mobile */}
                    <div className="icons-search-menu-mobile">
                        <button onClick={setVisibility} className="search-div-mobile" >
                            <img className="search-mobile" src={search}></img>
                        </button>
                        <button onClick={setState} className="menu-div-mobile">
                            <img className="menu-mobile" src={menu}></img>
                        </button>
                    </div>
                    {/* menu lateral */}
                    <div className={classname ? "show-menu" : "hidden-menu"} id="menu-hidden">
                        <div className="header-hidden-menu">
                            <button onClick={setState} className="menu-div-mobile">
                                <img src={menu}></img>
                            </button>
                        </div>
                        <div className="wrapper-menu-list">
                            <ul className="hidden-menu-list">
                                <li >
                                    <Link to="/Madro-Store">
                                        Home
                                    </Link>
                                </li>
                                <li onClick={toggleSubMenu} >
                                    <Link>
                                        Produtos
                                    </Link>

                                    <ul className="hidden-submenu" id="products">
                                        <li onClick={setState}>
                                            <Link to="/Madro-Store/produtos">
                                                Todos os produtos
                                            </Link>
                                        </li>
                                        <li onClick={setState}>
                                            <Link to="/Madro-Store/produtos/Anéis">
                                                Anéis
                                            </Link>
                                        </li>
                                        <li onClick={setState}>
                                            <Link to="/Madro-Store/produtos/Pulseiras">
                                                Pulseiras
                                            </Link>
                                        </li>
                                        <li onClick={setState}>
                                            <Link to="/Madro-Store/produtos/Brincos">
                                                Brincos
                                            </Link>
                                        </li>
                                        <li onClick={setState}>
                                            <Link to="/Madro-Store/produtos/Colares">
                                                Colar
                                            </Link>
                                        </li>
                                        <li onClick={setState} >
                                            <Link to="/Madro-Store/produtos/Óculos">
                                                Óculos
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/Madro-Store/Contatos">
                                        contatos
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="account-div">
                            <Link to="/Madro-Store/login">
                                <button>Iniciar sessão</button>
                            </Link>
                            <Link to="/Madro-Store/cadastro">
                                <button>Conta</button>
                            </Link>
                        </div>
                    </div>
                    {/* fim menu */}

                </div>{/*center*/}
                <div className="search-area-mobile" id="search">
                    <input placeholder="O que você está procurando?" type="text"></input>
                </div>
                {/* icones mobile */}

                {/* menu lateral */}
                <Menucart />
            </header >
            <Msgcart ativo={msgAtiva} />
        </>
    )
}