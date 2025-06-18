import { useBoards } from "../BoardsContext.js";
import styles from "./Home.module.css";
import NavButton from "../Navigation Button/NavButton.jsx";

function Home() {
  const boards = useBoards();

  return (
    <div>
      <div className={styles.containerHeader}>
        <h2>Currently you have <span>{boards.length}</span> boards in your quiver!</h2>
        <NavButton destination={"allboards"} />
      </div>
    </div>
  );
}

export default Home;
