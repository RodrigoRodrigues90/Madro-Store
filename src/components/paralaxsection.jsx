import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/paralax.css";
import rosesImg from "../assets/roses/roses5.avif";

gsap.registerPlugin(ScrollTrigger);

export default function ParalaxSection() {
    const textRef = useRef(null);

    const frase = "Você pode e vai muito além";

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = textRef.current.querySelectorAll('.word');

            // Animação em cadeia (stagger) para cada palavra acender no scroll
            gsap.fromTo(
                words,
                {
                    color: "#ffffff", // Cor inicial suave (cinza/esbranquiçado apagado)
                    y: 10,
                },
                {
                    color: "rgba(218, 127, 204, 0.62)", // Cor final (branco sólido)
                    y: 0,
                    stagger: 0.2, // Intervalo sequencial entre palavras
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",  // Começa a acender quando a seção entra na tela
                        end: "bottom 30%", // Termina de acender perto do topo
                        scrub: 1.5,        // Amortecimento suave com a velocidade do scroll
                    },
                }
            );
        }, textRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="paralax-wraper">
            {/* Imagem em movimento Parallax */}
            <div className="paralax-img-container" data-speed="0.5">
                <img src={rosesImg} alt="Roses Background" className="paralax-bg-img" />
            </div>

            {/* Texto animado com revelação palavra por palavra */}
            <div className="inner-paralaxe">
                <h1 ref={textRef}>
                    {frase.split(" ").map((palavra, index) => (
                        <span key={index} className="word">
                            {palavra}&nbsp;
                        </span>
                    ))}
                </h1>
            </div>
        </section>
    );
}