import { useState } from 'react';
import './home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from './Header';



function Home() {
    
    return (
    <>
    {Header()}
        <div className="banner">
            <video className="videoBanner" autoPlay muted loop
            src="imgs/videoHero.mp4" typeof="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    
    <div className="overlayBanner">
        <h1 className="TextoBanner">YOUR CONTROLLER, YOUR RULES</h1>
        <div className="BotonesBanner">
            <button className="BotonBannerPersonalizar">PERSONALIZE</button>
            <button className="BotonBannerCatalogo">CATALOG</button>
        </div>
    </div>

{/* CATEGORÍAS */}

<div className="gallery-container">
    <a href="/playstation" className="card ps">
        <img src="imgs/placeholder.png" alt="PlayStation"/>
        <span className="label">PlayStation</span>
    </a>

    <a href="/nintendo" className="card nintendo">
    
        <img src="imgs/placeholder.png" alt="Nintendo"/>
        <span className="label">Nintendo</span>
    </a>

    <a href="/xbox" className="card xbox">
        <img src="imgs/placeholder.png" alt="XBox"/>
        <span className="label">XBox</span>
    </a>

    <a href="/pc" className="card pc">
        <img src="imgs/placeholder.png" alt="PC"/>
        <span className="label">PC</span>
    </a>
</div>

{/* CARRUSEL DE DESTACADOS */}

<section className="carousel-section">
    <div className="carousel-header">
        <h2>Featured</h2>
        <div className="carousel-controls">
            <button className="carousel-arrow left-arrow" type="button" aria-label="Previous">‹</button>
            <button className="carousel-arrow right-arrow" type="button" aria-label="Next">›</button>
        </div>
    </div>
    <div className="carousel-wrapper">
        <div className="carousel" id="featuredCarousel">
            <article className="carousel-item">
                <img src="imgs/placeholder.png" alt="Featured product 1"/>
                <div className="item-info">
                    <p className="item-name">PlayStation Pro</p>
                    <p className="item-price">$299</p>
                </div>
            </article>
            <article className="carousel-item">
                <img src="imgs/placeholder.png" alt="Featured product 2"/>
                <div className="item-info">
                    <p className="item-name">Nintendo Switch</p>
                    <p className="item-price">$249</p>
                </div>
            </article>
            <article className="carousel-item">
                <img src="imgs/placeholder.png" alt="Featured product 3"/>
                <div className="item-info">
                    <p className="item-name">Xbox Elite</p>
                    <p className="item-price">$279</p>
                </div>
            </article>
            <article className="carousel-item">
                <img src="imgs/placeholder.png" alt="Featured product 4"/>
                <div className="item-info">
                    <p className="item-name">Gaming PC</p>
                    <p className="item-price">$699</p>
                </div>
            </article>
            <article className="carousel-item">
                <img src="imgs/placeholder.png" alt="Featured product 5"/>
                <div className="item-info">
                    <p className="item-name">Arcade Kit</p>
                    <p className="item-price">$149</p>
                </div>
            </article>
        </div>
    </div>
</section>

    </>

    );

}
    export default Home;