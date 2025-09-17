import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-indigo-600">Organ Connect</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Bridging the gap between organ donors and recipients to save lives
            through timely connections.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/donor/list"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Find Organs
            </Link>
            <Link
              to="/signup"
              className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 font-medium px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Become a Donor
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Save Lives</h3>
                <p className="text-gray-600">
                  Your donation can give someone a second chance at life.
                </p>
              </div>

              <div className="p-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Connect Directly</h3>
                <p className="text-gray-600">
                  Our platform connects donors and recipients efficiently.
                </p>
              </div>

              <div className="p-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
                <p className="text-gray-600">
                  Your data is protected with industry-standard security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex mb-8">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Register</h3>
                  <p className="text-gray-600">
                    Sign up as a donor or recipient with your basic information.
                  </p>
                </div>
              </div>

              <div className="flex mb-8">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect</h3>
                  <p className="text-gray-600">
                    Our system matches donors with recipients based on
                    compatibility.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
                  <p className="text-gray-600">
                    Coordinate with medical professionals to complete the
                    donation process.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl p-6 h-64 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-40 w-40 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of others who are helping to save lives through organ
            donation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 font-medium px-8 py-3 rounded-lg transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} Organ Connect. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            Created by Sampda Gangurde
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
