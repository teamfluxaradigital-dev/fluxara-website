import { useState } from 'react';
import { apiFetch } from '../api';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) return setError('Password should be at least 6 characters.');
    if (newPassword !== confirm) return setError("Passwords don't match.");
    setStatus('sending');
    try {
      await apiFetch('/api/auth/change-password', { method: 'POST', body: JSON.stringify({ newPassword }) });
      setStatus('done');
      setNewPassword('');
      setConfirm('');
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="tasks">
      <h2>Change password</h2>
      <form onSubmit={submit} style={{ maxWidth: 360, display: 'grid', gap: 14 }}>
        <input type="password" placeholder="New password" value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm new password" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        {status === 'done' && <p style={{ color: 'var(--teal)', fontSize: '.9rem' }}>Password updated.</p>}
        <button className="btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </div>
  );
}
