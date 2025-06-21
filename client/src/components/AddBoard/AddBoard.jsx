import { useState } from "react";
import styles from "./AddBoard.module.css";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../CategoriesContext.js";
import { useEffect } from "react";

function AddBoard() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState(0.0);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [brands, setBrands] = useState([]);

  const { categories } = useCategories();

  // get brands via API call
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getbrands`)
      .then((res) => res.json())
      .then((data) => setBrands(data.brands))
      .catch((err) => console.error("Error fetching brands", err));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
        setName("");
        setSize("");
        setVolume("");
        setPrice();
        setSelectedBrand();
        setSelectedCategory;
        navigate(`/all-boards`);
      } else {
        console.error("Failed to add board", data.error);
      }
    } catch (err) {
      console.error("Error adding Board:", err);
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2>Add new Board</h2>
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
          <select name="brand" id="brand">
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
          <select name="category" id="category">
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Add Board
        </button>
      </form>
    </div>
  );
}

export default AddBoard;
