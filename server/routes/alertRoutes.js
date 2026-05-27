import express from 'express';
import Alert from '../models/Alert.js';
import protect from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create', protect, async (req, res) => {
  try {
    const { latitude, longitude, photoEvidence, audioEvidence, voiceSOS } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const newAlert = new Alert({
      userId: req.user._id,
      latitude,
      longitude,
      status: 'active',
      photoEvidence,
      audioEvidence,
      voiceSOS,
      evidenceCapturedAt: new Date()
    });

    await newAlert.save();

    res.status(201).json({
      message: 'SOS Alert Created',
      alert: {
        id: newAlert._id,
        userId: newAlert.userId,
        latitude: newAlert.latitude,
        longitude: newAlert.longitude,
        status: newAlert.status,
        createdAt: newAlert.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Alert creation error', error: error.message });
  }
});

router.get('/active', protect, async (req, res) => {
  try {
    const activeAlerts = await Alert.find({ status: 'active' });
    res.json({ alerts: activeAlerts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts', error: error.message });
  }
});

router.put('/:id/accept', protect, async (req, res) => {
  try {
    const { volunteerId, volunteerName, volunteerLat, volunteerLng } = req.body;
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: 'accepted',
        volunteerId,
        volunteerName,
        volunteerLat,
        volunteerLng,
        acceptedAt: new Date()
      },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ message: 'Alert accepted', alert });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting alert', error: error.message });
  }
});

router.put('/:id/resolve', protect, requireRole('admin'), async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved' },
      { new: true }
    );
    res.json({ message: 'Alert resolved', alert });
  } catch (error) {
    res.status(500).json({ message: 'Error resolving alert', error: error.message });
  }
});

router.get('/analytics', protect, requireRole('admin'), async (req, res) => {
  try {
    const activeAlerts = await Alert.countDocuments({ status: 'active' });
    const acceptedAlerts = await Alert.countDocuments({ status: 'accepted' });
    const resolvedAlerts = await Alert.countDocuments({ status: 'resolved' });
    const averageResponseTime = await Alert.aggregate([
      { $match: { status: 'accepted', acceptedAt: { $exists: true } } },
      { $project: { responseTimeMs: { $subtract: ['$acceptedAt', '$createdAt'] } } },
      { $group: { _id: null, avgResponseTimeMs: { $avg: '$responseTimeMs' } } }
    ]);

    res.json({
      activeAlerts,
      acceptedAlerts,
      resolvedAlerts,
      averageResponseTimeMs: averageResponseTime[0]?.avgResponseTimeMs || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

export default router;
