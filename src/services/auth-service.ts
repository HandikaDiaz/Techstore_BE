import bcrypt from 'bcryptjs';
import * as authRepo from '../repositories/auth-repo';
import jwt from 'jsonwebtoken';
import type { loginDto, registerDto } from '../dto/auth-dto';

export async function register(data: registerDto) {
    const existUser = await authRepo.findUserByEmailOrUsername(data.email);
    if (existUser) {
        throw new Error('User already exists');
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const createUser = await authRepo.createUser({
        ...data,
        password: hashedPassword,
    });
    const { password, ...result } = createUser;
    const token = jwt.sign(
        result,
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );
    return ({
        message: 'Register Sucessfully',
        token
    })
}

export async function login(data: loginDto) {
    const existUser = await authRepo.findUserByEmailOrUsername(data.username);
    if (!existUser) {
        throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(data.password, existUser.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const { password, ...result } = existUser;
    const token = jwt.sign(
        result,
        process.env.JWT_SECRET as string
    );
    return ({
        message: 'Login Sucessfully',
        token
    })
}