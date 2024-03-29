import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./utils/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'
import EventPage from "./components/EventPage";
import { EventsProvider } from "./utils/EventsProvider";
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditEvent from "./components/EditEvent";
import ManageEvents from "./components/ManageEvents";
import UserPage from "./components/UserPage";
import BecomeOrganizer from "./components/BecomeOrganizer";
import ConfirmOrganizer from "./components/ConfirmOrganizer";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/event/:id",
    element: <EventPage />
  },
  {
    path:"/manage-events",
    element: <ManageEvents />
  },
  {
    path: "/edit-event/:id",
    element: <EditEvent />
  },
  {
    path: "/user/:id",
    element: <UserPage />
  },
  {
    path: "/become-organizer",
    element: <BecomeOrganizer />
  },
  {
    path: "/confirm-organizer/:email",
    element: <ConfirmOrganizer />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
        <GoogleOAuthProvider clientId="840492136831-6pt83mruob7u4o3ps1qgv75k5peii96i.apps.googleusercontent.com">
          <EventsProvider>
            <RouterProvider router={router} />
          </EventsProvider>
          </GoogleOAuthProvider>
      </AuthProvider>
  </React.StrictMode>
);