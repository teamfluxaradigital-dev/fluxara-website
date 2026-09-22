import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top"><img src={logo} alt="Fluxara" className="nav-logo" /></a>
      <div className="nav-links">
        <a href="#services" className="hide-sm">What we do</a>
        <a href="#work" className="hide-sm">Work</a>
        <a href="#brands" className="hide-sm">Clients</a>
        <a href="#contact" className="btn-ghost">Start a project</a>
      </div>
    </nav>
  );
}
