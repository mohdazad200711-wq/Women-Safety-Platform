import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  userId: String,
  latitude: Number,
  longitude: Number,
  status: {
    type: String,
    default: 'active'
  },
  volunteerId: String,
  volunteerName: String,
  volunteerLat: Number,
  volunteerLng: Number,
  acceptedAt: Date,
  photoEvidence: String,
  audioEvidence: String,
  voiceSOS: String,
  evidenceCapturedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Alert', AlertSchema);
