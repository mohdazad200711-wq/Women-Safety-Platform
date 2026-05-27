import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMap = ({ center, path = [], volunteerPosition, alertPosition, zoom = 13, title }) => {
  const track = useMemo(() => path.map((item) => [item.latitude, item.longitude]), [path]);

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: '24px' }}>
        <h3>{title}</h3>
      </div>
      <div style={{ height: '360px', width: '100%' }}>
        <MapContainer center={[center.lat, center.lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CircleMarker
            center={[center.lat, center.lng]}
            radius={10}
            pathOptions={{ color: '#dc2626', fillColor: '#fca5a5', fillOpacity: 1 }}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
              Current location
            </Tooltip>
          </CircleMarker>
          {volunteerPosition && (
            <CircleMarker
              center={[volunteerPosition.lat, volunteerPosition.lng]}
              radius={8}
              pathOptions={{ color: '#2563eb', fillColor: '#93c5fd', fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                Volunteer
              </Tooltip>
            </CircleMarker>
          )}
          {alertPosition && (
            <CircleMarker
              center={[alertPosition.lat, alertPosition.lng]}
              radius={8}
              pathOptions={{ color: '#16a34a', fillColor: '#86efac', fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                Alert location
              </Tooltip>
            </CircleMarker>
          )}
          {track.length > 1 && <Polyline positions={track} pathOptions={{ color: '#2563eb' }} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
