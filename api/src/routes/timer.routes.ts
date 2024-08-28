import { Router } from 'express';
import TimerController from '../controllers/timer.controller';
import {
  authenticate,
  AuthenticatedRequest,
} from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Timer
 *   description: Reaction time management
 */

/**
 * @swagger
 * /timer/submit-reaction-time:
 *   post:
 *     summary: Submit a reaction time
 *     tags: [Timer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - time
 *             properties:
 *               time:
 *                 type: number
 *                 description: Reaction time in milliseconds
 *     responses:
 *       201:
 *         description: Reaction time successfully submitted
 *       400:
 *         description: Bad request
 */
router.post(
  '/submit-reaction-time',
  authenticate,
  (req: AuthenticatedRequest, res, next) => {
    TimerController.submitReactionTime(req, res).catch(next);
  },
);

/**
 * @swagger
 * /timer/get-reaction-times:
 *   get:
 *     summary: Retrieve reaction times for the authenticated user
 *     tags: [Timer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reaction times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     description: The ID of the user
 *                   time:
 *                     type: number
 *                     description: Reaction time in milliseconds
 *       400:
 *         description: Bad request
 */
router.get(
  '/get-reaction-times',
  authenticate,
  (req: AuthenticatedRequest, res, next) => {
    TimerController.getReactionTimes(req, res).catch(next);
  },
);

export default router;
