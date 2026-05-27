import React from 'react';

const Admin = () => {
  return (
    <main>
      <section className="section">
        <div className="card">
          <h2>Admin Control Center</h2>
          <p>Manage users, volunteers, alerts, safety zones and incident reports from one central interface.</p>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>Users</strong>
            <p>View and manage registered platform users, volunteers, and support teams.</p>
          </div>
          <div className="stat-card">
            <strong>Alerts</strong>
            <p>Monitor incoming emergency alerts for coordination and audit purposes.</p>
          </div>
          <div className="stat-card">
            <strong>Verification</strong>
            <p>Verify volunteer credentials and approve support team responders.</p>
          </div>
          <div className="stat-card">
            <strong>Zones</strong>
            <p>Manage safe zones, resource locations, and coverage areas for faster response.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h3>Incident and performance reports</h3>
          <p>Track response time, alert volume, and operational performance to improve safety outcomes.</p>
        </div>
      </section>

      <section className="section">
        <div className="alert-panel">
          <strong>Future admin enhancements</strong>
          <p>Admin tools will expand to include automated alert routing, zone heatmaps, responder compliance tracking, and advanced reporting dashboards.</p>
        </div>
      </section>
    </main>
  );
};

export default Admin;
