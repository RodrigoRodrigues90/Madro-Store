import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import bannerVideo from '../assets/background-mobile.mp4';
import '../css/heroSection.css';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-banner-container">
                <video
                    src={bannerVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-banner-video"
                />
                <div className="hero-banner-overlay">
                    <span className="hero-subtitle">LANÇAMENTO</span>
                    <h1 className="hero-title">Nova Coleção Verão</h1>
                    <p className='hero-description'>Conheça a exclusividade MADRO</p>
                    <Link to="" className="hero-cta-button">
                        VER MAIS
                    </Link>
                </div>
            </div>

        </section>
    );
}