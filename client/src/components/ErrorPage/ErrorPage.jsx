import { useRouteError, Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPage} data-testid="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button>
        <Link to={"/"}>Back to Home</Link>
      </button>
    </div>
  );
}
