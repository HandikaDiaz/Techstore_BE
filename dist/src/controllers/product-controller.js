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
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.editProductById = editProductById;
exports.deleteProductById = deleteProductById;
const ProductService = __importStar(require("../services/product-service"));
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
async function getAllProducts(req, res) {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function getProductById(req, res) {
    try {
        const productId = req.params.productId;
        const product = await ProductService.getProductById(productId);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function getProductsByUserId(req, res) {
    try {
        const userId = req.user.id;
        const products = await ProductService.getProductsByUserId(userId);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function createProduct(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        if (req.file) {
            data.image = await (0, cloudinary_1.default)(req.file);
        }
        const product = await ProductService.createProduct(userId, data);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function editProductById(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const data = req.body;
        const updatedProduct = await ProductService.editProductById(userId, productId, data);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
async function deleteProductById(req, res) {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const deletedProduct = await ProductService.deleteProductById(userId, productId);
        res.json(deletedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
;
