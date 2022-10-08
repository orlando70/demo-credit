import { Request, Response } from 'express';
import Register from '../services/Auth/register'

export default class AuthController {
    public static Register = async (req: Request, res: Response) => {
        const user = await Register(req.body);
        res.send({
            success: true,
            data: user
        })
    }
}