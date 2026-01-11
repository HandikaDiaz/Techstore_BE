import type { loginDto, registerDto } from "../dto/auth-dto";
import { prisma } from "../libs/prisma";

export async function findUserByEmailOrUsername(UsernameOrEmail: string) {
    return prisma.user.findFirst({
        where: {
            OR: [
                { email: UsernameOrEmail },
                { username: UsernameOrEmail }
            ]
        }
    })
}

export async function createUser(data: registerDto) {
    return prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: data.password,
            
        }
    })
}

export async function findUser(data: loginDto) {
    return prisma.user.findUnique({
        where: {
            email: data.username,
            password: data.password
        },
        select: {
            id: true,
            email: true,
            username: true,
        }
    })
}