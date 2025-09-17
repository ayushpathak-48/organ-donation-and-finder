import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/constants";
import api from "../lib/axios";

type User = {
  id: number;
  full_name: string;
  role: "donor" | "recipient";
  email: string;
};

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    available: {
      Brain: 0,
      Heart: 0,
      Kidney: 0,
      Liver: 0,
      Lungs: 0,
      Pancreas: 0,
    },
    donated: {
      Brain: 0,
      Heart: 0,
      Kidney: 0,
      Liver: 0,
      Lungs: 0,
      Pancreas: 0,
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/donors/stats`);
        setStats({
          available: {
            Brain: response.data.stats?.available?.Brain || 0,
            Heart: response.data.stats?.available?.Heart || 0,
            Kidney: response.data.stats?.available?.Kidney || 0,
            Liver: response.data.stats?.available?.Liver || 0,
            Lungs: response.data.stats?.available?.Lungs || 0,
            Pancreas: response.data.stats?.available?.Pancreas || 0,
          },
          donated: {
            Brain: response.data.stats?.donated?.Brain || 0,
            Heart: response.data.stats?.donated?.Heart || 0,
            Kidney: response.data.stats?.donated?.Kidney || 0,
            Liver: response.data.stats?.donated?.Liver || 0,
            Lungs: response.data.stats?.donated?.Lungs || 0,
            Pancreas: response.data.stats?.donated?.Pancreas || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
          <p className="text-center text-gray-600 mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {user.full_name}
              </h1>
              <p className="text-gray-600 capitalize">Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        {/* Role-based Dashboard */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your generosity. Your donation can save lives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/donor/register"
                className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 hover:border-indigo-300 transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 group-hover:bg-indigo-200 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Donate Organ
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Sign up to donate organs and help those in need.
                </p>
              </Link>

              <Link
                to="/donor/list"
                className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4 group-hover:bg-green-200 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    View Available Organs
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  See organs available for donations.
                </p>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-800 mb-2">
          Available Organs
        </h2>
        {loading ? (
          <div className="min-h-36 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading stats...</p>
            </div>
          </div>
        ) : (
          <>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/brain.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Brain</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Brain}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/kidney.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kidney</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Kidney}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/heart.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Heart}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-violet-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/liver.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Liver</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Liver}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/lungs.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lungs</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Lungs}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/pancreas.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pancreas</p>
                  <p className="font-bold text-gray-800">
                    {stats.available.Pancreas}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <h2 className="mt-8 text-xl font-semibold text-gray-800 mb-2">
          Total Donated Organs
        </h2>
        {loading ? (
          <div className="min-h-36 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading stats...</p>
            </div>
          </div>
        ) : (
          <>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/brain.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Brain</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Brain}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/kidney.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kidney</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Kidney}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/heart.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Heart}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-violet-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/liver.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Liver</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Liver}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/lungs.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lungs</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Lungs}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <img
                    height="24px"
                    width="24px"
                    src="/assets/pancreas.svg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pancreas</p>
                  <p className="font-bold text-gray-800">
                    {stats.donated.Pancreas}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
