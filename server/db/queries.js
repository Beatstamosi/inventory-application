import pool from "./pool.js";

async function getAllBoards() {
  const { rows } = await pool.query(
    "SELECT boards.id AS board_id, boards.name AS board_name, boards.size, boards.volume, boards.price, brands.name AS brand_name, categories.name AS category_name FROM boards JOIN categories ON boards.category = categories.id JOIN brands ON boards.brand = brands.id;"
  );
  return rows;
}

export { getAllBoards };
