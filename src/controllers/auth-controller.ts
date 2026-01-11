import type { Response } from 'express';
import type { CustomRequest } from '../libs/request';
import * as authService from '../services/auth-service';

export async function register(req: CustomRequest, res: Response) {
    try {
        const body = req.body
        const user = await authService.register(body)
        res.json(user)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function login(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = await authService.login(body);
        res.json(user)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function logout(req: CustomRequest, res: Response) {
    try {
        res.clearCookie('token');
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}