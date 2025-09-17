import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import DonorFormPage from "./pages/donor/DonorFormPage";
import DonorListPage from "./pages/donor/DonorListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import UserDonationListingPage from "./pages/donor/UserDonationListingPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Your routes here */}
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Donor Pages */}
        <Route path="/donor/register" element={<DonorFormPage />} />
        <Route path="/donor/list" element={<DonorListPage />} />
        <Route
          path="/donor/my-listings"
          element={<UserDonationListingPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
