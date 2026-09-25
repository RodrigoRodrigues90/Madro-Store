import "../css/siganos.css"
import { Gem, Sparkles, Gift, ShieldCheck } from "lucide-react";
import image from "../assets/footer/icons8-instagram-logo.svg"
export default function Siganos() {
    return (
        <section className="siganos-bg">
            <div className="main-wrapper">
                <div className="siganos-wrapper">
                    <div className="titulo-siganos">
                        <img src={image}></img>
                        <h1>madro.storee</h1>
                    </div>
                    <div className="text" >
                        <p>Estamos no Instagram</p>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/madro_/" rel="noopener noreferrer" target="_blank">
                            <button className="button">
                                SIGA-NOS
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Lado Direito: Opção 2 - Depoimento / Prova Social */}
            <div className="depoimento-container">
                <span className="depoimento-tag">EXPERIÊNCIA DOS CLIENTES</span>
                <h2 className="depoimento-title">O que dizem nossos clientes</h2>

                <div className="depoimento-card">
                    
                    <p className="depoimento-quote">
                        "As peças da MADRO têm um acabamento impecável. Chegaram super rápido e embaladas como um verdadeiro presente de luxo!"
                    </p>

                    <div className="depoimento-author">
                    <div className="depoimento-stars" aria-label="Avaliação 5 estrelas">
                        ★★★★★
                    </div>
                        <span className="author-name">Camila S.</span>
                        <span className="author-location">São Paulo, SP</span>
                    </div>
                </div>
            </div>
        </section>
    )
}