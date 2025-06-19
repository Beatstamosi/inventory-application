import styles from "./Board.module.css";

function Board({ board }) {
  return (
    <div key={board.id} className={styles.board}>
      <p className={styles.boardName}>{board.name}</p>
      <p className={styles.boardName}>
        {board.size}, {board.volume} Liters
      </p>
      <p className={styles.boardBrand}>by {board.brand_name}</p>
      <p>Bought for {board.price}€</p>
      <p>
        used for:{" "}
        <a href={board.category_name} className={styles.categoryLink}>
          {board.category_name}
        </a>
      </p>
      <hr />
      <div className={styles.containerBtns}>
        <a
          href={`/edit/${board.id}`}
          className={`${styles.btn} ${styles.edit}`}
        >
          Edit
        </a>
        <a
          href={`/delete/${board.id}`}
          className={`${styles.btn} ${styles.delete}`}
        >
          Delete
        </a>
      </div>
    </div>
  );
}

export default Board;
