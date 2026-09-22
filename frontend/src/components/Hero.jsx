import { useState } from 'react';
import logo from '../assets/logo.png';

// Drop any landscape .mp4/.webm into src/assets/hero/ — any filename.
// They play in order (by filename), looping through all of them.
const files = import.meta.glob('../assets/hero/*.{mp4,webm}', {
  eager: true, query: '?url', import: 'default'
});
const clips = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

export default function Hero() {
  const [i, setI] = useState(0);

  return (
    <section className="hero" id="top">
      <div className="hero-media">
        {clips.length ? (
          <video
              key={clips[i]}
              className="hero-video"
              src={clips[i]}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={(e) => e.currentTarget.classList.add('ready')}
              onEnded={(e) => {
                const v = e.currentTarget;
                v.currentTime = 0;
                v.play();
              }}
          />
        ) : (
          <div className="hero-fallback" />
        )}
      </div>

      <div className="hero-overlay" />
      <div className="hero-scan" />

      <div className="hero-content">
        <img src={logo} alt="Fluxara" className="hero-logo" />
        <span className="mono-label" style={{ marginBottom: 18, display: 'inline-block' }}>
          Marketing studio · Reels · Web · AI
        </span>
        <h1>We make brands <span className="text-glow" style={{ color: 'var(--amber)' }}>impossible</span> to scroll past.</h1>
        <p className="hero-sub">
          Content, campaigns, websites and automation for brands that want to be seen.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn-primary">Start a project</a>
          <a href="#work" className="btn-ghost">See the work</a>
        </div>
      </div>
    </section>
  );
}
