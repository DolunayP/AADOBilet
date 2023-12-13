import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";
import PastEvents from "./pages/PastEvents";
import Events from "./pages/Events";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Forms from "./components/SignUp/Forms";
import Tickets from "./pages/Tickets.jsx";
import SuccessBuyTicket from "./pages/SuccessBuyTicket.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Categories from "./pages/admin/Category/Categories.jsx";
import Artists from "./pages/admin/Artists.jsx";
import EventsAdmin from "./pages/admin/EventsAdmin.jsx";
import EventPhotos from "./pages/admin/EventPhotos.jsx";
import Seats from "./pages/admin/Seats.jsx";
import TicketCategories from "./pages/admin/TicketCategories.jsx";
import Users from "./pages/admin/Users.jsx";
import CategoryAddForm from "./pages/admin/Category/CategoryAddForm.jsx";
import ProtectedRouteAdmin from "./pages/admin/ProtectedRouteAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Forms />,
  },
  {
    path: "/register",
    element: <Forms />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/pastevents",
    element: <PastEvents />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:categoryName",
    element: <Events />,
  },

  {
    path: "/event/tickets/:id",
    element: <Tickets />,
  },
  {
    path: "/event/ticket/success",
    element: <SuccessBuyTicket />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Dashboard",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Categories",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Categories />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/addCategory",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <CategoryAddForm />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Artists",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Artists />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Events",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventsAdmin />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/EventPhotos",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <EventPhotos />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Seats",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Seats />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/Users",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: "admin/TicketCategories",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout>
          <TicketCategories />
        </AdminLayout>
      </ProtectedRouteAdmin>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
