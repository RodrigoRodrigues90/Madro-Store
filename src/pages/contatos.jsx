import '../css/formulario.css';
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Mail, Clock, ChevronDown } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Overlay from '../components/overlay';
import Header from "../components/header";
import Footer from '../components/footer';
import Void from '../components/void';
import Siganos from '../components/siganos';

gsap.registerPlugin(ScrollTrigger);

export default function Contatos() {
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [openFaq, setOpenFaq] = useState(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const gridElement = gridRef.current;
        if (!gridElement) return;

        // Seleciona todos os cards dentro da grid
        const cards = gridElement.querySelectorAll('.contact-card');

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 35,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .8,
                    stagger: 0.55, 
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: gridElement,
                        start: 'top 85%', 
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, gridRef);

        return () => ctx.revert(); // Limpa a animação ao desmontar
    }, []);

    // Perguntas Frequentes (FAQ)
    const faqs = [
        {
            pergunta: "Qual é o prazo de entrega dos pedidos?",
            resposta: "O prazo varia de acordo com o seu CEP. O cálculo exato e a estimativa de dias aparecem na página de checkout antes de finalizar a compra."
        },
        {
            pergunta: "As peças possuem garantia?",
            resposta: "Sim! Nossas peças bijuterias possuem garantia de 7 dias corridos para defeitos de fabricação informados após o recebimento, além de receberem banhos de alta qualidade (ouro 18k e prata 1000)."
        },
        {
            pergunta: "Como faço para trocar ou devolver um produto?",
            resposta: "Você pode solicitar a troca ou devolução em até 7 dias após o recebimento através do nosso canal de atendimento via WhatsApp ou e-mail."
        },
        {
            pergunta: "Quais são as formas de pagamento aceitas?",
            resposta: "Aceitamos Cartões de Crédito, Pix (com aprovação imediata) e Boleto Bancário."
        }
    ];

    return (
        <>
            <Overlay isOpen={activeState} />
            <Header />
            <Void />

            <div className="contact-hero-wrapper" >
                <div className="contact-hero-overlay" />

                <div className="contact-main-content">
                    {/* CABEÇALHO */}
                    <div className="contact-header-text">
                        <span className="horizontal-title" style={{lineHeight:'2em', fontSize:'22px'}}>SUPORTE</span>
                        <p>Estamos prontos para te atender e tirar qualquer dúvida sobre nossos produtos e pedidos.</p>
                    </div>

                    {/* CARDS DE CONTATO E ENDEREÇO */}
                    <div className="contact-cards-grid" ref={gridRef}>
                        
                        {/* WHATSAPP */}
                        <a 
                            href="https://wa.me/5500000000000" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="contact-card whatsapp-highlight"
                        >
                            <div className="icon-wrapper">
                                <MessageCircle size={28} />
                            </div>
                            <h3>WhatsApp Direct</h3>
                            <p>Atendimento rápido e personalizado para você.</p>
                            <span className="card-action">Iniciar conversa &rarr;</span>
                        </a>

                        {/* E-MAIL */}
                        <div className="contact-card">
                            <div className="icon-wrapper" >
                                <Mail size={28} />
                            </div>
                            <h3>E-mail Suporte</h3>
                            <p>suporte@madrostore.com</p>
                            <span className="card-subtext">Respondemos em até 24h úteis</span>
                        </div>

                        {/* HORÁRIO & REDES */}
                        <div className="contact-card">
                            <div className="icon-wrapper">
                                <Clock size={28} />
                            </div>
                            <h3>Horário de Atendimento</h3>
                            <p>Segunda a Sexta: 09h às 18h</p>
                            <div className="social-link">
                                <span>@madro.store</span>
                            </div>
                        </div>

                    </div>

                    {/* SEÇÃO FAQ */}
                    <div className="contact-faq-container">
                        <h2>Dúvidas Frequentes</h2>
                        <div className="faq-list">
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index} 
                                    className={`faq-item ${openFaq === index ? 'active' : ''}`}
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <div className="faq-question">
                                        <span>{faq.pergunta}</span>
                                        <ChevronDown size={20} className={`faq-icon ${openFaq === index ? 'rotate' : ''}`} />
                                    </div>
                                    {openFaq === index && (
                                        <div className="faq-answer">
                                            <p>{faq.resposta}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <Void />
            <Siganos />
            <Footer />
        </>
    );
}