"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./auth/route"));
const route_2 = __importDefault(require("./product/route"));
const express_1 = require("express");
const routers = (0, express_1.Router)();
routers.use('/auth', route_1.default);
routers.use('/product', route_2.default);
exports.default = routers;
