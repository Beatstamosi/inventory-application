import styles from "./displayCategory.module.css";
import { useBoards } from "../BoardsContext";
import { useParams } from "react-router";
import Board from "../DisplayBoard/Board";
import { useCategories } from "../CategoriesContext.js";

function DisplayCategory() {
  const boards = useBoards();
  const { categories } = useCategories();
  let { name: categoryName } = useParams();

  // to access description
  const category = categories.find((c) => c.name == categoryName);

  if (!category) {
    return <p>Loading category...</p>;
  }

  let showBoards = boards.filter(
    (board) => board.category_name === categoryName
  );

  return (
    <div className={styles.containerContent}>
      <h2>{categoryName}</h2>
      <p>{category.description}</p>
      <div className={styles.containerBoards}>
        {showBoards.map((board) => (
          <Board board={board} key={board.id} />
        ))}
      </div>
    </div>
  );
}

export default DisplayCategory;
