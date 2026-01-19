"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailOrUsername = findUserByEmailOrUsername;
exports.createUser = createUser;
exports.findUser = findUser;
const prisma_1 = require("../libs/prisma");
async function findUserByEmailOrUsername(UsernameOrEmail) {
    return prisma_1.prisma.user.findFirst({
        where: {
            OR: [
                { email: UsernameOrEmail },
                { username: UsernameOrEmail }
            ]
        }
    });
}
async function createUser(data) {
    return prisma_1.prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: data.password,
        }
    });
}
async function findUser(data) {
    return prisma_1.prisma.user.findUnique({
        where: {
            email: data.username,
            password: data.password
        },
        select: {
            id: true,
            email: true,
            username: true,
        }
    });
}
