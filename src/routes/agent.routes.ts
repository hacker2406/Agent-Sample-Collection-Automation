import express from 'express';
import { getAgentPerformance } from '../controllers/agent.controller';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

router.get('/:id/performance', authenticate, getAgentPerformance);

export default router;
