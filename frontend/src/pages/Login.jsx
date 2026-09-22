import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';
import logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { token, user } = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      nav('/dashboard');
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Backend not reachable — start it with `npm start` in the backend folder.'
          : 'Email or password is incorrect.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="login">
      <div className="login-card">
        <img src={logo} alt="Fluxara" />
        <h2>Team login</h2>
        <p className="sub">Sign in to see leads, tasks and the calendar.</p>
        <a href="/" className="back-to-site">← Back to website</a>
        <form onSubmit={submit}>
          <input required placeholder="Email" autoComplete="username"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="Password" autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button className="btn-primary" type="submit" disabled={busy}>
            {busy ? <><span className="spinner" /> Signing in</> : 'Log in'}
          </button>
        </form>
      </div>
    </section>
  );
}
