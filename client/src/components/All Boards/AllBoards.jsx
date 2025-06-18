import styles from "./AllBoards.module.css";
import { useBoards } from "../BoardsContext";

function AllBoards() {
  const boards = useBoards();

  return (
    <div className={styles.containerBoards}>
      {boards.map((board) => (
        <div key={board.id} className={styles.board}>
          <p className={styles.boardName}>{board.name}</p>
          <p className={styles.boardName}>
            {board.size}, {board.volume} Liters
          </p>
          <p className={styles.boardBrand}>by {board.brand_name}</p>
          <p>Bought for {board.price}€</p>
          <p>used for: {board.category_name}</p>
        </div>
      ))}
    </div>
  );
}

// EDIT, DELETE Button
// LINK TO CATEGORY

export default AllBoards;
