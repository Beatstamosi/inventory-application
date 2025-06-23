import { getAllBrandsQuery } from "../db/queries.js";

async function getBrands(req, res) {
  try {
    const brands = await getAllBrandsQuery();
    res.status(201).json({ brands });
  } catch (err) {
    console.error("Error fetching brands", err);
    res.status(500).json({ error: "Database Error" });
  }
}

export { getBrands };
