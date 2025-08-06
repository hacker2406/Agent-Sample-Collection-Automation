import { Request, Response } from 'express';
import Sample from '../models/Sample';

export const getAgentPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: 'Please provide from and to date range' });
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    // Fetch samples in date range
    const samples = await Sample.find({
      agentId: id,
      scheduledTime: { $gte: fromDate, $lte: toDate },
    });

    const total = samples.length;
    const collected = samples.filter(s => s.status === 'COLLECTED').length;
    const delayed = samples.filter(s => s.status === 'DELAYED').length;
    const onTime = collected - delayed;

    res.status(200).json({
      total,
      collected,
      delayed,
      onTime,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get agent performance' });
  }
};
