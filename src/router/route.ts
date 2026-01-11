import authRouter from "./auth/route";
import productRouter from "./product/route";

import { Router } from "express";

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/product', productRouter);

export default routers;