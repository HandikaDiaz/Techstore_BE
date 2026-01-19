"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProducts = findAllProducts;
exports.findProductById = findProductById;
exports.findProductsByUserId = findProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const prisma_1 = require("../libs/prisma");
function findAllProducts() {
    return prisma_1.prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            category: true,
            rating: true,
            discount: true,
            image: {
                select: {
                    id: true,
                    url: true
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });
}
;
function findProductById(productId) {
    return prisma_1.prisma.product.findUnique({
        where: {
            id: productId
        },
        select: {
            id: true,
            userId: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            category: true,
            rating: true,
            discount: true,
            image: {
                select: {
                    id: true,
                    url: true
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });
}
;
function findProductsByUserId(userId) {
    return prisma_1.prisma.product.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            category: true,
            rating: true,
            discount: true,
            image: {
                select: {
                    id: true,
                    url: true
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });
}
;
function createProduct(userId, data) {
    return prisma_1.prisma.product.create({
        data: {
            userId: userId,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            rating: data.rating,
            discount: data.discount,
            image: {
                create: {
                    url: data.image || ""
                }
            },
        }
    });
}
;
function updateProduct(productId, data) {
    return prisma_1.prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            rating: data.rating,
            discount: data.discount,
            image: {
                update: {
                    url: data.image
                }
            },
        }
    });
}
;
async function deleteProduct(productId) {
    await prisma_1.prisma.imageItem.delete({
        where: {
            productId: productId
        },
    });
    return prisma_1.prisma.product.delete({
        where: {
            id: productId,
        },
    });
}
;
