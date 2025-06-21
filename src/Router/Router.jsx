import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import AuthLayout from "../AuthLayout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:'/',
            index:true,
            Component:Home
        },
      
    ]
  },
  {
    path:'/auth',
    Component:AuthLayout,
    children:[
      {
        path:'/auth/register',
        Component: Register
      },
      {
        path:'/auth/login',
        
      },
    ]
  }
]);