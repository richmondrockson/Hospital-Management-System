import React, { useState } from "react";
import Button from "../components/button.jsx";
import Input from "../components/input";

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, gender: "Male", condition: "Fever" },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      gender: "Female",
      condition: "Cough",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
  });

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal
  const openModal = (patient = null) => {
    if (patient) {
      setEditPatient(patient);
      setFormData(patient);
    } else {
      setEditPatient(null);
      setFormData({ name: "", age: "", gender: "", condition: "" });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditPatient(null);
    setFormData({ name: "", age: "", gender: "", condition: "" });
  };

  // Add or edit patient
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPatient) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editPatient.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setPatients((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete patient
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Filter + search logic
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === "All" || p.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patient Management</h2>
        <Button onClick={() => openModal()}>Add Patient</Button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />

        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Age</th>
              <th className="border p-3 text-left">Gender</th>
              <th className="border p-3 text-left">Condition</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-3">{p.name}</td>
                <td className="border p-3">{p.age}</td>
                <td className="border p-3">{p.gender}</td>
                <td className="border p-3">{p.condition}</td>
                <td className="border p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => openModal(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <>
          {/* Background Overlay with Blur */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            style={{ backdropFilter: "blur(6px)" }}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">
                {editPatient ? "Edit Patient" : "Add Patient"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <Input
                  name="condition"
                  placeholder="Condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                />

                <div className="flex justify-end gap-3 pt-3">
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {editPatient ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
