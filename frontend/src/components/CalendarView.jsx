import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', client: '', date: '', notes: '' });

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

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <form onSubmit={add}>
        <input required placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Client / brand" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
        <input required type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button className="btn-primary" type="submit">Add event</button>
      </form>
      <ul>
        {events.map((ev) => (
          <li key={ev._id} className={ev.done ? 'done' : ''}>
            <strong>{new Date(ev.date).toLocaleString()}</strong> — {ev.title} {ev.client && `(${ev.client})`}
            <label><input type="checkbox" checked={ev.done} onChange={() => toggle(ev)} /> Done</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
