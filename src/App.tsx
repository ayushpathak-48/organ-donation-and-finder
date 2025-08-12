import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Finder from "./pages/Finder";
import DonorForm from "./pages/DonorForm";
import DistributorDashboard from "./pages/DistributorDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/donor-form" element={<DonorForm />} />
          <Route path="/distributor" element={<DistributorDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
