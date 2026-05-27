import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SOS from './pages/SOS';
import Profile from './pages/Profile';
import Volunteer from './pages/Volunteer';
import Admin from './pages/Admin';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <header className="site-header">
        <div className="page-container">
          <div className="navbar">
            <div>
              <h1>Women Safety Platform</h1>
              <p>Fast emergency alerts, verified volunteers, and real-time location sharing to keep women safe.</p>
            </div>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/sos">SOS</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/volunteer">Volunteer</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sos" element={<SOS />} />
        </Routes>
      </main>

      <footer className="footer">
        Built for safer travel, faster help, and trusted community response.
      </footer>
    </BrowserRouter>
  </SocketProvider>
  );
}

export default App;
