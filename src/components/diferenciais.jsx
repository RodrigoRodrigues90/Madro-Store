import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem, Gift, ShieldCheck } from "lucide-react";
import "../css/diferencial.css";

// Registra o plugin do ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Siganos() {
    const sectionRef = useRef(null);

    useEffect(() => {
        // gsap.context garante a limpeza adequada das animações no React
        const ctx = gsap.context(() => {
            // Animação da tag e do título
            gsap.from(".diferenciais-tag, .diferenciais-title", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".diferenciais-container",
                    start: "top 85%", // Dispara quando o topo da seção atinge 85% da tela
                    toggleActions: "play none none none",
                },
            });

            // Animação dos cards em cascata (stagger)
            gsap.from(".diferencial-item", {
                y: 45,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Atraso fluido entre cada card
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".diferenciais-list",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert(); // Destrói os triggers e limpa a memória ao desmontar
    }, []);

    return (
        <section className="diferenciais-bg" ref={sectionRef}>
            <div className="diferenciais-container">
                <span className="diferenciais-tag">QUALIDADE & EXCLUSIVIDADE</span>
                <h2 className="diferenciais-title">A Experiência MADRO</h2>

                <div className="diferenciais-list">
                    <div className="diferencial-item">
                        <div className="diferencial-icon">
                            <Gem size={20} />
                        </div>
                        <div className="diferencial-text">
                            <h4>Banho de Alta Durabilidade</h4>
                            <p>Peças banhadas em Ouro 18k e Prata 925, livres de níquel e hipoalergênicas.</p>
                        </div>
                    </div>

                    <div className="diferencial-item">
                        <div className="diferencial-icon">
                            <Gift size={20} />
                        </div>
                        <div className="diferencial-text">
                            <h4>Packaging de Luxo</h4>
                            <p>Cada pedido acompanha nossa embalagem especial pronta para presentear.</p>
                        </div>
                    </div>

                    <div className="diferencial-item">
                        <div className="diferencial-icon">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="diferencial-text">
                            <h4>Garantia & Assistência</h4>
                            <p>Certificado de garantia em todas as semijóias e atendimento dedicado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}