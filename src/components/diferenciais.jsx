import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, Gift, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import "../css/diferencial.css";

gsap.registerPlugin(ScrollTrigger);

export default function Diferencial() {
    return (
        <section className="diferenciais-bg">
            <div className="diferenciais-container">
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        /* Mobile: 1 item centralizado por vez */
                        0: {
                            slidesPerView: 1,
                            centeredSlides: true,
                            spaceBetween: 16,
                        },
                        /* Desktop (≥ 992px): Os 3 itens alinhados lado a lado */
                        992: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 24,
                        }
                    }}
                    className="diferencial-swiper-track"
                >
                    <SwiperSlide>
                        <div className="diferencial-item">
                            <div className="diferencial-icon">
                                <Gift size={20} />
                            </div>
                            <div className="diferencial-text">
                                <h4>Packaging de Luxo</h4>
                                <p>Cada pedido acompanha nossa embalagem especial pronta para presentear.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="diferencial-item">
                            <div className="diferencial-icon">
                                <ShieldCheck size={20} />
                            </div>
                            <div className="diferencial-text">
                                <h4>Garantia & Assistência</h4>
                                <p>Certificado de garantia em todas as semijóias e atendimento dedicado.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="diferencial-item">
                            <div className="diferencial-icon">
                                <Truck size={20} />
                            </div>
                            <div className="diferencial-text">
                                <h4>Frete Grátis Regional</h4>
                                <p>Envio gratuito para Florianópolis e toda a região metropolitana.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}