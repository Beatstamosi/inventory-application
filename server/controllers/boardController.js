import {
  getAllBoardsQuery,
  addBoardQuery,
  deleteBoardQuery,
  editBoardQuery,
  getAllCategoriesQuery,
  getAllBrandsQuery,
} from "../db/queries.js";
import { body, validationResult } from "express-validator";

const validateBoard = [
  body("name").trim().notEmpty(),
  body("size").trim().notEmpty(),
  body("volume").trim().notEmpty(),
  body("price")
    .trim()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),
  body("selectedCategory")
    .notEmpty()
    .withMessage("Category must be selected.")
    .custom(async (value) => {
      const categories = await getAllCategoriesQuery();
      const ids = categories.map((c) => String(c.id));
      if (!ids.includes(value)) {
        throw new Error("Category does not exist.");
      }
      return true;
    }),
  body("selectedBrand")
    .notEmpty()
    .withMessage("Brand must be selected.")
    .custom(async (value) => {
      const brands = await getAllBrandsQuery();
      const ids = brands.map((c) => String(c.id));
      if (!ids.includes(value)) {
        throw new Error("Brand does not exist.");
      }
      return true;
    }),
];

async function getAllBoards(req, res) {
  try {
    const boards = await getAllBoardsQuery();
    res.json({ boards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
}

const addBoard = [
  validateBoard,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, size, volume, price, selectedBrand, selectedCategory } =
      req.body;

    try {
      await addBoardQuery(
        name,
        size,
        volume,
        price,
        selectedBrand,
        selectedCategory
      );
      res.status(201).json({ message: "Board added succesfully." });
    } catch (err) {
      console.error("Error adding board:", err);
      res.status(500).json({ error: "Database Error." });
    }
  },
];

async function deleteBoard(req, res) {
  const { id } = req.body;

  try {
    await deleteBoardQuery(id);
    res.status(201).json({ message: "Board deleted succesfully." });
  } catch (err) {
    console.error("Error deleting board: ", err);
    res.status(500).json({ error: "Database Error." });
  }
}
const editBoard = [
  validateBoard,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { id, name, size, volume, price, selectedBrand, selectedCategory } =
      req.body;

    try {
      await editBoardQuery(
        id,
        name,
        size,
        volume,
        price,
        selectedBrand,
        selectedCategory
      );
      res.status(201).json({ message: "Edit successfull. " });
    } catch (err) {
      console.error("Error editing Board", err);
      res.status(500).json({ error: "Database Error" });
    }
  },
];

export { getAllBoards, addBoard, deleteBoard, editBoard };
