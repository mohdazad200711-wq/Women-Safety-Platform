import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './server/config/db.js';
import authRoutes from './server/routes/authRoutes.js';
import alertRoutes from './server/routes/alertRoutes.js';
import Alert from './server/models/Alert.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
});

// Connect to MongoDB (if MONGO_URI is set)
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sos-alert', (data) => {
    console.log('SOS Alert received:', data);
    // Broadcast to all connected volunteers
    io.emit('new-sos-alert', data);
  });

  socket.on('accept-alert', async (data) => {
    console.log('Alert accepted by volunteer:', data);

    try {
      const alertId = data.alertId;
      const volunteer = data.volunteer;

      await Alert.findByIdAndUpdate(alertId, {
        status: 'accepted',
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
        volunteerLat: volunteer.lat,
        volunteerLng: volunteer.lng,
        acceptedAt: new Date()
      });

      io.emit('alert-accepted', {
        alertId,
        volunteer
      });
    } catch (error) {
      console.error('Error updating alert status when accepted:', error);
    }
  });

  socket.on('location-update', (data) => {
    console.log('Location update:', data);
    // Broadcast location to relevant users
    io.emit('user-location', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
