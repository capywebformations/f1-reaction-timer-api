import AuthService from '../services/auth.service';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

jest.mock('../models/user.model');

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user with hashed password', async () => {
        const mockUser = { email: 'test@example.com', password: 'hashedPassword', role: true };
        (User.create as jest.Mock).mockResolvedValue(mockUser);

        const result = await AuthService.register({ email: 'test@example.com', password: 'password', role: true });

        expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
        expect(User.create).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockUser);
    });

});
