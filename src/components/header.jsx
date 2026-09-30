import "../css/header.css";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/header/logo.webp';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { User, ShoppingCart, Menu, X } from 'lucide-react';

import Menucart from "../components/cart";
import Msgcart from "../components/mensagemcart";
import actionTypes from '../Redux/cart/actiontype';

gsap.registerPlugin(ScrollTrigger);

export default function Header({ isSplashFinished = false }) {
    const headerRef = useRef(null);
    const centerRef = useRef(null);
    const [showBanner, setShowBanner] = useState(false);

    const { msgActive, produtos } = useSelector(({ cartReducer }) => cartReducer);
    const dispatch = useDispatch();

    const changeActiveState = () => {
        dispatch({ type: actionTypes.active });
    };

    const [classname, setActive] = useState(false);
    const setState = () => setActive(!classname);

    function toggleSubMenu() {
        const submenu = document.getElementById("products");
        if (submenu) submenu.classList.toggle("open-submenu");
    }

    const [msgAtiva, setMsgActive] = useState(msgActive);
    useEffect(() => {
        setMsgActive(msgActive);
    }, [msgActive]);

    // Listener de Scroll para o Banner
    useEffect(() => {
        const handleScroll = () => {
            const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollable > 0) {
                const currentScroll = window.scrollY;
                const scrollPercentage = (currentScroll / totalScrollable) * 100;
                setShowBanner(scrollPercentage >= 5);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Controle do GSAP acoplado ao Splash Screen
    useGSAP(() => {
        if (!isSplashFinished) {
            // Garante que o Header começa escondido enquanto o Splash está ativo
            gsap.set(centerRef.current, { y: -60, opacity: 0 });
            return;
        }

        // Quando isSplashFinished passar a true, executa a animação de entrada
        gsap.to(centerRef.current, {
            y: 0,
            opacity: 1,
            boxShadow:'2 0 18 12 #31303183',
            duration: 0.8,
            ease: 'power3.out'
        });

    }, { scope: headerRef, dependencies: [isSplashFinished] });

    return (
        <>
            <header ref={headerRef} className="header">
                {/* Banner de Frete Grátis */}
                <div className={`top-banner ${showBanner ? "visible" : ""}`}>
                    <span>FRETE GRÁTIS para a região de Florianópolis</span>
                </div>

                <div ref={centerRef} id="center" className="center">
                    <div className="wrapper-itens">
                        {/* Menu Mobile */}
                        <div className="icons-search-menu-mobile">
                            <button onClick={setState} className="menu-div-mobile" aria-label="Abrir Menu">
                                <Menu size={24} color="#8a324f" />
                            </button>
                        </div>

                        {/* Logo Centralizada */}
                        <Link to="/Madro-Store" id="logo-id">
                            {/* <div className="logo">
                                <img src={logo} alt="Logo Madro" />
                            </div> */}
                            <h1>MADRO</h1>
                        </Link>

                        {/* Ícones Direita */}
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
                                    <ShoppingCart className="header-icon" size={24} color="#8a324f" />
                                    <div className="quantidade-itens-cart">{produtos.length}</div>
                                </div>
                            </div>
                        </div>
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

                <Menucart />
            </header>
            <Msgcart ativo={msgAtiva} />
        </>
    );
}