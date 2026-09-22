import { useState } from 'react';
import {
  Clapperboard, Video, Target, Search, Globe, Bot, Sparkles, PartyPopper, Rocket, Plus
} from 'lucide-react';
import Reveal from './Reveal';

// Merged from the client's 10-point list: "Content Creation" and "Video
// Production & Editing" described the same work twice, so they're combined
// into one card below — everything else kept as its own service.
const services = [
  {
    icon: Clapperboard,
    title: 'Social media management',
    desc: 'Instagram and Facebook run properly, day to day.',
    tags: ['Instagram/Facebook management', 'Content planning & strategy', 'Posts, reels, stories', 'Community & engagement']
  },
  {
    icon: Video,
    title: 'Content & video production',
    desc: 'Reels, product videos and promo content, shot and edited to actually get watched.',
    tags: ['Reels & short-form video', 'Video editing', 'Creative posts', 'Product & promo videos', 'Content shoots']
  },
  {
    icon: Target,
    title: 'Performance marketing',
    desc: 'Ads built around leads and footfall, not just impressions.',
    tags: ['Meta Ads', 'Google Ads', 'Campaign setup & management', 'Audience targeting', 'Lead-gen / footfall funnels', 'Performance optimization']
  },
  {
    icon: Search,
    title: 'SEO & Google Business Profile',
    desc: 'Local search and your Business listing, tuned so the right customers find you first.',
    tags: ['Local SEO', 'Google Business Profile', 'Ranking & visibility', 'Reviews & local presence']
  },
  {
    icon: Globe,
    title: 'Website development',
    desc: 'Fast sites that do the one job they need to do.',
    tags: ['Business websites', 'Landing pages', 'Website optimization']
  },
  {
    icon: Bot,
    title: 'AI automation & agents',
    desc: 'The repetitive parts of the day, handled by workflows that run themselves.',
    tags: ['Business process automation', 'AI-powered workflows', 'AI agents', 'Lead/customer automation', 'Marketing automation']
  },
  {
    icon: Sparkles,
    title: 'Branding & creative strategy',
    desc: 'One clear voice behind everything you post.',
    tags: ['Brand positioning', 'Creative direction', 'Content strategy', 'Campaign concepts', 'Brand communication']
  },
  {
    icon: PartyPopper,
    title: 'Event management',
    desc: 'Planning, promotion and live coverage, start to finish.',
    tags: ['Event planning', 'Event marketing', 'Social media coverage', 'Promotional creatives']
  },
  {
    icon: Rocket,
    title: 'Digital growth strategy',
    desc: 'The plan tying it all together, aimed at real growth.',
    tags: ['Overall digital strategy', 'Customer acquisition', 'Lead-generation funnels', 'Online presence planning']
  }
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services">
      <Reveal className="section-head">
        <span className="mono-label">01 · What we do</span>
        <h2 style={{ marginTop: 14 }}>Nine services, one team.</h2>
        <p>Everything a growing brand needs to be seen — done properly, not spread thin.</p>
      </Reveal>

      <Reveal className="services-list">
        {services.map((s, i) => {
          const isOpen = open === i;
          const Icon = s.icon;
          return (
            <div key={s.title} className={`service-row ${isOpen ? 'open' : ''}`}>
              <button
                className="service-row-head"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="service-icon"><Icon /></span>
                <span className="service-row-title">
                  <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                </span>
                <span className="service-chevron"><Plus size={22} /></span>
              </button>
              <div className="service-row-body">
                <div className="service-row-body-inner">
                  <p>{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
