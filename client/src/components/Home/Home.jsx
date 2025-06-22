import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import NavButton from "../Navigation Button/NavButton.jsx";
import { useCategories } from "../CategoriesContext.js";

function Home() {
  const [boards, setBoards] = useState([]);
  const { categories } = useCategories();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getallboards`)
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.boards);
      })
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
      });
  }, []);

  return (
    <main className={styles.containerHome}>
      <section className={styles.containerHeader}>
        <h2>{boards.length}</h2>
        <p>Boards in your current Quiver</p>
        <NavButton destination={"all-boards"} />
      </section>
      <section className={styles.containerCategories}>
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
