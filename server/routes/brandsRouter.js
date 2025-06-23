import { Router } from "express";
import { getBrands } from "../controllers/brandsController.js";

const brandsRouter = Router();

brandsRouter.get("/getbrands", getBrands);

export default brandsRouter;
