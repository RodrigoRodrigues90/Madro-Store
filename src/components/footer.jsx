import "../css/footer.css";
import master from "../assets/footer/master.svg";
import visa from "../assets/footer/visa.svg";
import pix from "../assets/footer/pix.svg";
import paypal from "../assets/footer/paypal.svg";
import linkedin from "../assets/footer/linkedin.svg";
import instagram from "../assets/footer/instagram.svg";
import facebook from "../assets/footer/facebook.svg";
import madro from "../assets/header/logo.webp";
import correios from "../assets/footer/correios.png";
import google from "../assets/footer/selogoogle.webp";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo Central da Marca */}
                <div className="footer-brand-section">
                    <img src={madro} alt="MADRO Store" className="footer-logo" />
                    <p className="footer-tagline">Alta joalheria & design minimalista</p>
                </div>

                {/* Grid de Seções do Rodapé */}
                <div className="footer-grid">
                    {/* Coluna 1: Redes Sociais */}
                    <div className="footer-col">
                        <h4 className="footer-title">Nossas Redes</h4>
                        <div className="social-icons">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <img src={instagram} alt="Instagram" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <img src={linkedin} alt="LinkedIn" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <img src={facebook} alt="Facebook" />
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Meios de Pagamento */}
                    <div className="footer-col">
                        <h4 className="footer-title">Pagamento</h4>
                        <div className="payment-badges">
                            <img src={visa} alt="Visa" />
                            <img src={master} alt="Mastercard" />
                            <img src={pix} alt="PIX" />
                            <img src={paypal} alt="PayPal" />
                        </div>
                    </div>

                    {/* Coluna 3: Segurança */}
                    <div className="footer-col">
                        <h4 className="footer-title">Segurança</h4>
                        <div className="trust-badges">
                            <img src={google} alt="Google Site Seguro" className="badge-google" />
                        </div>
                    </div>

                    {/* Coluna 4: Entrega */}
                    <div className="footer-col">
                        <h4 className="footer-title">Entrega</h4>
                        <div className="trust-badges">
                            <img src={correios} alt="Entrega Correios" className="badge-correios" />
                        </div>
                    </div>
                </div>

                {/* Linha Divisória */}
                <div className="footer-divider" />

                {/* Direitos Autorais e Legal */}
                <div className="footer-bottom">
                    <p>© {currentYear} MADRO Store. Todos os direitos reservados. CNPJ 00.000.000/0000-00.</p>
                    <div className="footer-legal-links">
                        <a href="#termos">Termos de Uso</a>
                        <span>•</span>
                        <a href="#privacidade">Política de Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}