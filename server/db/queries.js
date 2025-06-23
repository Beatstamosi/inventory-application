import pool from "./pool.js";

async function getAllBoards() {
  const { rows } = await pool.query(`
    SELECT 
      boards.id,
      boards.name,
      boards.size,
      boards.volume,
      boards.price,
      boards.category AS categoryId,
      boards.brand AS brandId,
      brands.name AS brand_name,
      categories.name AS category_name
    FROM boards
    JOIN categories ON boards.category = categories.id
    JOIN brands ON boards.brand = brands.id;
  `);

  return rows;
}

async function getBoardsCategory(categoryName) {
  const { rows } = await pool.query(
    `
    SELECT 
      boards.id,
      boards.name,
      boards.size,
      boards.volume,
      boards.price,
      boards.category AS categoryId,
      boards.brand AS brandId,
      brands.name AS brand_name,
      categories.name AS category_name
    FROM boards
    JOIN categories ON boards.category = categories.id
    JOIN brands ON boards.brand = brands.id
    WHERE categories.name = ($1)
  `,
    [categoryName]
  );

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

async function deleteCategory(id) {
  try {
    const result = await pool.query("DELETE FROM categories WHERE id = ($1);", [
      id,
    ]);

    if (result.rowCount === 1) {
      console.log("Category successful deleted");
    } else {
      console.error("Failed to delete category");
    }
  } catch (err) {
    throw err;
  }
}

async function getAllBrands() {
  try {
    const { rows } = await pool.query("SELECT * from brands;");
    return rows;
  } catch (err) {
    throw err;
  }
}

async function addBoard(name, size, volume, price, brand, category) {
  try {
    await pool.query(
      "INSERT INTO boards (name, size, volume, price, brand, category) VALUES ($1,$2,$3,$4,$5,$6);",
      [name, size, volume, price, brand, category]
    );
  } catch (err) {
    throw err;
  }
}

async function deleteBoard(id) {
  try {
    await pool.query("DELETE FROM boards WHERE boards.id = ($1);", [id]);
  } catch (err) {
    throw err;
  }
}

async function editBoard(id, name, size, volume, price, brand, category) {
  try {
    await pool.query(
      `UPDATE boards 
       SET name = $1, size = $2, volume = $3, price = $4, brand = $5, category = $6 
       WHERE id = $7;`,
      [name, size, volume, price, brand, category, id]
    );
  } catch (err) {
    throw err;
  }
}

export {
  getAllBoards,
  getAllCategories,
  addCategoryToDb,
  deleteCategory,
  getAllBrands,
  addBoard,
  getBoardsCategory,
  deleteBoard,
  editBoard,
};
