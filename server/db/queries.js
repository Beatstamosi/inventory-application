import pool from "./pool.js";

async function getAllBoards() {
  const { rows } = await pool.query(`
    SELECT 
      boards.id AS board_id,
      boards.name AS board_name,
      boards.size,
      boards.volume,
      boards.price,
      brands.name AS brand_name,
      categories.name AS category_name
    FROM boards
    JOIN categories ON boards.category = categories.id
    JOIN brands ON boards.brand = brands.id;
  `);

  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(`
    SELECT 
      categories.id,
      categories.name,
      COUNT(boards.id) AS board_count
    FROM categories
    LEFT JOIN boards ON boards.category = categories.id
    GROUP BY categories.id, categories.name
    ORDER BY categories.name;
  `);

  return rows;
}

export { getAllBoards, getAllCategories };
