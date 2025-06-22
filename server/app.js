import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  addCategoryToDb,
  deleteCategory,
  getAllBoards,
  getAllCategories,
  getAllBrands,
  addBoard,
  getBoardsCategory,
  deleteBoard,
} from "./db/queries.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS only in dev
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// API Routes
app.get("/api/getallboards", async (req, res) => {
  try {
    const boards = await getAllBoards();
    res.json({ boards });
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
});

app.get("/api/getboardscategory/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const boards = await getBoardsCategory(categoryName);
    res.json({ boards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
});

app.get("/api/getallcategories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json({ categories });
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
});

app.post("/api/addcategory", async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await addCategoryToDb(name, description);
    res.status(201).json({ message: "Category added", result });
  } catch (err) {
    console.error(`Error adding category: ${err}`);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/delete-category", async (req, res) => {
  const { id } = req.body;

  try {
    await deleteCategory(id);
    res.status(201).json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/getbrands", async (req, res) => {
  try {
    const brands = await getAllBrands();
    res.status(201).json({ brands });
  } catch (err) {
    console.error("Error fetching brands", err);
    res.status(500).json({ error: "Database Error" });
  }
});

app.post("/api/addboard", async (req, res) => {
  const { name, size, volume, price, selectedBrand, selectedCategory } =
    req.body;

  try {
    await addBoard(name, size, volume, price, selectedBrand, selectedCategory);
    res.status(201).json({ message: "Board added succesfully." });
  } catch (err) {
    console.error("Error adding board".err);
    res.status(500).json({ error: "Database Error." });
  }
});

app.delete("/api/deleteboard", async (req, res) => {
  const { id } = req.body;

  try {
    await deleteBoard(id);
    res.status(201).json({ message: "Board deleted succesfully." });
  } catch (err) {
    console.error("Error deleting board: ", err);
    res.status(500).json({ error: "Database Error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
