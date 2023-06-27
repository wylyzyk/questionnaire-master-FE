import { createBrowserRouter } from "react-router-dom";

import { Main } from "../layout/Main";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/NotFound.tsx";
import { Manage } from "../layout/Manage";
import { Question } from "../layout/Question";
import { List } from "../pages/manage/List";
import { Star } from "../pages/manage/Star";
import { Trash } from "../pages/manage/Trash";
import { Edit } from "../pages/question/Edit";
import { Stat } from "../pages/question/Stat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "manage",
        element: <Manage />,
        children: [
          { path: "list", element: <List /> },
          { path: "star", element: <Star /> },
          { path: "trash", element: <Trash /> }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  },
  {
    path: "/question",
    element: <Question />,
    children: [
      { path: "edit/:id", element: <Edit /> },
      { path: "stat/:id", element: <Stat /> }
    ]
  }
]);

export default router;
