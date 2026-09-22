import logo from '../assets/logo.png';
import { IconWhatsApp, IconInstagram, IconPhone, IconMail } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <img src={logo} alt="Fluxara" className="footer-logo" />
          <p className="footer-tag">
            Content, campaigns, websites and automation for brands that want to be seen.
          </p>
        </div>

        <div className="footer-col">
          <h4>Talk to us</h4>
          <div className="contact-icons">
            <a href="tel:+917870305566" aria-label="Call" className="icon-btn icon-call">
              <IconPhone />
            </a>
            <a href="mailto:Fluxara.digital@gmail.com" aria-label="Email" className="icon-btn icon-mail">
              <IconMail />
            </a>
            <a href="https://wa.me/917870305566" target="_blank" rel="noreferrer"
              aria-label="WhatsApp" className="icon-btn icon-whatsapp">
              <IconWhatsApp />
            </a>
            <a href="https://instagram.com/fluxara.digital" target="_blank" rel="noreferrer"
              aria-label="Instagram" className="icon-btn icon-instagram">
              <IconInstagram />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Elsewhere</h4>
          <a href="#work">Our work</a>
          <a href="#contact">Get in touch</a>
          <a href="/team">Team login</a>
        </div>
      </div>

      <div className="footer-base">
        <span>© {new Date().getFullYear()} Fluxara</span>
        <span>Also on +91 74882 90834 · +91 89305 05662</span>
      </div>
    </footer>
  );
}