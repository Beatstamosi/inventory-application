import { useBoards } from "../BoardsContext.js";
import styles from "./Home.module.css";
import NavButton from "../Navigation Button/NavButton.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [categories, setCategories] = useState([]);
  const boards = useBoards();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getallcategories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <main className={styles.containerHome}>
      <section className={styles.containerHeader}>
        <h2>
          Currently you have <span>{boards.length}</span> boards in your quiver!
        </h2>
        <NavButton destination={"all-boards"} />
      </section>
      <section className={styles.containerCategories}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          {categories.map((category) => (
            <a href={`/category/${category.name}`} key={category.id}>
              <div className={styles.category}>
                {category.name}
                <span>{category.board_count}</span>
                <span>→ See Boards</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
