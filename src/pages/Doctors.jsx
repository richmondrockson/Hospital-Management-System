import React, { useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Kwame Mensah",
      specialization: "Cardiologist",
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Ama Boateng",
      specialization: "Neurologist",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Dr. Yaw Owusu",
      specialization: "Pediatrician",
      status: "Available",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    status: "Available",
  });

  // Open modal for add or edit
  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData(doctor);
    } else {
      setEditingDoctor(null);
      setFormData({ name: "", specialization: "", status: "Available" });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => setShowModal(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim() || !formData.specialization.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingDoctor) {
      // Update existing doctor
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editingDoctor.id ? { ...doc, ...formData } : doc
        )
      );
    } else {
      // Add new doctor
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }

    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Doctor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Specialization</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{doctor.name}</td>
                <td className="py-3 px-4 border-b">{doctor.specialization}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    doctor.status === "Available"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {doctor.status}
                </td>
                <td className="py-3 px-4 border-b text-center space-x-2">
                  <button
                    onClick={() => openModal(doctor)}
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Background overlay (blur + dim) */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            style={{ backdropFilter: "blur(6px)" }}
          ></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#f9fafb] p-6 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">
                {editingDoctor ? "Edit Doctor" : "Add Doctor"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full mt-1"
                    placeholder="Enter doctor's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full mt-1"
                    placeholder="Enter specialization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full mt-1"
                  >
                    <option value="Available">Available</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingDoctor ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Doctors;
