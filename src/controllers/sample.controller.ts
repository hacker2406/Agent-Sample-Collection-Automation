import { Request, Response } from 'express';
import Sample from '../models/Sample';
import dayjs from 'dayjs';
import DelayReport from '../models/DelayReport';

export const scheduleSample = async (req: any, res: Response) => {
  try {
    const { agentId, pickupTime, pickupLocation, patientInfo } = req.body;

    const sample = await Sample.create({
      agentId,
      hospitalId: req.user._id,
      pickupTime,
      pickupLocation,
      patientInfo,
    });

    res.status(201).json(sample);
  } catch (err) {
    res.status(500).json({ message: 'Failed to schedule sample' });
  }
};


export const getTodaysSamplesForAgent = async (req: any, res: Response) => {
  try {
    const agentId = req.user._id;

    const startOfDay = dayjs().startOf('day').toDate();
    const endOfDay = dayjs().endOf('day').toDate();

    const samples = await Sample.find({
      agentId,
      status: 'SCHEDULED',
      pickupTime: { $gte: startOfDay, $lte: endOfDay },
    }).populate('hospitalId', 'name');

    res.status(200).json(samples);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch today\'s samples' });
  }
};

export const markSampleCollected = async (req: any, res: Response) => {
  try {
    const sampleId = req.params.id;
    const { lat, lng } = req.body;
    const agentId = req.user._id;

    const sample = await Sample.findById(sampleId);
    if (!sample) return res.status(404).json({ message: 'Sample not found' });

    // Optional: Only allow agent assigned to it
    if (sample.agentId.toString() !== agentId.toString()) {
      return res.status(403).json({ message: 'Not authorized to collect this sample' });
    }

    sample.status = 'COLLECTED';
    sample.collectedAt = new Date();
    sample.collectionLocation = { lat, lng };
    sample.collectedBy = agentId;

    await sample.save();

    res.status(200).json({ message: 'Sample marked as collected', sample });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark sample as collected' });
  }
};

export const reportSampleDelay = async (req: any, res: Response) => {
  try {
    const { id: sampleId } = req.params;
    const { reason, newExpectedTime } = req.body;
    const agentId = req.user._id;

    const sample = await Sample.findById(sampleId);
    if (!sample) return res.status(404).json({ message: 'Sample not found' });

    if (sample.agentId.toString() !== agentId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const delayReport = await DelayReport.create({
      sampleId,
      agentId,
      reason,
      newExpectedTime,
    });

    sample.status = 'DELAYED';
    await sample.save();

    res.status(201).json({
      message: 'Delay reported successfully',
      delayReport,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error reporting delay' });
  }
};

export const getSamplesForHospital = async (req: any, res: Response) => {
  try {
    const hospitalId = req.user._id;

    // Only hospital can access this route
    if (req.user.role !== 'HOSPITAL') {
      return res.status(403).json({ message: 'Only hospitals can access this route' });
    }

    const samples = await Sample.find({ hospitalId })
      .populate('agentId', 'name email')
      .sort({ scheduledTime: 1 });

    res.status(200).json({ samples });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hospital samples' });
  }
};
