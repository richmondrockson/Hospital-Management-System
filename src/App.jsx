import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
// import Doctors from "./pages/Doctors";
// import Appointments from "./pages/Appointments";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
