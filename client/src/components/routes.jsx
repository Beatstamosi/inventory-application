import App from "../App";
import Home from "./Home/Home.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";

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
    ],
  },
];

export default routes;
