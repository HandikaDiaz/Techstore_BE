import { Response } from "express";
import { CustomRequest } from '../libs/request';
import * as ProductService from '../services/product-service';
import uploader from "../libs/cloudinary";

export async function getAllProducts(req: CustomRequest, res: Response) {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export async function getProductById(req: CustomRequest, res: Response) {
    try {
        const productId = req.params.productId;
        const product = await ProductService.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export async function getProductsByUserId(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const products = await ProductService.getProductsByUserId(userId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export async function createProduct(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const data = req.body;
        if(req.file) {
            data.image = await uploader(req.file as Express.Multer.File);
        }
        const product = await ProductService.createProduct(userId, data);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export async function editProductById(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const data = req.body;
        const updatedProduct = await ProductService.editProductById(userId, productId, data);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export async function deleteProductById(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const deletedProduct = await ProductService.deleteProductById(userId, productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};