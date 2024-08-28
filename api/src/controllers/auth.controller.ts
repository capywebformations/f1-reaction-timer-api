import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'An error occurred' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'An error occurred' });
        }
    }
}

export default AuthController;
