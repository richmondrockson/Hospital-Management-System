import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    completedAppointments: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate backend data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockStats = {
          totalPatients: 128,
          totalDoctors: 12,
          totalAppointments: 57,
          completedAppointments: 44,
        };

        const mockAppointments = [
          {
            id: 1,
            patient: "Kwame Boateng",
            doctor: "Dr. Ama Nyarko",
            date: "2025-10-14",
            status: "Completed",
          },
          {
            id: 2,
            patient: "Abena Owusu",
            doctor: "Dr. Kwame Mensah",
            date: "2025-10-15",
            status: "Pending",
          },
          {
            id: 3,
            patient: "Yaw Asante",
            doctor: "Dr. Efua Adjei",
            date: "2025-10-16",
            status: "Cancelled",
          },
        ];

        const mockChartData = [
          { day: "Mon", appointments: 8 },
          { day: "Tue", appointments: 10 },
          { day: "Wed", appointments: 6 },
          { day: "Thu", appointments: 12 },
          { day: "Fri", appointments: 9 },
          { day: "Sat", appointments: 4 },
          { day: "Sun", appointments: 5 },
        ];

        setStats(mockStats);
        setRecentAppointments(mockAppointments);
        setChartData(mockChartData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {loading ? (
        <div className="text-center text-gray-600 mt-10 animate-pulse">
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-medium">Total Patients</h2>
              <p className="text-3xl font-bold mt-2">{stats.totalPatients}</p>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-medium">Doctors</h2>
              <p className="text-3xl font-bold mt-2">{stats.totalDoctors}</p>
            </div>

            <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-medium">Appointments</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.totalAppointments}
              </p>
            </div>

            <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-medium">Completed</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.completedAppointments}
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weekly Appointments Overview
            </h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Appointments Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Appointments
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{appt.patient}</td>
                    <td className="py-3 px-4">{appt.doctor}</td>
                    <td className="py-3 px-4">{appt.date}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        appt.status === "Completed"
                          ? "text-green-600"
                          : appt.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-500"
                      }`}
                    >
                      {appt.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
