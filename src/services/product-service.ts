import { createProductDto, editProductDto, Category } from '../dto/product-dto';
import * as productRepo from '../repositories/product-repo';

export async function getAllProducts() {
    const product = productRepo.findAllProducts();
    if (!product) {
        throw new Error('No products found');
    }
    return product;
};

export async function getProductById(productId: string) {
    const product = productRepo.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export async function getProductsByUserId(userId: string) {
    const products = productRepo.findProductsByUserId(userId);
    if (!products) {
        throw new Error('Products not found');
    }
    return products;
};

export async function createProduct(userId: string, data: createProductDto) {
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    data.rating = Number(data.rating);
    data.discount = Number(data.discount);
    const product = productRepo.createProduct(userId, data);
    if (!product) {
        throw new Error('Product not created');
    }
    return product;
};

export async function editProductById(userId: string, productId: string, data: editProductDto) {
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
        category: data.category === undefined ? product.category as Category : data.category as Category,
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

export async function deleteProductById(userId: string, productId: string) {
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
};