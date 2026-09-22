import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

function getStatus(t) {
  if (t.done) return 'done';
  if (!t.dueDate) return 'normal';
  const due = new Date(t.dueDate);
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  if (due < now) return 'overdue';           // red — past due date
  if (due - now <= oneDay) return 'soon';     // yellow — due within 1 day
  return 'normal';
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDone, setShowDone] = useState(false);

  const load = () => apiFetch('/api/tasks').then(setTasks);
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await apiFetch('/api/tasks', { method: 'POST', body: JSON.stringify({ title, dueDate: dueDate || null }) });
    setTitle('');
    setDueDate('');
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
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button className="btn-primary" type="submit">Add</button>
      </form>

      <ul>
        {visible.map((t) => {
          const status = getStatus(t);
          return (
            <li key={t._id} className={`task-status-${status}`}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
                {t.title}
                {t.dueDate && (
                  <span className="task-due">
                    Due {new Date(t.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </label>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li style={{ color: 'var(--muted)', textAlign: 'center', border: 'none', background: 'none' }}>
            {tasks.length === 0 ? 'No tasks yet.' : 'All done — nothing pending.'}
          </li>
        )}
      </ul>
    </div>
  );
}
