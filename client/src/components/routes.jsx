import App from "../App";
import Home from "./Home/Home.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";
import AddBoard from "./AddBoard/AddBoard.jsx";
import AddCategory from "./AddCategory/AddCategory.jsx";
import AllBoards from "./All Boards/AllBoards.jsx";
import DisplayCategory from "./Category/displayCategory.jsx";
import EditBoard from "./EditBoard/EditBoard.jsx";

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
        path: "/category/:name",
        element: <DisplayCategory />,
      },
      {
        path: "add-board",
        element: <AddBoard />,
      },
      {
        path: "/edit-board/:name",
        element: <EditBoard />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
    ],
  },
];

export default routes;
