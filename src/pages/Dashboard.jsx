import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main>
      <section className="section">
        <div className="card">
          <h2>Your Safety Dashboard</h2>
          <p>Access your personal safety metrics, emergency contacts, nearby assistance, and alert history.</p>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>2.4K</strong>
            <p>Registered users</p>
          </div>
          <div className="stat-card">
            <strong>312</strong>
            <p>Alerts triggered</p>
          </div>
          <div className="stat-card">
            <strong>4.2 min</strong>
            <p>Average response time</p>
          </div>
          <div className="stat-card">
            <strong>92%</strong>
            <p>Successful assistance rate</p>
          </div>
          <div className="stat-card">
            <strong>78%</strong>
            <p>Volunteer response rate</p>
          </div>
          <div className="stat-card">
            <strong>1.1K</strong>
            <p>Monthly active users</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>14</strong>
            <p>Alerts raised</p>
          </div>
          <div className="stat-card">
            <strong>5</strong>
            <p>Safe zones nearby</p>
          </div>
          <div className="stat-card">
            <strong>9</strong>
            <p>Support teams available</p>
          </div>
          <div className="stat-card">
            <strong>4</strong>
            <p>Trusted contacts</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="hero-grid">
          <div className="card">
            <h3>Personal Safety Profile</h3>
            <p>Keep your name, location, and emergency contacts ready for faster help.</p>
            <Link className="btn btn-secondary" to="/profile">Manage Profile</Link>
          </div>
          <div className="card">
            <h3>Live Location Sharing</h3>
            <p>During emergencies, your location can be shared instantly with authorities and volunteers.</p>
          </div>
          <div className="card">
            <h3>One-Click SOS</h3>
            <p>Press the SOS button when help is needed immediately, then stay informed while support is en route.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Nearby Support and Safe Zones</h2>
        <div className="feature-list">
          <li>Metro station police help desk</li>
          <li>24/7 women’s help center</li>
          <li>Community safety hub</li>
          <li>Mobile health clinic point</li>
        </div>
      </section>

      <section className="section">
        <div className="alert-panel">
          <strong>Emergency alert history</strong>
          <p>22 May 2026 — SOS sent from Sector 14, help team arrived in 4 minutes.</p>
          <p>18 May 2026 — Safe zone reached at the community hub, no follow-up needed.</p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
