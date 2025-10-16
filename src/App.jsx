import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/patients", element: <Patients /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/appointments", element: <Appointments /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
