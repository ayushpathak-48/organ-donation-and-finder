// src/pages/DonorFormPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../lib/constants";
import { sendTelegramMessage } from "../../lib/utils";

const DonorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_group: "",
    organ: "",
    contact: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API_BASE_URL}/donor/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Donor registered successfully!");
      // const msg = `🧾**New Organ Added for Donation**\n\n**Organ:** ${formData.organ}\n\n**Blood Group:** ${formData.blood_group}\n\n**Location:** ${formData.location}\n\n**Contact:** \`\`${formData.contact}\`\`\n\n**Name:** ${formData.name}\n\n**Age:** ${formData.age}`;
      // function escapeMarkdownV2(text: string) {
      //   return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
      // }

      // const msg =
      //   `🧾*New Organ Added for Donation*\n\n` +
      //   `*Organ:* ${escapeMarkdownV2(formData.organ)}\n\n` +
      //   `*Blood Group:* ${escapeMarkdownV2(formData.blood_group)}\n\n` +
      //   `*Location:* ${escapeMarkdownV2(formData.location)}\n\n` +
      //   `*Contact:* \`${escapeMarkdownV2(formData.contact)}\`\n\n` +
      //   `*Name:* ${escapeMarkdownV2(formData.name)}\n\n` +
      //   `*Age:* ${escapeMarkdownV2(formData.age)}`;

      const msg = `
🧾<b>New Organ Added for Donation</b>\n
<b>Organ:</b> ${formData.organ}\n
<b>Blood Group:</b> ${formData.blood_group}\n
<b>Location:</b> ${formData.location}\n
<b>Contact:</b> <code>${formData.contact}</code>\n
<b>Name:</b> ${formData.name}\n
<b>Age:</b> ${formData.age}
`;

      await sendTelegramMessage(msg);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error registering donor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Donate an Organ
          </h2>
          <p className="text-indigo-100 text-center mt-1">
            Your donation can save lives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Your age"
              />
            </div>

            <div>
              <label
                htmlFor="blood_group"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blood Group
              </label>
              <select
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="">Select Blood Type</option>
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
          </div>

          <div>
            <label
              htmlFor="organ"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organ
            </label>
            <select
              id="organ"
              name="organ"
              value={formData.organ}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="">Select Organ</option>
              <option value="Kidney">Kidney</option>
              <option value="Brain">Brain</option>
              <option value="Liver">Liver</option>
              <option value="Heart">Heart</option>
              <option value="Lungs">Lungs</option>
              <option value="Pancreas">Pancreas</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="City, State"
            />
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 py-4 px-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Your information will be kept confidential and used only for organ
            donation purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonorFormPage;
