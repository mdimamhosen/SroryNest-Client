import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Darshboard from "@/pages/Dashboard/Darshboard";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AdminProfile from "@/pages/Dashboard/Admin/AdminProfile";
import UserProfile from "@/pages/Dashboard/User/UserProfile";
import AddBooks from "@/pages/Dashboard/Admin/AddBooks";
import AllBooks from "@/pages/Dashboard/Admin/AllBooks";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import Settings from "@/pages/Dashboard/Settings";
import Books from "@/pages/Books";
import BookDetails from "@/pages/BookDetails";
import CheckOut from "@/pages/CheckOut";

import VerifyOrder from "../pages/VerifyOrder";
import ViewOrders from "@/pages/Dashboard/User/ViewOrders";
import NotFound from "@/pages/NotFound";
import UserBasedRoute from "@/components/layout/UserBasedRoute";
import AdminBasedRoute from "@/components/layout/AdminBasedRoute";
import ManageOrder from "@/pages/Dashboard/Admin/ManageOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/:id",
        element: (
          // <ProtectedRoute>
          <BookDetails />
          // </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/verify-order",
        element: (
          <ProtectedRoute>
            {" "}
            <VerifyOrder />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFound />,

    element: (
      <ProtectedRoute>
        <Darshboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminBasedRoute>
            <AdminProfile />
          </AdminBasedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <UserBasedRoute>
            <UserProfile />
          </UserBasedRoute>
        ),
      },
      {
        path: "admin/add-book",
        element: (
          <AdminBasedRoute>
            {" "}
            <AddBooks />{" "}
          </AdminBasedRoute>
        ),
      },
      {
        path: "admin/manage-orders",
        element: (
          <AdminBasedRoute>
            {" "}
            <ManageOrder />{" "}
          </AdminBasedRoute>
        ),
      },
      {
        path: "admin/see-all-book",
        element: (
          <AdminBasedRoute>
            {" "}
            <AllBooks />{" "}
          </AdminBasedRoute>
        ),
      },
      {
        path: "admin/all-users",
        element: (
          <AdminBasedRoute>
            {" "}
            <AllUsers />{" "}
          </AdminBasedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            {" "}
            <Settings />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "user/view-orders",
        element: (
          <UserBasedRoute>
            {" "}
            <ViewOrders />{" "}
          </UserBasedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
