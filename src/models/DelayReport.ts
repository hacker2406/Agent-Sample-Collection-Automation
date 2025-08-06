import mongoose from 'mongoose';

const delayReportSchema = new mongoose.Schema(
  {
    sampleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sample',
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    newExpectedTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const DelayReport = mongoose.model('DelayReport', delayReportSchema);
export default DelayReport;
