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
import BlogDetails from "../pages/BlogDetails";
import WishList from "../pages/WishList";
import UpdateBlog from "../pages/UpdateBlog";
import FeaturedBlogs from "../pages/FeaturedBlogs";

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
        path: '/featuredBlog',
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/blogs`),
        Component: FeaturedBlogs
      },
      {
        path: '/blogDetails/:id',
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        )

      },
      {
        path: '/addBlog',
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        )
      },
      {
        path: '/updateBlog/:id',
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        )
      },
      {
        path: '/wishList/:email',
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/wishlist/${params.email}`),
        element: (
          <PrivateRoute>
            <WishList></WishList>
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