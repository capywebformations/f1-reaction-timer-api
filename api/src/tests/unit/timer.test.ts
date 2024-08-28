import TimerService from '../../services/timer.service';
import Timer from '../../models/timer.model';

jest.mock('../../models/timer.model'); // Mock the Timer model

describe('TimerService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to prevent side effects
  });

  describe('submitReactionTime', () => {
    it('should save a reaction time for a user', async () => {
      const mockTimer = { user_id: 'userId', time: 123 };

      (Timer as jest.Mocked<typeof Timer>).prototype.save = jest
        .fn()
        .mockResolvedValue(mockTimer);

      const result = await TimerService.submitReactionTime('userId', 123);

      expect(Timer.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTimer);
    });
  });

  describe('getReactionTimes', () => {
    it('should retrieve reaction times for a user', async () => {
      const mockTimers = [
        { user_id: 'userId', time: 100 },
        { user_id: 'userId', time: 150 },
      ];

      // Mocking find to return a chainable object with sort method
      (Timer.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTimers),
      });

      const result = await TimerService.getReactionTimes('userId');

      expect(Timer.find).toHaveBeenCalledWith({ user_id: 'userId' });
      expect(result).toEqual(mockTimers);
    });
  });
});
