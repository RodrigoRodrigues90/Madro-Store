import "../css/header.css";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { User, ShoppingBag, Menu, X } from 'lucide-react';

import Menucart from "../components/cart";
import Msgcart from "../components/mensagemcart";
import actionTypes from '../Redux/cart/actiontype';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const headerRef = useRef(null);
    const centerRef = useRef(null);

    const { msgActive, produtos } = useSelector(({ cartReducer }) => cartReducer);
    const dispatch = useDispatch();

    const changeActiveState = () => {
        dispatch({ type: actionTypes.active });
    };

    const [classname, setActive] = useState(false);
    const setState = () => {}//setActive(!classname);

    function toggleSubMenu() {
        // const submenu = document.getElementById("products");
        // if (submenu) submenu.classList.toggle("open-submenu");
    }

    const [msgAtiva, setMsgActive] = useState(msgActive);
    useEffect(() => {
        setMsgActive(msgActive);
    }, [msgActive]);

    useGSAP(() => {
        gsap.from(centerRef.current, {
            y: -60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            onToggle: (self) => {
                if (self.isActive) {
                    gsap.to(centerRef.current, {
                        opacity: 0.8,
                        boxShadow: '0px 8px 32px 0 rgba(0, 0, 0, 0.1)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(centerRef.current, {
                        boxShadow: 'none',
                        opacity: 0.9,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            }
        });
    }, { scope: headerRef });

    return (
        <>
            <header ref={headerRef} className="header">
                <div ref={centerRef} id="center" className="center">
                    {/* Logomarca */}
                    <Link to="/Madro-Store">
                        <div className="logo">
                            <h1>MADRO</h1>
                        </div>
                    </Link>

                    {/* Login e Carrinho com Ícones do Lucide */}
                    <div className="icons-log-cart-div">
                        <div className="icons-log-cart">
                            <div className="label-log-cart" id="log">
                                <User className="header-icon" size={24} color="#8a324f" />
                                <ul style={{ width: '120px', padding: '0px', textAlign: 'center' }} className="sub-menu">
                                    <li><Link to="">Cadastre-se</Link></li>
                                    <li><Link to="">Login</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="icons-log-cart">
                            <div className="label-log-cart" onClick={changeActiveState}>
                                <ShoppingBag className="header-icon" size={24} color="#8a324f" />
                                <div className="quantidade-itens-cart">{produtos.length}</div>
                            </div>
                        </div>
                    </div>

                    {/* Botão do Menu Mobile */}
                    <div className="icons-search-menu-mobile">
                        <button onClick={setState} className="menu-div-mobile" aria-label="Abrir Menu">
                            <Menu size={26} color="#8a324f" />
                        </button>
                    </div>

                    {/* Menu Lateral Mobile */}
                    <div className={classname ? "show-menu" : "hidden-menu"} id="menu-hidden">
                        <div className="header-hidden-menu">
                            <button onClick={setState} className="menu-div-mobile" aria-label="Fechar Menu">
                                <X size={26} color="#ffffff" />
                            </button>
                        </div>
                        <div className="wrapper-menu-list">
                            <ul className="hidden-menu-list">
                                <li><Link to="/Madro-Store">Home</Link></li>
                                <li onClick={toggleSubMenu}>
                                    <Link>Produtos</Link>
                                    <ul className="hidden-submenu" id="products">
                                        <li onClick={setState}><Link to="/Madro-Store/produtos">Todos os produtos</Link></li>
                                        <li onClick={setState}><Link to="/Madro-Store/produtos/Anéis">Anéis</Link></li>
                                        <li onClick={setState}><Link to="/Madro-Store/produtos/Pulseiras">Pulseiras</Link></li>
                                        <li onClick={setState}><Link to="/Madro-Store/produtos/Brincos">Brincos</Link></li>
                                        <li onClick={setState}><Link to="/Madro-Store/produtos/Colares">Colar</Link></li>
                                        <li onClick={setState}><Link to="/Madro-Store/produtos/Óculos">Óculos</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/Madro-Store/Contatos">Contatos</Link></li>
                            </ul>
                        </div>
                        <div className="account-div">
                            <Link to="/Madro-Store/login"><button>Iniciar sessão</button></Link>
                            <Link to="/Madro-Store/cadastro"><button>Conta</button></Link>
                        </div>
                    </div>
                </div>

                <div className="search-area-mobile" id="search">
                    <input placeholder="O que você está procurando?" type="text" />
                </div>

                <Menucart />
            </header>
            <Msgcart ativo={msgAtiva} />
        </>
    );
}