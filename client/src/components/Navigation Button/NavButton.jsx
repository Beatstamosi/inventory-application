import styles from "./NavButton.module.css";
import { Link } from "react-router-dom";

function NavButton({ destination }) {
  return (
    <Link to={`/${destination}`} className={styles.linkAllBoards}>
      See all Boards
    </Link>
  );
}

export default NavButton;
