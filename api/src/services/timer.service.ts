import Timer, { ITimer } from '../models/timer.model';

class TimerService {
  static async submitReactionTime(
    userId: string,
    time: number,
  ): Promise<ITimer> {
    const timer = new Timer({ user_id: userId, time });
    return await timer.save();
  }

  static async getReactionTimes(userId: string): Promise<ITimer[]> {
    return await Timer.find({ user_id: userId }).sort({ time: 1 });
  }
}

export default TimerService;
