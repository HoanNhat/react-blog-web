import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";

import { UserProvider } from "./Context.jsx";
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ShowBlog from "./pages/ShowBlog.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import WriteBlog from "./pages/WriteBlog.jsx"
import AboutMe from "./pages/AboutMe.jsx";
import MyBlog from "./pages/MyBlog.jsx";
import Notifications from "./pages/Notifications.jsx";

import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "posts/details/:id",
        element: <ShowBlog />,
      },
      {
        path: "users/details/:id",
        element: <UserProfile />,
      },
      {
        path: "users/posts/new-blog",
        element: <WriteBlog pageTitle="Write your new blog" buttonTitle={"Blog now"}/>,
      },
      {
        path: "my-blog/post/details/edit-blog",
        element: <WriteBlog pageTitle="Update blog" buttonTitle={"Save changes"}/>,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "about",
        element: <AboutMe />,
      },
      {
        path: "my-blog",
        element: <MyBlog />,
      },
      {
        path: "user/notifications",
        element: <Notifications />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
);
