import {
  addCategoryQuery,
  getAllCategoriesQuery,
  getBoardsCategoryQuery,
  deleteCategoryQuery,
} from "../db/queries.js";

async function getBoardsCategory(req, res) {
  const { categoryName } = req.params;
  try {
    const boards = await getBoardsCategoryQuery(categoryName);
    res.json({ boards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesQuery();
    res.json({ categories });
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
}

async function addCategory(req, res) {
  const { name, description } = req.body;

  try {
    const result = await addCategoryQuery(name, description);
    res.status(201).json({ message: "Category added", result });
  } catch (err) {
    console.error(`Error adding category: ${err}`);
    res.status(500).json({ error: "Database error" });
  }
}

async function deleteCategory(req, res) {
  const { id } = req.body;

  try {
    await deleteCategoryQuery(id);
    res.status(201).json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category", err);
    res.status(500).json({ error: "Database error" });
  }
}

export { getBoardsCategory, getAllCategories, addCategory, deleteCategory };
