const Navbar = () => {
  return (
    <header className="bg-white shadow p-4 mb-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Hospital Management System</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
