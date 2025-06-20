import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            path:'/',
            index:true,
            Component:Home
        }
    ]
  },
]);