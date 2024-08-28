import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      await AuthService.register({ email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'An error occurred' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'An error occurred' });
    }
  }
}

export default AuthController;
