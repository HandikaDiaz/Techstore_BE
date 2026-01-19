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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.editProductById = editProductById;
exports.deleteProductById = deleteProductById;
const productRepo = __importStar(require("../repositories/product-repo"));
async function getAllProducts() {
    const product = productRepo.findAllProducts();
    if (!product) {
        throw new Error('No products found');
    }
    return product;
}
;
async function getProductById(productId) {
    const product = productRepo.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}
;
async function getProductsByUserId(userId) {
    const products = productRepo.findProductsByUserId(userId);
    if (!products) {
        throw new Error('Products not found');
    }
    return products;
}
;
async function createProduct(userId, data) {
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    data.rating = Number(data.rating);
    data.discount = Number(data.discount);
    const product = productRepo.createProduct(userId, data);
    if (!product) {
        throw new Error('Product not created');
    }
    return product;
}
;
async function editProductById(userId, productId, data) {
    const product = await productRepo.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    if (product.userId !== userId) {
        throw new Error('Unauthorized to edit this product');
    }
    const updateData = {
        name: data.name === "" ? product.name : data.name,
        description: data.description === "" ? product.description : data.description,
        price: data.price === undefined ? Number(product.price) : Number(data.price),
        stock: data.stock === undefined ? Number(product.stock) : Number(data.stock),
        category: data.category === undefined ? product.category : data.category,
        rating: data.rating === undefined ? Number(product.rating) : Number(data.rating),
        discount: data.discount === undefined ? Number(product.discount) : Number(data.discount),
        image: data.image ? data.image : product.image?.url,
    };
    const updatedProduct = await productRepo.updateProduct(productId, updateData);
    if (!updatedProduct) {
        throw new Error('Product not updated');
    }
    return updatedProduct;
}
async function deleteProductById(userId, productId) {
    const product = await productRepo.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    if (product.userId !== userId) {
        throw new Error('Unauthorized to delete this product');
    }
    const deletedProduct = await productRepo.deleteProduct(productId);
    if (!deletedProduct) {
        throw new Error('Product not deleted');
    }
    return deletedProduct;
}
;
