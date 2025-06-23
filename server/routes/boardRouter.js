import { Router } from "express";
import {
  getAllBoards,
  addBoard,
  deleteBoard,
  editBoard,
} from "../controllers/boardController.js";

const boardRouter = Router();

boardRouter.get("/getallboards", getAllBoards);
boardRouter.post("/addboard", addBoard);
boardRouter.delete("/deleteboard", deleteBoard);
boardRouter.put("/editboard", editBoard);

export default boardRouter;
