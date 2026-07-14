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
import ProtectRoutes from "./components/ProtectedRoutes.jsx";
import NewPost from "./pages/NewPost.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import Activity from "./pages/Activity.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import PostCard from "./components/PostCard.jsx";
import AuthProvider from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectRoutes>
            <Home />
          </ProtectRoutes>
        ),
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
        element: (
          <ProtectRoutes>
            <PostCard />
          </ProtectRoutes>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectRoutes>
            <NewPost />
          </ProtectRoutes>
        ),
      },
      {
        path: "activity",
        element: (
          <ProtectRoutes>
            <Activity />
          </ProtectRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoutes>
            <Profile />
          </ProtectRoutes>
        ),
      },
      {
        path: "postdetail/:id",
        element: (
          <ProtectRoutes>
            <PostDetailPage />
          </ProtectRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // {/* </StrictMode>, */}
);
