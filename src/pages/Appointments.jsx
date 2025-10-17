import React, { useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Kwame Mensah",
      date: "2025-10-20",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patientName: "Ama Boateng",
      doctorName: "Dr. Yaw Owusu",
      date: "2025-10-21",
      time: "2:00 PM",
      status: "Completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "Scheduled",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "patientName":
        if (!value.trim()) error = "Patient name is required";
        break;
      case "doctorName":
        if (!value.trim()) error = "Doctor name is required";
        break;
      case "date":
        if (!value) {
          error = "Date is required";
        } else {
          const today = new Date();
          const selectedDate = new Date(value);
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = "Date cannot be in the past";
        }
        break;
      case "time":
        if (!value) error = "Time is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const openModal = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData(appointment);
    } else {
      setEditingAppointment(null);
      setFormData({
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
        status: "Scheduled",
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    // Stop submission if there are validation errors
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) return;

    if (editingAppointment) {
      // Update existing appointment
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === editingAppointment.id ? { ...appt, ...formData } : appt
        )
      );
    } else {
      // Add new appointment
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
      };
      setAppointments((prev) => [...prev, newAppointment]);
    }

    closeModal();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Appointment
        </button>
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
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{appt.patientName}</td>
                <td className="py-3 px-4 border-b">{appt.doctorName}</td>
                <td className="py-3 px-4 border-b">{appt.date}</td>
                <td className="py-3 px-4 border-b">{appt.time}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    appt.status === "Scheduled"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {appt.status}
                </td>
                <td className="py-3 px-4 border-b text-center space-x-2">
                  <button
                    onClick={() => openModal(appt)}
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
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
                {editingAppointment ? "Edit Appointment" : "Add Appointment"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`border rounded-md p-2 w-full mt-1 ${
                      errors.patientName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter patient's name"
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.patientName}
                    </p>
                  )}
                </div>

                {/* Doctor Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className={`border rounded-md p-2 w-full mt-1 ${
                      errors.doctorName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter doctor's name"
                  />
                  {errors.doctorName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.doctorName}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`border rounded-md p-2 w-full mt-1 ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`border rounded-md p-2 w-full mt-1 ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>

                {/* Status */}
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
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
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
                    {editingAppointment ? "Update" : "Save"}
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

export default Appointments;
