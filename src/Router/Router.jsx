import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../pages/Login";
import PrivateRoute from "../Provider/PrivateRoute";
import AddBlog from "../pages/AddBlog";
import Loading from "../pages/Loading";
import AllBlogs from "../pages/AllBlogs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        index: true,
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/blogs`),
        Component: Home,

      },
      {
        path: '/allBlogs',
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/blogs`),
        Component: AllBlogs
      },
      {
        path: '/addBlog',
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        )

      }

    ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: '/auth/register',
        Component: Register
      },
      {
        path: '/auth/login',
        Component: Login
      },
    ]
  }
]);