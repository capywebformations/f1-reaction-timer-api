import { Response } from 'express';
import TimerService from '../services/timer.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

class TimerController {
    static async submitReactionTime(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user) throw new Error('User not authenticated');
            const reactionTime = await TimerService.submitReactionTime(req.user.id, req.body.time);
            res.status(201).json(reactionTime);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'An error occurred' });
        }
    }

    static async getReactionTimes(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user) throw new Error('User not authenticated');
            const times = await TimerService.getReactionTimes(req.user.id); // Use user ID from token
            res.status(200).json(times);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'An error occurred' });
        }
    }
}

export default TimerController;
