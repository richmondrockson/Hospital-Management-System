import React, { useState } from "react";

const Doctors = () => {
  const [doctors] = useState([
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

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          + Add Doctor
        </button>
      </div>

      {/* Table Section */}
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
                  <button className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600">
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
    </div>
  );
};

export default Doctors;
