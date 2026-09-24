import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/paralax.css";
import rosesImg from "../assets/roses/roses5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ParalaxSection() {
    const textRef = useRef(null);

    const frase = "Você brilha mais quando se sente linda ";

    useEffect(() => {
    const ctx = gsap.context(() => {
        const words = textRef.current.querySelectorAll('.word');

        gsap.to(words, {
            color: "rgba(80, 21, 82, 0.78)",
            y: 0, // Anima do translateY(20px) do CSS até o 0
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 85%",
                end: "bottom 35%",
                scrub: 1.5,
                invalidateOnRefresh: true, // Recalcula as posições em caso de mudança de altura
            },
        });
    }, textRef);

    // Garante que o GSAP recalcule as posições após a montagem do ScrollSmoother
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => {
        clearTimeout(timer);
        ctx.revert();
    };
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