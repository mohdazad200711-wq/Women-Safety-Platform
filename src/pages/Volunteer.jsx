import React, { useContext, useEffect, useMemo, useState } from 'react';
import LiveMap from '../components/LiveMap';
import { SocketContext } from '../context/SocketContext';
import api from '../services/api';

const volunteerPosition = { lat: 28.6313, lng: 77.2170 };
const volunteerId = 'volunteer123';
const volunteerName = 'Priya';

const Volunteer = () => {
  const { socket, connected } = useContext(SocketContext);
  const [alerts, setAlerts] = useState([]);
  const [acceptedAlert, setAcceptedAlert] = useState(null);
  const [message, setMessage] = useState('Ready to receive SOS alerts.');

  const routePath = useMemo(() => {
    if (!acceptedAlert) return [volunteerPosition];
    return [volunteerPosition, { lat: acceptedAlert.latitude, lng: acceptedAlert.longitude }];
  }, [acceptedAlert]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new-sos-alert', (data) => {
      setAlerts((current) => [...current, data]);
      setMessage('New SOS request received. Review nearby alerts below.');
    });

    socket.on('alert-accepted', (data) => {
      setAlerts((current) => current.filter((alert) => alert.alertId !== data.alertId));
      if (acceptedAlert && acceptedAlert.alertId === data.alertId) {
        setAcceptedAlert((prev) => ({ ...prev, status: 'accepted' }));
      }
    });

    return () => {
      socket.off('new-sos-alert');
      socket.off('alert-accepted');
    };
  }, [socket, acceptedAlert]);

  const acceptAlert = async (alert) => {
    const updatedVolunteer = {
      volunteerId,
      volunteerName,
      volunteerLat: volunteerPosition.lat,
      volunteerLng: volunteerPosition.lng
    };

    try {
      await api.put(`/api/alerts/${alert.alertId}/accept`, updatedVolunteer);

      setAcceptedAlert({ ...alert, volunteerName, status: 'accepted' });
      setAlerts((current) => current.filter((item) => item.alertId !== alert.alertId));
      setMessage('You accepted the alert. The user will be notified that a volunteer is on the way.');

      if (socket) {
        socket.emit('accept-alert', {
          alertId: alert.alertId,
          volunteer: {
            id: volunteerId,
            name: volunteerName,
            lat: volunteerPosition.lat,
            lng: volunteerPosition.lng,
            status: 'on the way'
          }
        });
      }
    } catch (error) {
      console.error('Accept alert error:', error);
      setMessage('Failed to accept alert, please retry.');
    }
  };

  return (
    <main>
      <section className="section">
        <div className="card">
          <h2>Volunteer Support Dashboard</h2>
          <p>Join the verified volunteer network and help women in need by accepting nearby emergency alerts.</p>
          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button className="btn" type="button">Register as Volunteer</button>
            <button className="btn btn-secondary" type="button">View Dashboard</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="alert-panel">
          <strong>Live socket status</strong>
          <p>{connected ? 'Connected to alert network' : 'Waiting for socket connection...'}</p>
          <p>{message}</p>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>Verification</strong>
            <p>Complete volunteer registration and verification to earn trust from users.</p>
          </div>
          <div className="stat-card">
            <strong>Nearby Alerts</strong>
            <p>Receive urgent requests from nearby users with incident details and location info.</p>
          </div>
          <div className="stat-card">
            <strong>Accept or Decline</strong>
            <p>Choose the requests you can respond to and keep the system updated.</p>
          </div>
          <div className="stat-card">
            <strong>Response Status</strong>
            <p>Update your progress so the user and support team know you are on the way.</p>
          </div>
        </div>
      </section>

      <section className="section">
        {alerts.length > 0 ? (
          <div className="card">
            <h3>Incoming SOS requests</h3>
            {alerts.map((alert) => (
              <div key={alert.alertId} className="alert-panel" style={{ marginBottom: '16px' }}>
                <p><strong>Location:</strong> {alert.latitude.toFixed(6)}, {alert.longitude.toFixed(6)}</p>
                <p><strong>Status:</strong> {alert.status || 'active'}</p>
                <button className="btn" type="button" onClick={() => acceptAlert(alert)}>
                  Accept request
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <h3>No open SOS requests</h3>
            <p>Waiting for nearby users to request assistance.</p>
          </div>
        )}
      </section>

      <section className="section">
        <LiveMap
          title="Volunteer support map"
          center={volunteerPosition}
          volunteerPosition={volunteerPosition}
          alertPosition={acceptedAlert ? { lat: acceptedAlert.latitude, lng: acceptedAlert.longitude } : undefined}
          path={routePath}
        />
      </section>

      {acceptedAlert && (
        <section className="section">
          <div className="card">
            <h3>Accepted SOS request</h3>
            <p>Responding to the alert at {acceptedAlert.latitude.toFixed(6)}, {acceptedAlert.longitude.toFixed(6)}</p>
            <p>Keep the user updated while heading to their location.</p>
          </div>
        </section>
      )}

      <section className="section">
        <div className="alert-panel">
          <strong>Future roadmap</strong>
          <p>The app now supports volunteer acceptance, real-time notification, and on-the-way status updates.</p>
          <ul className="feature-list" style={{ marginTop: '20px' }}>
            <li>Accept or decline alerts directly from the dashboard</li>
            <li>See incident severity and safe zone routing</li>
            <li>Receive priority alerts based on proximity and response ability</li>
            <li>Instant volunteer alert delivery via Socket.IO for realtime SOS updates</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Volunteer;
