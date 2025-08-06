import express from 'express';
import { scheduleSample } from '../controllers/sample.controller';
import { authenticate } from '../middlewares/authenticate';
import { hospitalOnly } from '../middlewares/role';
import { getTodaysSamplesForAgent,markSampleCollected,reportSampleDelay,getSamplesForHospital} from '../controllers/sample.controller';

const router = express.Router();

router.post('/', authenticate, hospitalOnly, scheduleSample);
router.get('/agent/me', authenticate, getTodaysSamplesForAgent);
router.put('/:id/collect', authenticate, markSampleCollected);
router.post('/:id/delay', authenticate, reportSampleDelay);
router.get('/hospital/me', authenticate, getSamplesForHospital);


export default router;
