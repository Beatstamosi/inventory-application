import { useState, useEffect } from "react";
import styles from "./EditBoard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import secretPassword from "../secretPassword.js";

function EditBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const board = location.state?.board;

  const id = board.id;
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(board.name);
  const [size, setSize] = useState(board.size);
  const [volume, setVolume] = useState(board.volume);
  const [price, setPrice] = useState(board.price);
  const [selectedBrand, setSelectedBrand] = useState(board.brandid);
  const [selectedCategory, setSelectedCategory] = useState(board.categoryid);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/getallcategories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  // get brands via API call
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/brands/getbrands`)
      .then((res) => res.json())
      .then((data) => setBrands(data.brands))
      .catch((err) => console.error("Error fetching brands", err));
  }, []);

  const resetForm = () => {
    setName("");
    setSize("");
    setVolume("");
    setPrice(0);
    setSelectedBrand("");
    setSelectedCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let password = secretPassword();
    if (!password) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/boards/editboard`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            size,
            volume,
            price,
            selectedBrand,
            selectedCategory,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        resetForm();
        navigate(-1);
      } else {
        console.error("Failed to edit board", data.error);
      }
    } catch (err) {
      console.error("Error editing Board:", err);
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2>Edit Board</h2>
      <form onSubmit={handleSubmit} className={styles.addCategoryForm}>
        <div className={styles.containerLabelInput}>
          <label htmlFor="name">
            Name<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Lost Redux V2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="brand">
            Brand<span aria-label="required">*</span>
          </label>
          <select
            name="brand"
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">-- Select a Brand --</option>
            {brands.map((brand) => (
              <option value={brand.id} key={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="size">
            Size<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="6'4"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="volume">
            Volume<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="volume"
            name="volume"
            placeholder="36"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="price">
            Price<span aria-label="required">*</span>
          </label>
          <input
            type="number"
            step={0.01}
            id="price"
            name="price"
            placeholder="250,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="category">
            Category<span aria-label="required">*</span>
          </label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Save Board
        </button>
      </form>
    </div>
  );
}

export default EditBoard;
