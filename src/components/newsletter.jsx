import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/newsletter.css";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail("");
            setTimeout(() => setSubmitted(false), 4000);
        }
    };

    return (
        <section className="news-wrapper" >
            <div className="dados-wrapper">
                
                {/* Máscara 1: Título Pequeno */}
                <div className="mask-container">
                    <span className="titulo-news">
                        NEWSLETTER
                    </span>
                </div>

                {/* Máscara 2: Manchete Principal */}
                <div className="mask-container">
                    <h2 className="text-news" >
                        Receba todas as promoções
                    </h2>
                </div>

                {/* Máscara 3: Subtítulo */}
                <div className="mask-container">
                    <p className="sub-text-news">
                        Quer receber nossas ofertas exclusivas? Cadastre seu e-mail e comece a recebê-las!
                    </p>
                </div>

                {/* Máscara 4: Formulário de Entrada */}
                <div className="mask-container form-mask">
                    <form 
                        className="input-email-div"  
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="input-area"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Endereço de e-mail para newsletter"
                        />
                        <button type="submit" className="button-submit" aria-label="Enviar inscrição">
                            <Send size={18} className="send-icon" />
                        </button>
                    </form>
                </div>

                {submitted && (
                    <p className="news-success-msg">E-mail cadastrado com sucesso!</p>
                )}
            </div>
        </section>
    );
}