import pool from "./pool.js";

async function getAllBoards() {
  const { rows } = await pool.query(`
    SELECT 
      boards.id,
      boards.name,
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
      categories.description,
      COUNT(boards.id) AS board_count
    FROM categories
    LEFT JOIN boards ON boards.category = categories.id
    GROUP BY categories.id, categories.name
    ORDER BY categories.name;
  `);

  return rows;
}

async function addCategoryToDb(name, description) {
  try {
    const result = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING name, description;",
      [name, description]
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

export { getAllBoards, getAllCategories, addCategoryToDb };
