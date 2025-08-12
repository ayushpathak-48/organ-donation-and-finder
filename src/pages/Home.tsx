import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Organ Connect</h2>
      <p className="mb-6">Connecting donors and recipients efficiently.</p>
      <div className="space-x-4">
        <Link
          to="/finder"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Find Organs
        </Link>
        <Link
          to="/donor-form"
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Become a Donor
        </Link>
      </div>
    </div>
  );
};

export default Home;
