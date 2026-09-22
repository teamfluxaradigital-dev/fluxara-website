import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

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

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <form onSubmit={add}>
        <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button className="btn-primary" type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.done ? 'done' : ''}>
            <label><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
