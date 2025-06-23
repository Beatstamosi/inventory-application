import styles from "./displayCategory.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Board from "../DisplayBoard/Board";
import secretPassword from "../secretPassword.js";

function DisplayCategory() {
  const [boards, setBoards] = useState([]);
  const [categories, setCategories] = useState([]);
  let { name: categoryName } = useParams();
  const navigate = useNavigate();

  const handleBoardDelete = (deletedId) => {
    let password = secretPassword();
    if (!password) return;

    setBoards((prevBoards) => prevBoards.filter((b) => b.id !== deletedId));
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/categories/getallcategories`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/categories/getboardscategory/${categoryName}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.boards);
      })
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
      });
  }, [categoryName]);

  // to access description
  const category = categories.find((c) => c.name == categoryName);

  if (!category) {
    return <p>Loading category...</p>;
  }

  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    let password = secretPassword();
    if (!password) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/delete-category`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: category.id }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        let filteredCat = categories.filter((c) => category.id != c.id);
        setCategories(filteredCat);
        navigate("/");
      } else {
        console.error("Failed to delete category", data.error);
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  let showBoards = boards.filter(
    (board) => board.category_name === categoryName
  );

  return (
    <div className={styles.containerContent}>
      <h2>{categoryName}</h2>
      <p>{category.description}</p>
      <div>
        <form onSubmit={handleDeleteCategory}>
          <button type="submit">Delete Category</button>
        </form>
      </div>
      <div className={styles.containerBoards}>
        {showBoards.map((board) => (
          <Board board={board} onDelete={handleBoardDelete} key={board.id} />
        ))}
      </div>
      <Link
        to="/add-board"
        state={{ preselectCat: category.id }}
        className={styles.addCategoryBtn}
      >
        +
      </Link>
    </div>
  );
}

export default DisplayCategory;
