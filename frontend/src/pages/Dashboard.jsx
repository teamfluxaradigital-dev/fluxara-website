import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Leads from '../components/Leads';
import Tasks from '../components/Tasks';
import CalendarView from '../components/CalendarView';
import TeamManage from '../components/TeamManage';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const nav = useNavigate();
  const logout = () => { localStorage.clear(); nav('/team'); };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <img src={logo} alt="Fluxara" />
        <Link to="">Leads</Link>
        <Link to="tasks">Tasks</Link>
        <Link to="calendar">Calendar</Link>
        {user.role === 'admin' && <Link to="team">Team</Link>}
        <button onClick={logout}>Log out</button>
      </aside>
      <main>
        <Routes>
          <Route index element={<Leads />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<CalendarView />} />
          {user.role === 'admin' && <Route path="team" element={<TeamManage />} />}
        </Routes>
      </main>
    </div>
  );
}
