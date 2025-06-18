import App from "../App";
import Home from "./Home/Home.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";
import AddBoard from "./AddBoard/AddBoard.jsx";
import AddCategory from "./AddCategory/AddCategory.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-board",
        element: <AddBoard />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
    ],
  },
];

export default routes;
