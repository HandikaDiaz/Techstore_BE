"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authRepo = __importStar(require("../repositories/auth-repo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function register(data) {
    const existUser = await authRepo.findUserByEmailOrUsername(data.email);
    if (existUser) {
        throw new Error('User already exists');
    }
    const salt = 10;
    const hashedPassword = await bcryptjs_1.default.hash(data.password, salt);
    const createUser = await authRepo.createUser({
        ...data,
        password: hashedPassword,
    });
    const { password, ...result } = createUser;
    const token = jsonwebtoken_1.default.sign(result, process.env.JWT_SECRET, { expiresIn: '1d' });
    return ({
        message: 'Register Sucessfully',
        token
    });
}
async function login(data) {
    const existUser = await authRepo.findUserByEmailOrUsername(data.username);
    if (!existUser) {
        throw new Error('User not found');
    }
    const isValidPassword = await bcryptjs_1.default.compare(data.password, existUser.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const { password, ...result } = existUser;
    const token = jsonwebtoken_1.default.sign(result, process.env.JWT_SECRET);
    return ({
        message: 'Login Sucessfully',
        token
    });
}
