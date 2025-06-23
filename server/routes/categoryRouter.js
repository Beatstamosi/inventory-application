import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  getBoardsCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/getboardscategory/:categoryName", getBoardsCategory);
categoryRouter.get("/getallcategories", getAllCategories);
categoryRouter.post("/addcategory", addCategory);
categoryRouter.delete("/delete-category", deleteCategory);

export default categoryRouter;
