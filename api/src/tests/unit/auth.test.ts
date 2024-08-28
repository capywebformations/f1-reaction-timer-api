import AuthService from '../../services/auth.service';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../models/user.model'); // Mock the User model
jest.mock('bcrypt'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jsonwebtoken

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to prevent side effects
  });

  describe('register', () => {
    it('should register a new user with hashed password', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        role: true,
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User as jest.Mocked<typeof User>).prototype.save = jest
        .fn()
        .mockResolvedValue(mockUser);

      const result = await AuthService.register({
        email: 'test@example.com',
        password: 'password',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(User.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should login a user and return a JWT token', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: true,
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (User as jest.Mocked<typeof User>).findOne = jest
        .fn()
        .mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      const result = await AuthService.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'userId', role: true },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' },
      );
      expect(result).toEqual('mockToken');
    });

    it('should throw an error if email or password is incorrect', async () => {
      (User as jest.Mocked<typeof User>).findOne = jest
        .fn()
        .mockResolvedValue(null);

      await expect(
        AuthService.login({ email: 'wrong@example.com', password: 'password' }),
      ).rejects.toThrow('Invalid email or password');

      (User as jest.Mocked<typeof User>).findOne = jest
        .fn()
        .mockResolvedValue({ password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        AuthService.login({
          email: 'test@example.com',
          password: 'wrongPassword',
        }),
      ).rejects.toThrow('Invalid email or password');
    });
  });
});
