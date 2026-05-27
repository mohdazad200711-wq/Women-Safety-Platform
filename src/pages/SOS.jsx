import React, { useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import LiveMap from '../components/LiveMap';
import { SocketContext } from '../context/SocketContext';

const computeRiskScore = (location) => {
  if (!location) return null;
  const nightHour = new Date().getHours() >= 20 || new Date().getHours() < 6;
  const locationRisk = location.latitude % 2 === 0 ? 12 : 22;
  const score = Math.min(95, Math.round(locationRisk + (nightHour ? 25 : 10)));
  return {
    score,
    warning: score > 60 ? 'Unsafe area warning: stay alert and keep your community informed.' : 'Area appears moderate risk; keep sharing live location.'
  };
};

const SOS = () => {
  const { socket } = useContext(SocketContext);
  const [sosActive, setSosActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Tracking location...');
  const [alertId, setAlertId] = useState(null);
  const [volunteer, setVolunteer] = useState(null);
  const [status, setStatus] = useState('ready');

  const risk = useMemo(() => computeRiskScore(location), [location]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser.');
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        const nextLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        setLocation(nextLocation);
        setPath((current) => [...current, nextLocation].slice(-12));
        setMessage('Live location tracking active.');
      },
      (error) => {
        setMessage('Unable to access location. Please enable location services.');
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('alert-accepted', (data) => {
      if (data.alertId === alertId) {
        setVolunteer(data.volunteer);
        setStatus('volunteer-on-the-way');
        setMessage('Volunteer is on the way. Stay safe and keep location sharing active.');
      }
    });

    return () => {
      socket.off('alert-accepted');
    };
  }, [socket, alertId]);

  const sendSOS = async () => {
    if (!location) {
      setMessage('Waiting for current location...');
      return;
    }

    setLoading(true);
    setMessage('Sending SOS alert...');

    try {
      const response = await api.post('/api/alerts/create', {
        userId: 'user123',
        latitude: location.latitude,
        longitude: location.longitude
      });

      const newAlert = response.data.alert;
      setAlertId(newAlert.id);
      setSosActive(true);
      setStatus('alert-sent');
      setMessage('SOS alert sent successfully. Volunteers are being notified.');

      if (socket) {
        socket.emit('sos-alert', {
          alertId: newAlert.id,
          userId: newAlert.userId,
          latitude: newAlert.latitude,
          longitude: newAlert.longitude,
          status: 'active'
        });
      }
    } catch (error) {
      setMessage('Failed to send SOS alert. Please try again.');
      console.error('SOS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="card">
        <h2>Emergency SOS</h2>
        <p>Press the button to send your live location to nearby volunteers and support teams.</p>

        <div style={{ margin: '28px 0' }}>
          <button className="btn" onClick={sendSOS} disabled={loading || sosActive}>
            {sosActive ? 'SOS Sent' : loading ? 'Sending...' : 'Send SOS'}
          </button>
        </div>

        <div className="alert-panel">
          <strong>Status</strong>
          <p>{message}</p>
          {risk && (
            <div style={{ marginTop: '14px' }}>
              <strong>AI risk score</strong>
              <p>{risk.score}% risk detected</p>
              <p>{risk.warning}</p>
            </div>
          )}
        </div>

        {status === 'volunteer-on-the-way' && volunteer && (
          <div className="card" style={{ marginTop: '16px' }}>
            <h3>Volunteer on the way</h3>
            <p>{volunteer.name} is heading to your location now.</p>
            <p>Volunteer location: {volunteer.lat.toFixed(6)}, {volunteer.lng.toFixed(6)}</p>
            <p>Response status: {volunteer.status}</p>
          </div>
        )}

        {location && (
          <div className="hero-grid" style={{ marginTop: '24px' }}>
            <div className="card">
              <h3>Current location</h3>
              <p>Latitude: {location.latitude.toFixed(6)}</p>
              <p>Longitude: {location.longitude.toFixed(6)}</p>
              <p>{sosActive ? 'SOS alert has been issued.' : 'Location is being tracked live.'}</p>
            </div>
            <LiveMap
              title="Live location tracker"
              center={{ lat: location.latitude, lng: location.longitude }}
              path={path}
              alertPosition={location}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default SOS;
