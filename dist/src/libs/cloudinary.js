"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dqvskcnje",
    api_key: process.env.CLOUDINARY_API_KEY || "838252592479631",
    api_secret: process.env.CLOUDINARY_API_SECRET || "wM5FzZFZJbn1RSwV3TM25kTS83Y"
};
cloudinary_1.v2.config(config);
const uploader = async (file) => {
    try {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const uploadResult = await cloudinary_1.v2.uploader.upload(dataURI, {
            folder: process.env.CLOUDINARY_FOLDER || 'techstore',
            resource_type: 'auto'
        });
        return uploadResult.secure_url;
    }
    catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};
exports.default = uploader;
