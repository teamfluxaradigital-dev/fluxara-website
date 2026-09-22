import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

const STATUSES = ['New', 'Contacted', 'In Progress', 'Won', 'Lost', 'Done'];

function downloadCSV(leads) {
  const headers = ['Name', 'Company', 'Email', 'Phone', 'Services', 'Message', 'Status', 'Created'];
  const rows = leads.map((l) => [
    l.name || '',
    l.company || '',
    l.email || '',
    l.phone || '',
    (l.services || []).join('; '),
    (l.message || '').replace(/\r?\n/g, ' '),
    l.status || '',
    l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-IN') : ''
  ]);

  const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fluxara-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showDone, setShowDone] = useState(false);

  useEffect(() => { apiFetch('/api/leads').then(setLeads); }, []);

  const updateStatus = async (id, status) => {
    await apiFetch(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    setLeads((l) => l.map((x) => (x._id === id ? { ...x, status } : x)));
  };

  const visible = showDone ? leads : leads.filter((l) => l.status !== 'Done');

  return (
    <div className="table-wrap">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Leads</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.9rem', color: 'var(--muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
            Show completed
          </label>
          <button className="btn-ghost" onClick={() => downloadCSV(leads)}>
            Export CSV
          </button>
        </div>
      </div>

      <table>
        <thead><tr><th>Name</th><th>Contact</th><th>Services</th><th>Message</th><th>Status</th></tr></thead>
        <tbody>
          {visible.map((l) => (
            <tr key={l._id} style={l.status === 'Done' ? { opacity: .5 } : undefined}>
              <td>{l.name}<br />{l.company}</td>
              <td>{l.email}<br />{l.phone}</td>
              <td>{l.services?.join(', ')}</td>
              <td>{l.message}</td>
              <td>
                <select value={l.status} onChange={(e) => updateStatus(l._id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr><td colSpan="5" style={{ color: 'var(--muted)', textAlign: 'center', padding: '24px 0' }}>No leads to show.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}