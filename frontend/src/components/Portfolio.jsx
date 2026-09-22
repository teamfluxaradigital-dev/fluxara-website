import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

// Drop clips or images into src/assets/portfolio/ — any filename, and any of
// .mp4 .webm .jpg .jpeg .png .webp .avif .gif — they show up here automatically,
// sorted by filename, playing side by side like a wall of screens.
const files = import.meta.glob(
  '../assets/portfolio/*.{jpg,jpeg,png,webp,avif,gif,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
);

const items = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    isVideo: /\.(mp4|webm)$/i.test(path),
    label: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase())
  }));

// Gentle alternating up/down drift as the wall scrolls past — plain
// scroll-listener + rAF, no animation library required.
function useWallParallax(count) {
  const wallRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const wall = wallRef.current;
        if (!wall) return;
        const rect = wall.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: -1 (wall below viewport) .. 0 (centered) .. 1 (above)
        const progress = (vh - rect.top) / (vh + rect.height) * 2 - 1;
        colRefs.current.forEach((el, i) => {
          if (!el) return;
          const dir = i % 2 === 0 ? 1 : -1;
          const shift = progress * 26 * dir; // px
          el.style.transform = `translateY(${shift}px) scale(1.06)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return { wallRef, colRefs };
}

export default function Portfolio() {
  const { wallRef, colRefs } = useWallParallax(items.length);

  return (
    <section id="work" className="work">
      <Reveal className="section-head">
        <span className="mono-label">03 · Selected work</span>
        <h2 style={{ marginTop: 14 }}>The reel wall.</h2>
        <p>{items.length ? 'A living wall of content — scroll to watch it move.' : 'Recent reels and campaigns.'}</p>
      </Reveal>

      {items.length === 0 ? (
        <div className="portfolio-empty">
          <strong>No work added yet</strong>
          Drop your clips or images into <code>frontend/src/assets/portfolio/</code> and
          they'll appear here automatically — any filename works.
        </div>
      ) : (
        <div ref={wallRef} className="work-wall" style={{ '--cols': Math.min(items.length, 5) }}>
          {items.map((it, i) => (
            <figure key={it.src} className="work-col">
              <div ref={(el) => (colRefs.current[i] = el)} className="work-col-media">
                {it.isVideo ? (
                  <video src={it.src} muted loop playsInline autoPlay preload="auto" />
                ) : (
                  <img src={it.src} alt={it.label} loading="lazy" />
                )}
              </div>
              <figcaption>{it.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
