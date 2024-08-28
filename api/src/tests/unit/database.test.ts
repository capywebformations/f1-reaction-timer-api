import mongoose from 'mongoose';
import connectDB, { ensureDatabaseConnection } from '../../config/database';
import { EventEmitter } from 'events';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    readyState: 0,
    once: jest.fn(),
    on: jest.fn(),
    emit: jest.fn(), // Add emit method
  },
}));

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('connectDB', () => {
    it('should connect to the database successfully', async () => {
      (mongoose.connect as jest.Mock).mockResolvedValueOnce({});

      await connectDB();

      expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI!);
      expect(mongoose.connect).toHaveBeenCalledTimes(1);
    });

    it('should handle connection errors and exit process', async () => {
      const error = new Error('Connection failed');
      (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('Process exited');
      });
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(connectDB()).rejects.toThrow('Process exited');

      expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI!);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'MongoDB connection failed:',
        error,
      );
      expect(exitSpy).toHaveBeenCalledWith(1);

      exitSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('ensureDatabaseConnection', () => {
    it('should resolve immediately if connection is already established', async () => {
      (mongoose.connection.readyState as number) = 1;

      await ensureDatabaseConnection();

      expect(mongoose.connection.once).not.toHaveBeenCalled();
    });

    it('should wait for connection to open if not ready', async () => {
      (mongoose.connection.readyState as number) = 0;

      const mockEmitter = new EventEmitter();
      (mongoose.connection.once as jest.Mock).mockImplementation(
        (event, callback) => {
          mockEmitter.once(event, callback);
        },
      );

      // Trigger the 'open' event after a delay
      setTimeout(() => {
        mockEmitter.emit('open');
      }, 100);

      await ensureDatabaseConnection();

      expect(mongoose.connection.once).toHaveBeenCalledWith(
        'open',
        expect.any(Function),
      );
    });

    it('should reject if connection fails', async () => {
      (mongoose.connection.readyState as number) = 0;

      const mockEmitter = new EventEmitter();
      (mongoose.connection.once as jest.Mock).mockImplementation(
        (event, callback) => {
          mockEmitter.once(event, callback);
        },
      );

      // Trigger the 'error' event after a delay
      setTimeout(() => {
        mockEmitter.emit('error', new Error('Connection error'));
      }, 100);

      await expect(ensureDatabaseConnection()).rejects.toThrow(
        'Connection error',
      );

      expect(mongoose.connection.once).toHaveBeenCalledWith(
        'error',
        expect.any(Function),
      );
    });
  });
});
