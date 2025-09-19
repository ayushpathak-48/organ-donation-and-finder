// src/pages/DonorListPage.tsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/constants";
import { Link } from "react-router-dom";
import api from "../../lib/axios";
import { sendTelegramMessage } from "../../lib/utils";
// import { sendTelegramMessage } from "../../lib/utils";

interface Donor {
  id: number;
  name: string;
  age: number;
  blood_group: string;
  organ: string;
  contact: string;
  location: string;
  donated: boolean;
}

const UserDonationListingPage: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    blood_group: "",
    organ: "",
    location: "",
  });

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/donors/my-listings`);
        setDonors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        setError("Failed to load donors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const markAsDonated = async (data: number) => {
    try {
      await api.get(`${API_BASE_URL}/donors/mark-as-donated/${data}`);
      const singleDonor = donors.find((donor) => donor.id === data);
      if (!singleDonor) return;
      console.log(singleDonor);
      const msg = `
      💖<b>Organ Donated By ${singleDonor.name}</b>\n\n<b>Donated Organ:</b> ${singleDonor.organ}\n\n<b>Blood Group:</b> ${singleDonor.blood_group}\n\n<b>Location:</b> ${singleDonor.location}\n\n<b>Phone Number:</b> <code>${singleDonor.contact}</code>\n\n<b>Name:</b> ${singleDonor.name}\n\n<b>Age:</b> ${singleDonor.age}\n\n<i>Thank you for your selfless act of kindness!</i>
      `;
      console.log({ msg });
      await sendTelegramMessage(msg);
      setDonors(
        donors.map((donor) => {
          if (donor.id == data) donor.donated = true;
          return donor;
        }),
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter((donor) => {
    return (
      (filters.blood_group === "" ||
        donor.blood_group === filters.blood_group) &&
      (filters.organ === "" || donor.organ === filters.organ) &&
      (filters.location === "" ||
        donor.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const clearFilters = () => {
    setFilters({
      blood_group: "",
      organ: "",
      location: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4 text-center">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Your Listings</h2>
            <p className="text-indigo-100">
              List of all organs you want to donate
            </p>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={filters.blood_group}
                  onChange={(e) =>
                    setFilters({ ...filters, blood_group: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Blood Types</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organ
                </label>
                <select
                  value={filters.organ}
                  onChange={(e) =>
                    setFilters({ ...filters, organ: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Organs</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Brain">Brain</option>
                  <option value="Liver">Liver</option>
                  <option value="Heart">Heart</option>
                  <option value="Lungs">Lungs</option>
                  <option value="Pancreas">Pancreas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  placeholder="Enter city or state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredDonors.length}</span>{" "}
                of <span className="font-semibold">{donors.length}</span> donors
              </p>

              {(filters.blood_group || filters.organ || filters.location) && (
                <button
                  onClick={clearFilters}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nothing Here
            </h3>
            <p className="text-gray-600 mb-4">
              {donors.length === 0
                ? "you haven't added any organ donation. Try adding new one."
                : "No listings match your current filters. Try adjusting your search criteria."}
            </p>
            {donors.length > 0 ? (
              <button
                onClick={clearFilters}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                to="/donor/register"
                className={`w-full  text-white py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition`}
              >
                Donate Organ
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {donor.name}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {donor.age} years
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Blood Group</p>
                      <p className="font-medium">{donor.blood_group}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organ</p>
                      <p className="font-medium">{donor.organ}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{donor.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium truncate">{donor.contact}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => markAsDonated(donor.id)}
                    disabled={donor.donated}
                    className={`w-full  text-white py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition ${
                      donor.donated ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                  >
                    {donor.donated ? "Donated" : "Mark as Donated"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDonationListingPage;
