import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', client: '', date: '', notes: '' });
  const [showDone, setShowDone] = useState(false);

  const load = () => apiFetch('/api/events').then(setEvents);
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await apiFetch('/api/events', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', client: '', date: '', notes: '' });
    load();
  };

  const toggle = async (ev) => {
    await apiFetch(`/api/events/${ev._id}`, { method: 'PUT', body: JSON.stringify({ done: !ev.done }) });
    load();
  };

  const deleteAllDone = async () => {
    const done = events.filter((ev) => ev.done);
    if (!done.length) return;
    if (!confirm(`Delete ${done.length} completed event(s)? This can't be undone.`)) return;
    await Promise.all(done.map((ev) => apiFetch(`/api/events/${ev._id}`, { method: 'DELETE' })));
    load();
  };

  const visible = events.filter((ev) => showDone || !ev.done);
  const doneCount = events.filter((ev) => ev.done).length;

  return (
    <div className="calendar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <h2>Calendar</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.9rem', color: 'var(--muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
            Show completed ({doneCount})
          </label>
          {doneCount > 0 && (
            <button className="btn-ghost" onClick={deleteAllDone}>Delete all completed</button>
          )}
        </div>
      </div>

      <form onSubmit={add}>
        <input required placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Client / brand" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
        <input required type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button className="btn-primary" type="submit">Add event</button>
      </form>

      <ul>
        {visible.map((ev) => (
          <li key={ev._id} className={ev.done ? 'done' : ''}>
            <span className="event-info">
              <strong>{new Date(ev.date).toLocaleString()}</strong> — {ev.title} {ev.client && `(${ev.client})`}
            </span>
            <label className="event-done-toggle">
              <input type="checkbox" checked={ev.done} onChange={() => toggle(ev)} />
              Done
            </label>
          </li>
        ))}
        {visible.length === 0 && (
          <li style={{ color: 'var(--muted)', textAlign: 'center', border: 'none', background: 'none' }}>
            {events.length === 0 ? 'No events yet.' : 'All done — nothing pending.'}
          </li>
        )}
      </ul>
    </div>
  );
}
