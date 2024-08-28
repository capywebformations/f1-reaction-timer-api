import User from '../../models/user.model';

jest.mock('../../models/user.model'); // Mock the User model

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to prevent side effects
  });

  describe('Creating a User', () => {
    it('should create and save a user successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        role: true,
      };

      (User as jest.Mocked<typeof User>).prototype.save = jest
        .fn()
        .mockResolvedValue(mockUser);

      const user = new User(mockUser);
      const savedUser = await user.save();

      expect(savedUser).toEqual(mockUser);
      expect(User.prototype.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Finding a User', () => {
    it('should find a user by email', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: true,
      };

      (User as jest.Mocked<typeof User>).findOne = jest
        .fn()
        .mockResolvedValue(mockUser);

      const foundUser = await User.findOne({ email: 'test@example.com' });

      expect(foundUser).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });
});
