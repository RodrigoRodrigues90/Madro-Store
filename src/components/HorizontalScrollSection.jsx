import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScrollSection.css';
import video from '../assets/backGround.mp4';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    {
        id: 1,
        title: 'Colar Medalha Ouro',
        price: 'R$ 380',
        tag: 'SHOP THIS LOOK',
        video: { video },
    },
    {
        id: 2,
        title: 'Anéis de Sobreposição',
        price: 'R$ 250',
        tag: 'MUST HAVE',
        video: { video },
    },
    {
        id: 3,
        title: 'Brincos Argola Ródio',
        price: 'R$ 190',
        tag: 'NOVIDADE',
        video: { video },
    },
    {
        id: 4,
        title: 'Bracelete Elegance',
        price: 'R$ 320',
        tag: 'EXCLUSIVO',
        video: { video },
    },
     {
        id: 5,
        title: 'Bracelete Elegance',
        price: 'R$ 320',
        tag: 'EXCLUSIVO',
        video: { video },
    },
     {
        id: 6,
        title: 'Bracelete Elegance',
        price: 'R$ 320',
        tag: 'EXCLUSIVO',
        video: { video },
    },
];

export default function HorizontalScrollSection() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const watermarkRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const xTranslate = -(trackWidth - viewportWidth);

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: targetRef.current,
                    start: 'top top',
                    end: () => `+=${trackWidth}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            });

            timeline.to(trackRef.current, {
                x: xTranslate,
                ease: 'none',
            });

            timeline.to(
                watermarkRef.current,
                {
                    x: xTranslate * 0.7,
                    ease: 'none',
                },
                0
            );
        }, targetRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="horizontal-section" ref={targetRef}>
            <div className="watermark-text" ref={watermarkRef}>
                COLEÇÃO • EM MOVIMENTO • MADRO •
            </div>

            <div className="horizontal-track" ref={trackRef}>
                <div className="intro-card">
                    <h2>Shop in Motion</h2>
                    <p>Explore o brilho em tempo real com nossas peças em movimento.</p>
                </div>

                {PRODUCTS.map((prod) => (
                    <div className="video-card" key={prod.id}>
                        <div className="video-wrapper">
                            <video
                                loop
                                muted
                                playsInline
                                autoPlay
                            >
                                <source
                                    src={video}
                                    type="video/mp4"
                                />
                            </video>
                            <span className="card-badge">{prod.tag}</span>
                        </div>
                        <div className="card-details">
                            <h3>{prod.title}</h3>
                            <p className="price">{prod.price}</p>
                            <button className="buy-btn">Adicionar à Sacola</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}