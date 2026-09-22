import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [showDone, setShowDone] = useState(false);

  const load = () => apiFetch('/api/tasks').then(setTasks);
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await apiFetch('/api/tasks', { method: 'POST', body: JSON.stringify({ title }) });
    setTitle('');
    load();
  };

  const toggle = async (t) => {
    await apiFetch(`/api/tasks/${t._id}`, { method: 'PUT', body: JSON.stringify({ done: !t.done }) });
    load();
  };

  const deleteAllDone = async () => {
    const done = tasks.filter((t) => t.done);
    if (!done.length) return;
    if (!confirm(`Delete ${done.length} completed task(s)? This can't be undone.`)) return;
    await Promise.all(done.map((t) => apiFetch(`/api/tasks/${t._id}`, { method: 'DELETE' })));
    load();
  };

  const visible = tasks.filter((t) => showDone || !t.done);
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="tasks">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <h2>Tasks</h2>
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
        <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button className="btn-primary" type="submit">Add</button>
      </form>

      <ul>
        {visible.map((t) => (
          <li key={t._id} className={t.done ? 'done' : ''}>
            <label><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</label>
          </li>
        ))}
        {visible.length === 0 && (
          <li style={{ color: 'var(--muted)', textAlign: 'center', border: 'none', background: 'none' }}>
            {tasks.length === 0 ? 'No tasks yet.' : 'All done — nothing pending.'}
          </li>
        )}
      </ul>
    </div>
  );
}
