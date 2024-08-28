import mongoose from 'mongoose';
import app from '../../app';

// Mock Mongoose's connect method and the Express app's listen method
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../../app', () => ({
  listen: jest.fn((port, callback) => callback()), // Simulate the listen callback
}));

describe('Server Initialization', () => {
  const PORT = process.env.PORT || 3000;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  it('should connect to MongoDB and start the server successfully', async () => {
    const mockConnect = mongoose.connect as jest.Mock;
    mockConnect.mockResolvedValueOnce({});

    // Dynamically import the server file after mocks are set up
    await import('../../server');

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI!);
    expect(app.listen).toHaveBeenCalledWith(PORT, expect.any(Function));

    // Assert console.log calls in the correct order
    expect(console.log).toHaveBeenNthCalledWith(1, 'Connected to MongoDB');
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Server running on port ${PORT}`,
    );
  });
});
