import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import imageParalax from './assets/roses/roses5.avif'

import Overlay from './components/overlay.jsx';
import Header from './components/header';
import Void from "./components/void";
import Main from "./components/HorizontalScrollSection.jsx";
import Newsletter from './components/newsletter';
import Siganos from './components/siganos';
import Paralax from './components/paralaxsection.jsx'
import Footer from './components/footer';
import loadProducts from "./api/api-bling";
import HeroSection from "./components/heroSection.jsx";
import Destaques from "./components/HorizontalProductsSection.jsx"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const { produtos } = useSelector((rootReducer) => rootReducer.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // Cria o smoother e sincroniza com os pins do ScrollTrigger
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    ScrollTrigger.refresh();

    return () => {
      smoother.kill();
    };
  }, []);

  const { activeState } = useSelector(({ cartReducer }) => cartReducer);

  return (
    <>
      <Overlay isOpen={activeState} />
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <Main />
          <Paralax foto={imageParalax}/>  
          <Void />
          <Destaques/>
          <Void/>
          <Newsletter />
          <Void />
          <Siganos />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;