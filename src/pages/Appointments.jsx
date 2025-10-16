import React, { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Kwame Mensah",
      date: "2025-10-20",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Ama Kusi",
      doctor: "Dr. Yaw Owusu",
      date: "2025-10-22",
      time: "2:30 PM",
      status: "Completed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  // Add/Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // Open Add/Edit modal
  const openModal = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData(appointment);
    } else {
      setEditingAppointment(null);
      setFormData({
        patient: "",
        doctor: "",
        date: "",
        time: "",
        status: "Scheduled",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.patient.trim() ||
      !formData.doctor.trim() ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingAppointment.id ? { ...a, ...formData } : a
        )
      );
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
      };
      setAppointments((prev) => [...prev, newAppointment]);
    }

    closeModal();
  };

  const handleDeleteAppointment = () => {
    setAppointments((prev) => prev.filter((a) => a.id !== appointmentToDelete));
    setAppointmentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter ? a.status === statusFilter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <Button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Appointment
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by patient or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b">Patient</th>
              <th className="py-3 px-4 border-b">Doctor</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Time</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{a.patient}</td>
                <td className="py-3 px-4 border-b">{a.doctor}</td>
                <td className="py-3 px-4 border-b">{a.date}</td>
                <td className="py-3 px-4 border-b">{a.time}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    a.status === "Scheduled"
                      ? "text-blue-600"
                      : a.status === "Completed"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {a.status}
                </td>
                <td className="py-3 px-4 border-b text-center space-x-2">
                  <Button
                    onClick={() => openModal(a)}
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setAppointmentToDelete(a.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            style={{ backdropFilter: "blur(6px)" }}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#f9fafb] p-6 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">
                {editingAppointment ? "Edit Appointment" : "Add Appointment"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                />
                <Input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  placeholder="Enter doctor name"
                />
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full mt-1"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <div className="flex justify-end space-x-3 mt-4">
                  <Button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {editingAppointment ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            style={{ backdropFilter: "blur(6px)" }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#f9fafb] p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this appointment? This action
                cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAppointment}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
