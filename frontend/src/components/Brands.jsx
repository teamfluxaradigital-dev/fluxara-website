import Reveal from './Reveal';

// Same idea as Portfolio: drop a logo into src/assets/brands/ and it appears.
// Filename becomes the display name, so name files like "the-patio.jpeg".
const files = import.meta.glob(
  '../assets/brands/*.{jpg,jpeg,png,webp,svg,avif}',
  { eager: true, query: '?url', import: 'default' }
);

const PRETTY = {
  bulletbeats: 'BulletBeats Café',
  doh: 'DOH',
  patio: 'The Patio'
};

const brands = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const stem = path.split('/').pop().replace(/\.[^.]+$/, '');
    return {
      src,
      name: PRETTY[stem] || stem.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    };
  });

export default function Brands() {
  if (!brands.length) return null;

  // duplicated so the CSS marquee (-50%) loops seamlessly
  const track = [...brands, ...brands, ...brands];

  return (
    <section id="brands" style={{ padding: '72px 0' }}>
      <Reveal className="section-head" style={{ padding: '0 28px', maxWidth: 'var(--shell)', margin: '0 auto 40px' }}>
        <span className="mono-label">02 · Brands we've worked with</span>
        <h2 style={{ marginTop: 14, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>Trusted by brands that stand out.</h2>
      </Reveal>

      <div className="brand-marquee-wrap">
        <div className="brand-marquee">
          {track.map((b, i) => (
            <div className="brand-marquee-item" key={b.src + i}>
              <img src={b.src} alt={b.name} loading="lazy" />
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
