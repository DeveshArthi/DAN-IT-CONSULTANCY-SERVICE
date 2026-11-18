
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Portfolio from '../components/Portfolio';
import HowWeWork from '../components/HowWeWork';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Portfolio />
        <HowWeWork />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
