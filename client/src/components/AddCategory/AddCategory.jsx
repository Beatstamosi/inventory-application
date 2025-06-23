import { useState } from "react";
import styles from "./AddCategory.module.css";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../CategoriesContext.js";
import secretPassword from "../secretPassword.js";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { categories, setCategories } = useCategories();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let password = secretPassword();
    if (!password) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/addcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setName("");
        setDescription("");
        setCategories([...categories, data.result]);
        navigate(`/category/${data.result.name}`);
      } else {
        console.error("Failed to add category", data.error);
      }
    } catch (err) {
      console.error("Error adding Category:", err);
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2>Create new Category</h2>
      <form onSubmit={handleSubmit} className={styles.addCategoryForm}>
        <div className={styles.containerLabelInput}>
          <label htmlFor="name">
            Name<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Cruising"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="description">
            Description<span aria-label="required">*</span>
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="For days when I just want to cruise around"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
