// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">HMS</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-blue-300 cursor-pointer block">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/patients"
              className="hover:text-blue-300 cursor-pointer block"
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className="hover:text-blue-300 cursor-pointer block"
            >
              Doctors
            </Link>
          </li>
          <li>
            <Link
              to="/appointments"
              className="hover:text-blue-300 cursor-pointer block"
            >
              Appointments
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
