const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">HMS</h2>
      <nav>
        <ul className="space-y-4">
          <li className="hover:text-blue-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-300 cursor-pointer">Patients</li>
          <li className="hover:text-blue-300 cursor-pointer">Doctors</li>
          <li className="hover:text-blue-300 cursor-pointer">Appointments</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
