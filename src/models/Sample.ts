import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['SCHEDULED', 'COLLECTED', 'DELAYED'],
      default: 'SCHEDULED',
    },
    patientInfo: {
      name: { type: String },
      patientId: { type: String },
    },
    collectedAt: {
      type: Date,
    },
    collectionLocation: {
    type: {
        lat: Number,
        lng: Number,
    },
    },
collectedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
  },
  { timestamps: true }
);

export default mongoose.model('Sample', sampleSchema);
