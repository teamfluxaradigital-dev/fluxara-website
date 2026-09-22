import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function TeamManage() {
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });

  const load = () => apiFetch('/api/auth/team').then(setTeam);
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await apiFetch('/api/auth/team', { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', email: '', password: '', role: 'member' });
    load();
  };

  const remove = async (id) => {
    await apiFetch(`/api/auth/team/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="team">
      <h2>Team members</h2>
      <form onSubmit={add}>
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Temporary password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="member">Team member</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn-primary" type="submit">Add member</button>
      </form>
      <ul>
        {team.map((t) => (
          <li key={t._id}>{t.name} — {t.email} ({t.role}) <button onClick={() => remove(t._id)}>Remove</button></li>
        ))}
      </ul>
    </div>
  );
}
