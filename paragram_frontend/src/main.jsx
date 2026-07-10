import {
  StrictMode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NewPost from "./pages/NewPost.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import Activity from "./pages/Activity.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import PostCard from "./components/PostCard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "post",
        element: <PostCard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
