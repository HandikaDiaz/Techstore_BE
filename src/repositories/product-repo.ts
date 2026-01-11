import { createProductDto, editProductDto } from "../dto/product-dto";
import { prisma } from "../libs/prisma";

export function findAllProducts() {
    return prisma.product.findMany({
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
};

export function findProductById(productId: string) {
    return prisma.product.findUnique({
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
};

export function findProductsByUserId(userId: string) {
    return prisma.product.findMany({
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
};

export function createProduct(userId: string, data: createProductDto) {
    return prisma.product.create({
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
};

export function updateProduct(productId: string, data: editProductDto) {
    return prisma.product.update({
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
};

export async function deleteProduct(productId: string) {
    await prisma.imageItem.delete({
        where: {
            productId: productId
        },
    });

    return prisma.product.delete({
        where: {
            id: productId,
        },
    });
};