import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dqvskcnje",
    api_key: process.env.CLOUDINARY_API_KEY || "838252592479631",
    api_secret: process.env.CLOUDINARY_API_SECRET || "wM5FzZFZJbn1RSwV3TM25kTS83Y"
};

cloudinary.config(config);

const uploader = async (file: Express.Multer.File) => {
    try {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: process.env.CLOUDINARY_FOLDER || 'techstore',
            resource_type: 'auto'
        });

        return uploadResult.secure_url;

    } catch (error: any) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export default uploader;