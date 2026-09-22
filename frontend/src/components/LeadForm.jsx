import { useState } from 'react';
import { apiFetch } from '../api';

const SERVICES = [
  'Reels & video production',
  'Social media posts',
  'Website development',
  'AI automation'
];

const EMPTY = { name: '', email: '', phone: '', company: '', services: [], message: '' };

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleService = (s) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s]
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setError('');
    setStatus('sending');
    try {
      await apiFetch('/api/leads', { method: 'POST', body: JSON.stringify(form) });
      setStatus('sent');
    } catch (err) {
      // This is why the button "did nothing" before: the request was failing and
      // nothing on screen ever said so.
      setStatus('idle');
      setError(
        err.message === 'Failed to fetch'
          ? "Can't reach the server. Make sure the backend is running on port 5000."
          : err.message || 'Something went wrong. Try again in a moment.'
      );
    }
  };

  if (status === 'sent') {
    return (
      <section id="contact" className="lead-form">
        <div className="form-card form-sent">
          <div className="tick">✓</div>
          <h3>Message sent</h3>
          <p>Thanks {form.name.split(' ')[0]} — we'll get back to you within a day.</p>
          <button className="btn-ghost" onClick={() => { setForm(EMPTY); setStatus('idle'); }}>
            Send another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="lead-form">
      <div className="section-head">
        <span className="mono-label">04 · Get in touch</span>
        <h2 style={{ marginTop: 14 }}>Let's build something loud.</h2>
        <p>Tell us what you're working on. We'll come back with a plan and a price.</p>
      </div>

      <div className="form-card">
        <form onSubmit={submit} noValidate={false}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="lf-name">Full name</label>
              <input id="lf-name" type="text" required autoComplete="name"
                placeholder="Jiya Sharma" value={form.name} onChange={set('name')} />
            </div>
            <div className="field">
              <label htmlFor="lf-email">Email</label>
              <input id="lf-email" type="email" required autoComplete="email"
                placeholder="you@example.com" value={form.email} onChange={set('email')} />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="lf-phone">Phone</label>
              <input id="lf-phone" type="tel" required autoComplete="tel"
                placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
            </div>
            <div className="field">
              <label htmlFor="lf-company">Company or brand</label>
              <input id="lf-company" type="text" autoComplete="organization"
                placeholder="Optional" value={form.company} onChange={set('company')} />
            </div>
          </div>

          <div className="field">
            <label>What do you need?</label>
            <div className="services-select">
              {SERVICES.map((s) => (
                <label key={s} className={`chip ${form.services.includes(s) ? 'on' : ''}`}>
                  <input type="checkbox" checked={form.services.includes(s)}
                    onChange={() => toggleService(s)} />
                  <span className="dot" />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="lf-msg">Tell us about your project</label>
            <textarea id="lf-msg" placeholder="What are you trying to get done, and by when?"
              value={form.message} onChange={set('message')} />
          </div>

          {error && (
            <p className="form-error"><b>Couldn't send.</b> {error}</p>
          )}

          <button className="btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? <><span className="spinner" /> Sending</> : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
}
