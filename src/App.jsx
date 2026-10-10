import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Intro from './components/Intro.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import WhyOneiria from './components/WhyOneiria.jsx'
import Originals from './components/Originals.jsx'
import TechAi from './components/TechAi.jsx'
import Lab from './components/Lab.jsx'
import Audiences from './components/Audiences.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Intro />
        <Services />
        <Work />
        <Process />
        <WhyOneiria />
        <Originals />
        <TechAi />
        <Lab />
        <Audiences />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
