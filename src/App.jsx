import CursorCustom from './components/CursorCustom.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Metrics from './components/Metrics.jsx';
import HowWeWork from './components/HowWeWork.jsx';
import WorkTabs from './components/WorkTabs.jsx';
import VideoCarousel from './components/VideoCarousel.jsx';
import Pricing from './components/Pricing.jsx';
import Team from './components/Team.jsx';
import Contact from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <CursorCustom />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Metrics />
        <HowWeWork />
        <WorkTabs />
        <VideoCarousel />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
