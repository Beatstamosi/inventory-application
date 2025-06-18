import App from "../App";
import Home from "./Home/Home.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";
import AddBoard from "./AddBoard/AddBoard.jsx";
import AddCategory from "./AddCategory/AddCategory.jsx";
import AllBoards from "./All Boards/AllBoards.jsx";

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
        path: "all-boards",
        element: <AllBoards />,
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
