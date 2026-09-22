import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Brands from '../components/Brands';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <Brands />
      <LeadForm />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
