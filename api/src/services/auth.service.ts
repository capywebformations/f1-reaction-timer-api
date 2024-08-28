import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

class AuthService {
  static async register(userData: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword,
      role: true,
    }); // Set role to true for 'user'
    return await user.save();
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await User.findOne({ email: credentials.email });
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error('Invalid email or password');
    }
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );
  }
}

export default AuthService;
