import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/paralax.css";
import rosesImg from "../assets/roses/roses5.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function ParalaxSection() {
    const textRef = useRef(null);
    const imgRef = useRef(null); // Ref para controlar a imagem no parallax

    const frase = "Você brilha mais quando se sente linda ";

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (imgRef.current) {
                gsap.fromTo(
                    imgRef.current,
                    { yPercent: -15 }, // Começa ligeiramente acima
                    {
                        yPercent: 15,  // Move ligeiramente para baixo durante o scroll
                        ease: "none",
                        scrollTrigger: {
                            trigger: imgRef.current.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true, // Acompanha o movimento do scroll do utilizador
                            invalidateOnRefresh: true,
                        }
                    }
                );
            }

            // 2. Animação de revelação do texto palavra por palavra
            const words = textRef.current?.querySelectorAll('.word');
            if (words && words.length > 0) {
                gsap.to(words, {
                    color: "rgba(80, 21, 82, 0.78)",
                    y: 0,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 85%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    },
                });
            }
        });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    return (
        <section className="paralax-wraper">
            <div className="paralax-img-container">
                <img 
                    ref={imgRef} 
                    src={rosesImg} 
                    alt="Roses Background" 
                    className="paralax-bg-img" 
                />
            </div>

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