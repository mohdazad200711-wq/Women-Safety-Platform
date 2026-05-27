import React from 'react';
import { Link } from 'react-router-dom';
import RequirementCard from '../components/RequirementCard';

const Home = () => {
  return (
    <main>
      <section className="section">
        <div className="card">
          <h2>Welcome to the Women Safety Platform</h2>
          <p>Emergency assistance for women with one-click SOS alerts, real-time location sharing, and verified support coordination.</p>
          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <Link className="btn" to="/sos">Send SOS</Link>
            <Link className="btn btn-secondary" to="/register">Create Account</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Why this platform matters</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Fast Emergency Response</h3>
            <p>Trigger an alert instantly and share your location with nearby volunteers and trusted responders.</p>
          </div>
          <div className="card">
            <h3>Verified Support Network</h3>
            <p>Connect with registered volunteers, support teams, and authorities when you need help the most.</p>
          </div>
          <div className="card">
            <h3>Safe Zone Awareness</h3>
            <p>View nearby support resources and safety zones so you can stay secure during travel and late hours.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Project summary</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Deliverables</h3>
            <p>Functional web app, admin dashboards, documentation, and a deployment-ready build.</p>
          </div>
          <div className="card">
            <h3>Expected Impact</h3>
            <p>Faster emergency assistance, stronger community safety, better personal confidence, and reduced response times.</p>
          </div>
          <div className="card">
            <h3>Future enhancements</h3>
            <p>Mobile SOS widget, police/ambulance integration, voice alerts, wearable support, and AI risk detection.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Core platform features</h2>
        <ul className="feature-list">
          <li>User registration and secure login</li>
          <li>Personal safety profile with trusted contacts</li>
          <li>One-click SOS alert with live location sharing</li>
          <li>Nearby support teams and safe zones</li>
          <li>Emergency alert history and incident tracking</li>
          <li>Volunteer and support team verification workflows</li>
          <li>Real-time assistance request handling for volunteers</li>
          <li>Admin management of users, alerts, and safe zones</li>
          <li>Incident and response performance reporting</li>
          <li>Responsive web access on phone and desktop</li>
        </ul>
      </section>

      <section className="section">
        <h2>User flow (high-level)</h2>
        <ul className="feature-list">
          <li>User registers and completes a safety profile</li>
          <li>Adds a trusted emergency contact</li>
          <li>Taps the SOS button in an emergency</li>
          <li>Alert is sent with live location</li>
          <li>Nearby volunteers and support teams are notified</li>
          <li>Responder accepts and moves to assist</li>
          <li>Incident is tracked and closed once resolved</li>
        </ul>
        <p style={{ marginTop: '16px', color: '#475569' }}>
          This is your project roadmap for a safer emergency response experience, with future features already planned.
        </p>
      </section>

      <section className="section">
        <h2>Data requirements</h2>
        <div className="hero-grid">
          <RequirementCard
            title="Core entities"
            items={[
              'Users',
              'Emergency Contacts',
              'Volunteers',
              'Alerts',
              'Locations',
              'Safety Resources'
            ]}
          />
          <RequirementCard
            title="Service data"
            items={[
              'User ID',
              'Alert Timestamp',
              'Live Location',
              'Alert Status',
              'Responder Assigned'
            ]}
            description="Sample data fields that support the alert workflow and reporting."
          />
        </div>
      </section>

      <section className="section">
        <h2>Key performance indicators</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Registered users</h3>
            <p>Track the number of users registered on the platform.</p>
          </div>
          <div className="card">
            <h3>Emergency alerts</h3>
            <p>Monitor how many alerts are triggered across the system.</p>
          </div>
          <div className="card">
            <h3>Average response time</h3>
            <p>Measure the speed of volunteer and support team responses.</p>
          </div>
        </div>
        <div className="hero-grid" style={{ marginTop: '24px' }}>
          <div className="card">
            <h3>Successful assistance rate</h3>
            <p>Track the percentage of incidents resolved successfully.</p>
          </div>
          <div className="card">
            <h3>Volunteer response rate</h3>
            <p>Measure the share of alerts accepted by nearby volunteers.</p>
          </div>
          <div className="card">
            <h3>Monthly active users</h3>
            <p>Monitor platform engagement by active monthly users.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Assumptions & constraints</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Assumptions</h3>
            <ul className="feature-list">
              <li>Volunteers and support teams are verified</li>
              <li>Users keep emergency details updated</li>
              <li>Internet connectivity is available during emergencies</li>
            </ul>
          </div>
          <div className="card">
            <h3>Constraints</h3>
            <ul className="feature-list">
              <li>No direct law enforcement integration in Phase 1</li>
              <li>Fixed development timeline and budget</li>
              <li>Web-only platform initially</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Deliverables</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Functional web application</h3>
          </div>
          <div className="card">
            <h3>Admin dashboards</h3>
          </div>
          <div className="card">
            <h3>PRD & technical documentation</h3>
          </div>
          <div className="card">
            <h3>Deployment-ready build</h3>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Expected impact</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Faster emergency assistance</h3>
            <p>Enable quicker safety response for women in dangerous situations.</p>
          </div>
          <div className="card">
            <h3>Increased confidence</h3>
            <p>Help users feel safer with a reliable support network.</p>
          </div>
          <div className="card">
            <h3>Community safety network</h3>
            <p>Strengthen local volunteer and support team coordination.</p>
          </div>
          <div className="card">
            <h3>Reduced response time</h3>
            <p>Improve outcomes in critical emergencies.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Future quality goals</h2>
        <div className="hero-grid">
          <div className="card">
            <h3>Performance</h3>
            <p>Emergency alerts delivered within seconds for faster coordination and response.</p>
          </div>
          <div className="card">
            <h3>Security</h3>
            <p>Encrypted user data, secure authentication, and role-based access for all users.</p>
          </div>
          <div className="card">
            <h3>Usability</h3>
            <p>Panic-friendly UI with minimal interaction, so help is always just one action away.</p>
          </div>
          <div className="card">
            <h3>Scalability</h3>
            <p>Designed to handle high concurrent emergency requests as the platform grows.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>What we're building next</h2>
        <div className="feature-list">
          <li>24/7 incident dispatch and live volunteer coordination</li>
          <li>Wearable alert integration for safer travel and quick panic response</li>
          <li>Offline emergency caching so users can still raise alerts without full connectivity</li>
          <li>Higher-priority alert escalation for the most urgent cases</li>
          <li>Multi-language support to reach more communities</li>
          <li>Mobile application with SOS widget</li>
          <li>Integration with police and ambulance services</li>
          <li>Voice-activated SOS alerts</li>
          <li>Wearable device support</li>
          <li>AI-based risk detection and prediction</li>
          <li>Real-time SOS notification using Socket.IO for instant volunteer alerts</li>
        </div>
      </section>
    </main>
  );
};

export default Home;
