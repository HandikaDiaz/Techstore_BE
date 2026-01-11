import { Router } from "express";
import * as ProductController from '../../controllers/product-controller';
import { authentication } from '../../middlewares/authentication';
import upload from "../../middlewares/upload";

const productRouter = Router();

productRouter.get("/get-all", ProductController.getAllProducts);
productRouter.get("/get/:productId", ProductController.getProductById);
productRouter.get("/user-products", authentication, ProductController.getProductsByUserId);
productRouter.post("/create", authentication, upload.single('image'), ProductController.createProduct);
productRouter.put("/edit/:productId", authentication, upload.single('image'), ProductController.editProductById);
productRouter.delete("/delete/:productId", authentication, ProductController.deleteProductById);

export default productRouter;