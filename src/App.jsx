import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import imageParalax from './assets/roses/roses5.avif'
import Preloader from './components/splashScreen.jsx';
import Overlay from './components/overlay.jsx';
import Header from './components/header';
import Void from "./components/void";
import Main from "./components/HorizontalScrollSection.jsx";
import Diferencial from "./components/diferenciais.jsx"
import Newsletter from './components/newsletter';
import Siganos from './components/siganos';
import Paralax from './components/paralaxsection.jsx'
import Footer from './components/footer';
import loadProducts from "./api/api-bling";
import HeroSection from "./components/heroSection.jsx";
import Destaques from "./components/HorizontalProductsSection.jsx"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollTrigger.config({ ignoreMobileResize: true });
function App() {
  const { produtos } = useSelector((rootReducer) => rootReducer.allProducts);
  const dispatch = useDispatch();
  const [splashFinished, setSplashFinished] = useState(false);

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
      {/* Exibe o SplashScreen e chama setSplashFinished(true) quando terminar */}
      {!splashFinished && (
        <Preloader onComplete={() => setSplashFinished(true)} />
      )}
      <Overlay isOpen={activeState} />

      {/* O Header só inicia a animação de entrada quando splashFinished for true */}
      <Header isSplashFinished={splashFinished} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection isLoaded={setSplashFinished} />
          <Main />
          <Void />
          <Destaques />
          <Diferencial />
          <Void />
          <Paralax foto={imageParalax} />
          <Newsletter />
          <Siganos />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;