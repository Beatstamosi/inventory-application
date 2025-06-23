import {
  getAllBoardsQuery,
  addBoardQuery,
  deleteBoardQuery,
  editBoardQuery,
} from "../db/queries.js";

async function getAllBoards(req, res) {
  try {
    const boards = await getAllBoardsQuery();
    res.json({ boards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Data could not be fetched" });
  }
}

async function addBoard(req, res) {
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
    console.error("Error adding board".err);
    res.status(500).json({ error: "Database Error." });
  }
}

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

async function editBoard(req, res) {
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
}

export { getAllBoards, addBoard, deleteBoard, editBoard };
